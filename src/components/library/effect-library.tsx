"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import {
  Download,
  Github,
  Globe,
  Heart,
  LayoutGrid,
  LayoutPanelTop,
  Link2,
  LoaderCircle,
  MessageCircle,
  MousePointerClick,
  Palette,
  Phone,
  Search,
  SearchX,
  Sparkles,
  TextCursorInput,
  Type,
} from "lucide-react";
import {
  allEffects,
  allEffectsCss,
  effectCategories,
  type CssEffect,
  type EffectCategoryId,
} from "@/lib/effects";
import { cn } from "@/lib/utils";
import {
  loadLibraryData,
  toggleFavorite,
  trackView,
} from "@/lib/client-store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EffectCard } from "./effect-card";
import { CodeDialog } from "./code-dialog";

/** One-file CDN link — the fastest way to grab the whole library. */
const CDN_URL =
  "https://cdn.jsdelivr.net/gh/spos-systems/SPOS-Effects@v1.0.1/spos-effects.css";

type CategoryFilter = "all" | EffectCategoryId;

const categoryIcons: Record<EffectCategoryId, typeof Type> = {
  buttons: MousePointerClick,
  text: Type,
  loaders: LoaderCircle,
  cards: LayoutPanelTop,
  backgrounds: Palette,
  inputs: TextCursorInput,
};

async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  }
}

