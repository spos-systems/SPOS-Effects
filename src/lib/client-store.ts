/**
 * Client-side data layer for SPOS Effects.
 *
 * Works in two modes, transparently to the UI:
 *
 * 1. Server mode (default, `bun run dev` / self-hosted): favorites and view
 *    counters are persisted through the Next.js API routes (Prisma + SQLite).
 *
 * 2. Static mode (GitHub Pages build, `NEXT_PUBLIC_STATIC=1`): the site is a
 *    pure static export with no backend, so everything falls back to
 *    `localStorage` and stays 100% functional — favorites keep working and
 *    view counters keep counting on each visitor's browser.
 *
 * If the API is missing or unreachable (for example when someone deploys the
 * export elsewhere), the store detects it once and gracefully degrades to
 * localStorage for the rest of the session.
 */

const FAVORITES_KEY = "spos-effects:favorites";
const STATS_KEY = "spos-effects:views";

const STATIC_MODE = process.env.NEXT_PUBLIC_STATIC === "1";
const API_TIMEOUT_MS = 4000;

/** Starts `true` unless the build is known to be backend-less. */
let apiAvailable = !STATIC_MODE;

/* ------------------------------------------------------------------ */
/* localStorage helpers                                                */
/* ------------------------------------------------------------------ */

function readLocalFavorites(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(FAVORITES_KEY);
    return new Set(raw ? (JSON.parse(raw) as string[]) : []);
  } catch {
    return new Set();
  }
}

function writeLocalFavorites(favorites: Set<string>): void {
  try {
    window.localStorage.setItem(FAVORITES_KEY, JSON.stringify([...favorites]));
  } catch {
    /* storage unavailable (private mode, quota, ...) — ignore */
  }
}

function readLocalStats(): Record<string, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STATS_KEY);
    return raw ? (JSON.parse(raw) as Record<string, number>) : {};
  } catch {
    return {};
  }
}

function writeLocalStats(stats: Record<string, number>): void {
  try {
    window.localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    /* ignore */
  }
}

/* ------------------------------------------------------------------ */
/* API helpers                                                         */
/* ------------------------------------------------------------------ */

async function apiFetch<T>(
  path: string,
  init?: RequestInit
): Promise<T | undefined> {
  if (!apiAvailable || typeof window === "undefined") return undefined;
  try {
    const res = await fetch(path, {
      ...init,
      headers:
        init?.body !== undefined
          ? { "Content-Type": "application/json" }
          : undefined,
      signal: AbortSignal.timeout(API_TIMEOUT_MS),
    });
    if (!res.ok) {
      // 404/405 → there is no backend here (e.g. GitHub Pages). Remember it.
      apiAvailable = false;
      return undefined;
    }
    return (await res.json()) as T;
  } catch {
    apiAvailable = false;
    return undefined;
  }
}

/* ------------------------------------------------------------------ */
/* Public API                                                          */
/* ------------------------------------------------------------------ */

export interface LibraryData {
  favorites: Set<string>;
  views: Record<string, number>;
}

/**
 * Load the library state (favorites + per-effect view counters).
 * Server data wins when available; otherwise falls back to localStorage.
 */
export async function loadLibraryData(): Promise<LibraryData> {
  const local: LibraryData = {
    favorites: readLocalFavorites(),
    views: readLocalStats(),
  };
  if (!apiAvailable) return local;

  const [favData, statsData] = await Promise.all([
    apiFetch<{ favorites?: string[] }>("/api/favorites"),
    apiFetch<{ views?: Record<string, number> }>("/api/stats"),
  ]);

  if (favData === undefined && statsData === undefined) return local;

  return {
    favorites: favData ? new Set(favData.favorites ?? []) : local.favorites,
    views: statsData?.views ?? local.views,
  };
}

/**
 * Toggle a favorite. Returns the resulting `favorited` state from the source
 * of truth (server database or localStorage) — the caller can use it to
 * reconcile optimistic UI updates.
 */
export async function toggleFavorite(
  effectId: string
): Promise<{ ok: boolean; favorited: boolean }> {
  if (apiAvailable) {
    const data = await apiFetch<{ favorited?: boolean }>("/api/favorites", {
      method: "POST",
      body: JSON.stringify({ effectId }),
    });
    if (data !== undefined) {
      return { ok: true, favorited: Boolean(data.favorited) };
    }
  }

  // localStorage fallback (static GitHub Pages build, or API unavailable)
  const favorites = readLocalFavorites();
  const favorited = !favorites.has(effectId);
  if (favorited) favorites.add(effectId);
  else favorites.delete(effectId);
  writeLocalFavorites(favorites);
  return { ok: true, favorited };
}

/**
 * Record a view for an effect. No-op result — fire and forget is fine.
 */
export async function trackView(effectId: string): Promise<void> {
  if (apiAvailable) {
    const data = await apiFetch<{ views?: number }>("/api/stats", {
      method: "POST",
      body: JSON.stringify({ effectId }),
    });
    if (data !== undefined) return;
  }

  const stats = readLocalStats();
  stats[effectId] = (stats[effectId] ?? 0) + 1;
  writeLocalStats(stats);
}
