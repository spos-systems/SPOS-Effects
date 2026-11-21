import type { NextConfig } from "next";

/**
 * Static export mode — used by the GitHub Pages workflow
 * (.github/workflows/deploy.yml).
 *
 *   STATIC_EXPORT=1 NEXT_PUBLIC_STATIC=1 \
 *   NEXT_PUBLIC_BASE_PATH=/SPOS-Effects \
 *   NEXT_PUBLIC_SITE_URL=https://spos-systems.github.io/SPOS-Effects \
 *   bun run build:export
 *
 * In this mode the site is exported to `out/` as pure static files, the API
 * routes are removed by the workflow, and the client falls back to
 * localStorage for favorites & view counters (see src/lib/client-store.ts).
 *
 * Dev/server mode (default) keeps the standalone output used by `bun run build`.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH?.replace(/\/+$/, "") ?? "";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        output: "export",
        trailingSlash: true,
        images: { unoptimized: true },
        ...(basePath ? { basePath } : {}),
      }
    : { output: "standalone" }),
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
