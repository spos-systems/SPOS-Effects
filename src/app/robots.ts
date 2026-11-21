import type { MetadataRoute } from "next";

// Required for `output: "export"` (GitHub Pages static build) in Next.js 16.
export const dynamic = "force-static";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://spos-systems.github.io/SPOS-Effects"
).replace(/\/+$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
