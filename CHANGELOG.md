# Changelog

All notable changes to the SPOS Effects project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-11-22

### Added

- 30 hand-crafted, 100% dependency-free, pure-CSS effects across 6 categories:
  - **Buttons (6):** Slide Fill, Neon Glow, 3D Push, Border Runner, Arrow Swap, Ripple Press
  - **Text Effects (5):** Gradient Flow, Typewriter, Highlight Sweep, Glitch, Wave Letters
  - **Loaders (5):** Dual Ring, Bouncing Dots, Pulse Ring, Stripe Progress Bar, Orbit
  - **Cards (5):** Hover Lift, 3D Flip, Spotlight, Image Zoom Reveal, Animated Gradient Border
  - **Backgrounds (5):** Shifting Gradient, Futuristic Grid, Drifting Dot Matrix, Moving Diagonal Stripes, Aurora
  - **Inputs (4):** Underline Grow, Floating Label, Glow Focus, Expanding Search
- Live interactive demo site built with Next.js 16, TypeScript, Tailwind CSS 4, shadcn/ui, and Prisma/SQLite, with dark and light preview stages for every effect.
- Search and category filtering across the whole collection.
- Favorites persisted in SQLite via Prisma, plus per-effect view counters.
- One-click copy for CSS and HTML snippets.
- Code dialog with syntax highlighting for every effect.
- Compiled all-in-one stylesheet `spos-effects.css` at the repository root, regenerated with `bun run build:css`.
- CI workflow that lints the codebase and verifies that `spos-effects.css` is up to date.
- GitHub Pages deployment workflow (`.github/workflows/deploy.yml`): the demo is built as a pure static export and published automatically on every push to `main`, with automatic `localStorage` persistence fallback for favorites and view counters (`src/lib/client-store.ts`) so every feature keeps working with zero backend.
- Full SEO package: structured data (JSON-LD for Organization, WebSite, and SoftwareApplication), Open Graph and Twitter cards with a 1200×630 social image, canonical URL, sitemap, robots rules, and geographic targeting for Libya (`geo.region`, `geo.placename`).
- Bilingual documentation (English and Arabic): README, CONTRIBUTING, SECURITY, issue templates, and pull request template.

[1.0.0]: https://github.com/spos-systems/SPOS-Effects/releases/tag/v1.0.0
