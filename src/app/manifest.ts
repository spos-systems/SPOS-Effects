import type { MetadataRoute } from "next";

// Required for `output: "export"` (GitHub Pages static build) in Next.js 16.
export const dynamic = "force-static";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://spos-systems.github.io/SPOS-Effects"
).replace(/\/+$/, "");

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "SPOS Effects — Open-Source CSS Effects Library",
    short_name: "SPOS Effects",
    description:
      "30 hand-crafted, pure-CSS effects with live demos and one-click copy. Zero JavaScript. By SPOS Systems (صولة للأنظمة).",
    // Relative URLs so the manifest keeps working under the GitHub Pages subpath.
    start_url: "./",
    scope: "./",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#09090b",
    categories: ["developer", "productivity", "design"],
    icons: [
      {
        src: `${SITE_URL}/favicon.svg`,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