export function EffectLibrary() {
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [query, setQuery] = useState("");
  const [favOnly, setFavOnly] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [views, setViews] = useState<Record<string, number>>({});
  const [dialogEffect, setDialogEffect] = useState<CssEffect | null>(null);
  const { toast } = useToast();

  // Load favorites + view stats (API when available, localStorage otherwise —
  // the latter keeps the static GitHub Pages build fully functional)
  useEffect(() => {
    let cancelled = false;
    loadLibraryData()
      .then((data) => {
        if (!cancelled) {
          setFavorites(data.favorites);
          setViews(data.views);
        }
      })
      .catch((error) => console.error("Failed to load library data:", error));
    return () => {
      cancelled = true;
    };
  }, []);

  // Deep links: ?effect=<id> opens that effect's code dialog (shareable URLs)
  useEffect(() => {
    try {
      const effectId = new URLSearchParams(window.location.search).get(
        "effect"
      );
      if (!effectId) return;
      const effect = allEffects.find((e) => e.id === effectId);
      if (!effect) return;
      setDialogEffect(effect);
      setViews((prev) => ({ ...prev, [effect.id]: (prev[effect.id] ?? 0) + 1 }));
      trackView(effect.id).catch((error) =>
        console.error("Failed to record view:", error)
      );
    } catch {
      /* ignore malformed URLs */
    }
  }, []);

  // Press "/" anywhere to jump straight to search
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "/") return;
      const target = event.target as HTMLElement | null;
      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        target?.isContentEditable
      ) {
        return;
      }
      event.preventDefault();
      document.getElementById("fx-search-input")?.focus();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const filteredEffects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allEffects.filter((effect) => {
      if (category !== "all" && effect.category !== category) return false;
      if (favOnly && !favorites.has(effect.id)) return false;
      if (!q) return true;
      return (
        effect.name.toLowerCase().includes(q) ||
        effect.description.toLowerCase().includes(q) ||
        effect.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    });
  }, [category, query, favOnly, favorites]);

  const totalViews = useMemo(
    () => Object.values(views).reduce((sum, v) => sum + v, 0),
    [views]
  );

  const handleToggleFavorite = async (effectId: string) => {
    const wasFavorited = favorites.has(effectId);
    // optimistic update
    setFavorites((prev) => {
      const next = new Set(prev);
      if (wasFavorited) next.delete(effectId);
      else next.add(effectId);
      return next;
    });
    const effect = allEffects.find((e) => e.id === effectId);
    toast({
      title: wasFavorited
        ? `Removed "${effect?.name}" from favorites`
        : `Added "${effect?.name}" to favorites`,
      description: wasFavorited ? undefined : "Find it anytime under Favorites.",
    });
    try {
      const result = await toggleFavorite(effectId);
      if (!result.ok) throw new Error("Request failed");
      // reconcile with the store's source of truth (server or localStorage)
      setFavorites((prev) => {
        const next = new Set(prev);
        if (result.favorited) next.add(effectId);
        else next.delete(effectId);
        return next;
      });
    } catch {
      // rollback on failure
      setFavorites((prev) => {
        const next = new Set(prev);
        if (wasFavorited) next.add(effectId);
        else next.delete(effectId);
        return next;
      });
      toast({
        title: "Something went wrong",
        description: "Could not update favorites. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleOpenCode = (effect: CssEffect) => {
    setDialogEffect(effect);
    // record a view
    setViews((prev) => ({ ...prev, [effect.id]: (prev[effect.id] ?? 0) + 1 }));
    trackView(effect.id).catch((error) =>
      console.error("Failed to record view:", error)
    );
    // keep the URL shareable: ?effect=<id>
    try {
      window.history.replaceState(null, "", `?effect=${effect.id}`);
    } catch {
      /* history API unavailable — ignore */
    }
  };

  const handleCloseDialog = () => {
    setDialogEffect(null);
    try {
      if (new URLSearchParams(window.location.search).get("effect")) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch {
      /* ignore */
    }
  };

  const handleShare = async (effect: CssEffect) => {
    const url = `${window.location.origin}${window.location.pathname}?effect=${effect.id}`;
    const ok = await copyText(url);
    if (ok) {
      toast({
        title: "Share link copied",
        description: `Anyone opening it lands directly on "${effect.name}".`,
      });
    } else {
      toast({
        title: "Copy failed",
        description: "Your browser blocked clipboard access.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = async (text: string, label: string) => {
    const ok = await copyText(text);
    if (ok) {
      toast({
        title: `${label} copied to clipboard`,
        description: "Paste it straight into your project.",
      });
    } else {
      toast({
        title: "Copy failed",
        description: "Your browser blocked clipboard access.",
        variant: "destructive",
      });
    }
  };

  const activeCategoryMeta =
    category === "all" ? null : effectCategories.find((c) => c.id === category);

  return (
    <div className="flex min-h-screen flex-col bg-zinc-950 text-zinc-100">
      {/* inject every effect's CSS once — class names are all fx- prefixed */}
      <style dangerouslySetInnerHTML={{ __html: allEffectsCss }} />

      {/* ============ Header ============ */}
      <header className="sticky top-0 z-50 border-b border-zinc-800/70 bg-zinc-950/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 sm:gap-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span
              className="grid size-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600 shadow-lg shadow-blue-500/30"
              aria-hidden
            >
              <span className="font-mono text-[15px] font-bold italic tracking-tighter text-white">
                fx
              </span>
            </span>
            <div className="leading-tight">
              <h1 className="text-[1.05rem] font-bold tracking-tight">
                SPOS <span className="text-blue-400">Effects</span>
              </h1>
              <p className="hidden text-[11px] text-zinc-500 sm:block">
                Live CSS effects you can copy in one click
              </p>
            </div>
          </div>

          <div className="relative ml-auto w-full max-w-[210px] sm:max-w-sm">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-500"
              aria-hidden
            />
            <Input
              id="fx-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search effects or tags..."
              aria-label="Search CSS effects"
              className="border-zinc-800 bg-zinc-900/70 pl-9 pr-9 text-sm text-zinc-200 placeholder:text-zinc-500 focus-visible:border-blue-400/50 focus-visible:ring-blue-400/25"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border border-zinc-700 bg-zinc-800/80 px-1.5 py-0.5 font-mono text-[10px] font-medium text-zinc-500 sm:block"
            >
              /
            </span>
          </div>
          <a
            href="https://github.com/spos-systems/SPOS-Effects"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden shrink-0 items-center gap-1.5 rounded-full border border-blue-400/25 bg-blue-400/10 px-3 py-1 text-[11px] font-medium text-blue-300 transition-colors hover:border-blue-400/50 hover:bg-blue-400/20 md:inline-flex"
          >
            <Github className="size-3.5" aria-hidden />
            Open Source
          </a>
          <Badge
            variant="outline"
            className="hidden shrink-0 border-blue-400/25 bg-blue-400/10 px-2.5 py-1 text-[11px] font-medium text-blue-300 md:inline-flex"
          >
            {allEffects.length} effects
          </Badge>
        </div>
      </header>

      {/* ============ Body ============ */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 sm:px-6 lg:px-8">
        {/* ---- Sidebar (desktop) ---- */}
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 flex-col py-8 lg:flex">
          <p className="px-3 pb-3 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Categories
          </p>
          <nav aria-label="Effect categories" className="flex flex-col gap-1">
            <SidebarItem
              icon={LayoutGrid}
              label="All Effects"
              count={allEffects.length}
              active={category === "all"}
              onClick={() => setCategory("all")}
            />
            {effectCategories.map((cat) => {
              const Icon = categoryIcons[cat.id];
              return (
                <SidebarItem
                  key={cat.id}
                  icon={Icon}
                  label={cat.label}
                  count={allEffects.filter((e) => e.category === cat.id).length}
                  active={category === cat.id}
                  onClick={() => setCategory(cat.id)}
                />
              );
            })}
          </nav>

          <div className="mt-6 border-t border-zinc-800/70 pt-5">
            <label className="flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 transition-colors hover:bg-zinc-900">
              <span className="flex items-center gap-2.5 text-sm text-zinc-300">
                <Heart
                  className={cn(
                    "size-4 transition-colors",
                    favOnly ? "fill-rose-500 text-rose-500" : "text-zinc-500"
                  )}
                  aria-hidden
                />
                Favorites only
              </span>
              <Switch
                checked={favOnly}
                onCheckedChange={setFavOnly}
                aria-label="Show favorites only"
                className="data-[state=checked]:bg-blue-500"
              />
            </label>
            <p className="px-3 pt-1 text-xs text-zinc-600">
              {favorites.size} saved effect{favorites.size === 1 ? "" : "s"}
            </p>
          </div>

          <div className="mt-auto rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4">
            <p className="flex items-center gap-2 text-xs font-semibold text-zinc-300">
              <Sparkles className="size-3.5 text-amber-300" aria-hidden />
              {totalViews.toLocaleString()} code views
            </p>
            <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-500">
              Every demo above is live — hover, click and focus to feel each effect.
            </p>
          </div>
        </aside>

        {/* ---- Main ---- */}
        <main className="min-w-0 flex-1 py-8">
          {/* Mobile category chips */}
          <div
            className="fx-scroll-horizontal -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 lg:hidden"
            role="tablist"
            aria-label="Effect categories"
          >
            <MobileChip
              label="All"
              active={category === "all"}
              onClick={() => setCategory("all")}
            />
            {effectCategories.map((cat) => (
              <MobileChip
                key={cat.id}
                label={cat.label}
                active={category === cat.id}
                onClick={() => setCategory(cat.id)}
              />
            ))}
            <MobileChip
              label={`Favorites (${favorites.size})`}
              active={favOnly}
              onClick={() => setFavOnly((v) => !v)}
            />
          </div>

          {/* Hero */}
          {category === "all" && !query && !favOnly && (
            <section
              aria-labelledby="hero-title"
              className="relative mb-8 overflow-hidden rounded-2xl border border-zinc-800/80 bg-gradient-to-br from-zinc-900 via-zinc-900/70 to-zinc-950 p-6 sm:p-8"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-blue-500/20 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-28 -left-16 size-64 rounded-full bg-amber-400/10 blur-3xl"
              />
              <div className="relative">
                <Badge className="mb-3 bg-blue-400/15 text-[11px] font-medium text-blue-300 hover:bg-blue-400/15">
                  <Sparkles className="mr-1 size-3" aria-hidden />
                  100% dependency-free CSS
                </Badge>
                <h2
                  id="hero-title"
                  className="text-2xl font-bold tracking-tight sm:text-3xl"
                >
                  {allEffects.length} effects.{" "}
                  <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-amber-300 bg-clip-text text-transparent">
                    Zero JavaScript.
                  </span>
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-zinc-400">
                  A hand-crafted library of buttons, loaders, text animations, cards,
                  backgrounds and inputs. Every demo is rendered live — hover, click
                  and focus to interact, then copy the CSS straight into your project.
                </p>
                <p dir="rtl" className="mt-3 text-sm font-medium text-blue-300/90">
                  حلول برمجية متكاملة — من الفكرة إلى الإطلاق · من صولة للأنظمة
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {effectCategories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className="rounded-full border border-zinc-700/80 bg-zinc-900/60 px-3.5 py-1.5 text-xs font-medium text-zinc-300 transition-colors hover:border-blue-400/40 hover:text-blue-300"
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Library stats */}
                <dl className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { label: "Effects", value: `${allEffects.length}` },
                    { label: "Categories", value: `${effectCategories.length}` },
                    {
                      label: "Tags",
                      value: `${allEffects.reduce((n, e) => n + e.tags.length, 0)}`,
                    },
                    { label: "JS Dependencies", value: "0" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-lg border border-zinc-800/80 bg-zinc-900/60 px-3.5 py-2.5"
                    >
                      <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                        {stat.label}
                      </dt>
                      <dd className="mt-0.5 text-lg font-bold tabular-nums text-blue-300">
                        {stat.value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {/* Get the whole library */}
                <div className="mt-4 rounded-xl border border-blue-500/20 bg-zinc-950/70 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-zinc-300">
                      Grab the whole library in one file
                    </p>
                    <p dir="rtl" className="text-[11px] text-zinc-500">
                      خذ المكتبة كاملة بملف واحد
                    </p>
                  </div>
                  <div className="mt-2.5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
                    <code className="fx-scroll-horizontal min-w-0 flex-1 overflow-x-auto whitespace-nowrap rounded-lg border border-zinc-800 bg-[#0d1117] px-3 py-2.5 font-mono text-[0.72rem] leading-relaxed text-zinc-300">
                      &lt;link rel="stylesheet" href="{CDN_URL}"&gt;
                    </code>
                    <div className="flex shrink-0 gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-9 gap-1.5 border-zinc-700/80 bg-transparent text-xs font-medium text-zinc-300 hover:border-blue-400/40 hover:bg-blue-400/10 hover:text-blue-300"
                        onClick={() => handleCopy(CDN_URL, "CDN link")}
                      >
                        <Link2 className="size-3.5" aria-hidden />
                        Copy CDN
                      </Button>
                      <a
                        href="spos-effects.css"
                        download="spos-effects.css"
                        className="inline-flex h-9 items-center gap-1.5 rounded-md bg-blue-500 px-3.5 text-xs font-semibold text-white shadow-lg shadow-blue-500/20 transition-colors hover:bg-blue-400"
                      >
                        <Download className="size-3.5" aria-hidden />
                        Download CSS
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* Section title */}
          <div className="mb-5 flex items-end justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold tracking-tight">
                {favOnly
                  ? "Your Favorites"
                  : (activeCategoryMeta?.label ?? "All Effects")}
              </h3>
              <p className="mt-0.5 text-xs text-zinc-500">
                {activeCategoryMeta?.description ??
                  "Browse every effect in the library"}
                {query.trim() && (
                  <>
                    {" "}
                    · results for{" "}
                    <span className="text-blue-400">&ldquo;{query.trim()}&rdquo;</span>
                  </>
                )}
              </p>
            </div>
            <p className="shrink-0 text-xs tabular-nums text-zinc-500">
              {filteredEffects.length} shown
            </p>
          </div>

          {/* Grid */}
          {filteredEffects.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredEffects.map((effect, index) => (
                <EffectCard
                  key={effect.id}
                  effect={effect}
                  index={index}
                  favorited={favorites.has(effect.id)}
                  views={views[effect.id] ?? 0}
                  onToggleFavorite={handleToggleFavorite}
                  onOpenCode={handleOpenCode}
                  onCopyCss={(e) => handleCopy(e.css, "CSS")}
                  onShare={handleShare}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 px-6 py-20 text-center">
              <span className="grid size-14 place-items-center rounded-full bg-zinc-900">
                <SearchX className="size-7 text-zinc-500" aria-hidden />
              </span>
              <h4 className="mt-4 text-base font-semibold text-zinc-300">
                No effects found
              </h4>
              <p className="mt-1 max-w-sm text-sm text-zinc-500">
                {favOnly && favorites.size === 0
                  ? "Tap the heart on any effect card to save it here."
                  : "Try a different search term or switch category."}
              </p>
              {(query || favOnly || category !== "all") && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setFavOnly(false);
                    setCategory("all");
                  }}
                  className="mt-5 rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-400"
                >
                  Reset filters
                </button>
              )}
            </div>
          )}

          {/* ============ FAQ ============ */}
          <section aria-labelledby="faq-title" className="mt-14 scroll-mt-24">
            <div className="mb-4">
              <h2
                id="faq-title"
                className="text-lg font-semibold tracking-tight"
              >
                Frequently Asked Questions
              </h2>
              <p dir="rtl" className="mt-0.5 text-xs text-zinc-500">
                الأسئلة الشائعة حول مكتبة SPOS Effects
              </p>
            </div>
            <Accordion
              type="single"
              collapsible
              className="overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/40 px-5"
            >
              <AccordionItem value="what" className="border-zinc-800/80">
                <AccordionTrigger className="py-4 text-left text-sm font-medium text-zinc-200 hover:text-blue-300 hover:no-underline">
                  What is SPOS Effects? · ما هي مكتبة SPOS Effects؟
                </AccordionTrigger>
                <AccordionContent className="text-xs leading-relaxed text-zinc-400">
                  An open-source library of 30 hand-crafted, 100% pure-CSS effects —
                  buttons, text animations, loaders, cards, backgrounds, and inputs —
                  each with a live demo and copy-ready code. Every class is prefixed
                  with{" "}
                  <code className="rounded bg-zinc-800 px-1 py-0.5 font-mono text-[0.68rem] text-blue-300">
                    fx-
                  </code>{" "}
                  and the whole library ships as a single stylesheet.
                  <span dir="rtl" className="mt-2 block">
                    مكتبة مفتوحة المصدر تضم 30 تأثير CSS جاهزاً مع معاينة حية ونسخ
                    بنقرة واحدة — من صولة للأنظمة.
                  </span>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="how" className="border-zinc-800/80">
                <AccordionTrigger className="py-4 text-left text-sm font-medium text-zinc-200 hover:text-blue-300 hover:no-underline">
                  How do I use the effects in my project? · كيف أستخدم التأثيرات؟
                </AccordionTrigger>
                <AccordionContent className="text-xs leading-relaxed text-zinc-400">
                  Add one stylesheet — the CDN link above, or the downloaded{" "}
                  <code className="rounded bg-zinc-800 px-1 py-0.5 font-mono text-[0.68rem] text-blue-300">
                    spos-effects.css
                  </code>{" "}
                  — then put an fx- class on any element, e.g.{" "}
                  <code className="rounded bg-zinc-800 px-1 py-0.5 font-mono text-[0.68rem] text-blue-300">
                    &lt;button class="fx-btn-neon-glow"&gt;
                  </code>
                  . Works with React, Vue, Svelte, Angular, or plain HTML.
                  <span dir="rtl" className="mt-2 block">
                    أضف ملف واحد فقط ثم استخدم صنف fx- على أي عنصر — يعمل مع أي
                    إطار عمل أو HTML خالص.
                  </span>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="js" className="border-zinc-800/80">
                <AccordionTrigger className="py-4 text-left text-sm font-medium text-zinc-200 hover:text-blue-300 hover:no-underline">
                  Does it require JavaScript? · هل تحتاج إلى JavaScript؟
                </AccordionTrigger>
                <AccordionContent className="text-xs leading-relaxed text-zinc-400">
                  No. The effects themselves are 100% pure CSS with zero JavaScript
                  and zero dependencies — what you copy into your project is CSS
                  only. This demo site is a Next.js app, but that is just the
                  showcase.
                  <span dir="rtl" className="mt-2 block">
                    التأثيرات نفسها CSS خالص تماماً بدون أي JavaScript — موقع العرض
                    فقط مبني بـ Next.js.
                  </span>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="free" className="border-zinc-800/80">
                <AccordionTrigger className="py-4 text-left text-sm font-medium text-zinc-200 hover:text-blue-300 hover:no-underline">
                  Is it free? · هل هي مجانية؟
                </AccordionTrigger>
                <AccordionContent className="text-xs leading-relaxed text-zinc-400">
                  Yes — released under the MIT License, free for personal and
                  commercial projects with no attribution required.
                  <span dir="rtl" className="mt-2 block">
                    مجانية بالكامل بموجب رخصة MIT للاستخدام الشخصي والتجاري.
                  </span>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem
                value="who"
                className="border-b-0 border-zinc-800/80"
              >
                <AccordionTrigger className="py-4 text-left text-sm font-medium text-zinc-200 hover:text-blue-300 hover:no-underline">
                  Who built it? · من طوّر المكتبة؟
                </AccordionTrigger>
                <AccordionContent className="text-xs leading-relaxed text-zinc-400">
                  SPOS Effects is crafted by{" "}
                  <a
                    href="https://spos.ly"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-300 underline-offset-2 hover:underline"
                  >
                    SPOS Systems (صولة للأنظمة)
                  </a>
                  , a Libyan software company building complete solutions from idea
                  to launch — websites, e-commerce, administrative systems, and
                  custom apps.
                  <span dir="rtl" className="mt-2 block">
                    طوّرتها صولة للأنظمة — شركة ليبية للحلول البرمجية المتكاملة من
                    الفكرة إلى الإطلاق. تواصل: spos.ly · واتساب 0935535606
                  </span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </main>
      </div>

      {/* ============ SPOS promo CTA ============ */}
      <section
        aria-labelledby="spos-cta-title"
        className="border-t border-zinc-800/70"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-blue-500/20 bg-gradient-to-l from-blue-600/15 via-zinc-900/60 to-zinc-900/60 p-6 sm:p-8">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 -top-24 size-56 rounded-full bg-blue-500/15 blur-3xl"
            />
            <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <Badge className="mb-3 bg-blue-400/15 text-[11px] font-medium text-blue-300 hover:bg-blue-400/15">
                  <Sparkles className="mr-1 size-3" aria-hidden />
                  تطوير · تصميم · حلول برمجية
                </Badge>
                <h2
                  id="spos-cta-title"
                  dir="rtl"
                  className="text-lg font-bold leading-snug text-zinc-100 sm:text-xl"
                >
                  تحتاج موقعاً أو تطبيقاً احترافياً؟
                </h2>
                <p
                  dir="rtl"
                  className="mt-2 text-sm leading-relaxed text-zinc-400"
                >
                  صولة للأنظمة — حلول برمجية متكاملة من الفكرة إلى الإطلاق:
                  مواقع، متاجر إلكترونية، أنظمة إدارية، وتطبيقات مخصصة.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-2.5">
                <a
                  href="https://wa.me/218935535606"
                  target="_blank"
                  rel="noopener noreferrer"
                  dir="rtl"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-blue-500/25 transition-colors hover:bg-blue-400"
                >
                  <MessageCircle className="size-4" aria-hidden />
                  تواصل واتساب
                </a>
                <a
                  href="https://spos.ly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:border-blue-400/50 hover:text-blue-300"
                >
                  <Globe className="size-4" aria-hidden />
                  spos.ly
                </a>
                <a
                  href="tel:0935535606"
                  dir="rtl"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-zinc-900/70 px-4 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:border-blue-400/50 hover:text-blue-300"
                >
                  <Phone className="size-4" aria-hidden />
                  اتصل الآن
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ Footer ============ */}
      <footer className="mt-auto border-t border-zinc-800/70 bg-zinc-950">
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2.5">
                <span
                  className="grid size-8 place-items-center rounded-lg bg-gradient-to-br from-sky-400 to-blue-600"
                  aria-hidden
                >
                  <span className="font-mono text-[13px] font-bold italic tracking-tighter text-white">
                    fx
                  </span>
                </span>
                <p className="text-sm font-bold text-zinc-100">
                  SPOS <span className="text-blue-400">Effects</span>
                </p>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                An open-source library of {allEffects.length} hand-crafted, pure-CSS
                effects — live demos, one-click copy, zero JavaScript.
              </p>
              <p dir="rtl" className="mt-2 text-xs font-medium text-blue-300/90">
                حلول برمجية متكاملة — من الفكرة إلى الإطلاق
              </p>
            </div>

            <nav aria-label="Company links" className="flex flex-col gap-2.5 text-xs">
              <p className="font-semibold uppercase tracking-[0.14em] text-zinc-400">
                صولة للأنظمة · SPOS Systems
              </p>
              <a
                href="https://spos.ly"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-blue-300"
              >
                <Globe className="size-3.5" aria-hidden />
                spos.ly
              </a>
              <a
                href="https://wa.me/218935535606"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-blue-300"
              >
                <MessageCircle className="size-3.5" aria-hidden />
                WhatsApp · +218 93 553 5606
              </a>
              <a
                href="tel:0935535606"
                className="inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-blue-300"
              >
                <Phone className="size-3.5" aria-hidden />
                0935535606
              </a>
            </nav>

            <div className="flex flex-col gap-2.5 text-xs text-zinc-500">
              <a
                href="https://github.com/spos-systems/SPOS-Effects"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-blue-300"
              >
                <Github className="size-3.5" aria-hidden />
                github.com/spos-systems/SPOS-Effects
              </a>
              <a
                href="llms.txt"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-zinc-400 transition-colors hover:text-blue-300"
              >
                <Sparkles className="size-3.5" aria-hidden />
                llms.txt — AI-friendly index
              </a>
              <p className="tabular-nums">
                {allEffects.length} effects · {effectCategories.length} categories ·{" "}
                {allEffects.reduce((n, e) => n + e.tags.length, 0)} tags
              </p>
              <p>MIT License · v1.0.1</p>
            </div>
          </div>
          <div className="mt-6 border-t border-zinc-800/70 pt-4 text-center text-[11px] text-zinc-600">
            © 2026 صولة للأنظمة (SPOS Systems) · SPOS Effects is open source under the
            MIT License
          </div>
        </div>
      </footer>

      {/* ============ Code dialog ============ */}
      <CodeDialog
        effect={dialogEffect}
        onClose={handleCloseDialog}
        onCopy={handleCopy}
      />
    </div>
  );
}

function SidebarItem({
  icon: Icon,
  label,
  count,
  active,
  onClick,
}: {
  icon: typeof Type;
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={cn(
        "relative flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
        active
          ? "bg-zinc-800/80 font-medium text-blue-300"
          : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
      )}
    >
      {active && (
        <span
          aria-hidden
          className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-blue-400"
        />
      )}
      <span className="flex items-center gap-2.5">
        <Icon className={cn("size-4", active ? "text-blue-400" : "text-zinc-500")} aria-hidden />
        {label}
      </span>
      <span className="text-xs tabular-nums text-zinc-500">{count}</span>
    </button>
  );
}

function MobileChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-4 py-1.5 text-xs font-medium transition-colors",
        active
          ? "border-blue-500 bg-blue-500 text-white"
          : "border-zinc-700/80 bg-zinc-900/60 text-zinc-300"
      )}
    >
      {label}
    </button>
  );
}
