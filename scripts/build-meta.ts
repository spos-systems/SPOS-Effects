/**
 * Generates the AI-agent & machine-readable metadata files in `public/`:
 *
 *   - effects.json   — machine-readable catalog of every effect
 *   - llms.txt       — curated overview for LLMs & AI agents (llmstxt.org)
 *   - llms-full.txt  — expanded version with the complete library CSS + HTML
 *   - humans.txt     — credits
 *   - spos-effects.css — served copy of the compiled stylesheet (download)
 *
 * Run: bun run build:meta
 * CI verifies these files are up to date (see .github/workflows/ci.yml).
 */
import { copyFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { allEffects, allEffectsCss, effectCategories } from "../src/lib/effects";

const VERSION = "1.0.2";
const SITE = "https://spos-systems.github.io/SPOS-Effects";
const REPO = "https://github.com/spos-systems/SPOS-Effects";
const CDN = `https://cdn.jsdelivr.net/gh/spos-systems/SPOS-Effects@v${VERSION}/spos-effects.css`;

const root = join(import.meta.dir, "..");

/* ------------------------------------------------------------------ */
/* effects.json — machine-readable catalog                             */
/* ------------------------------------------------------------------ */

const catalog = {
  name: "SPOS Effects",
  version: VERSION,
  description:
    "Open-source library of 30 hand-crafted, pure-CSS effects with live demos and one-click copy. Zero JavaScript, zero dependencies. By SPOS Systems (صولة للأنظمة).",
  website: SITE,
  repository: REPO,
  license: "MIT",
  installation: { cssFile: CDN, download: `${SITE}/spos-effects.css` },
  author: {
    name: "SPOS Systems (صولة للأنظمة)",
    website: "https://spos.ly",
    phone: "+218-93-553-5606",
    whatsapp: "https://wa.me/218935535606",
  },
  categories: effectCategories,
  effects: allEffects.map((effect) => ({
    id: effect.id,
    name: effect.name,
    category: effect.category,
    description: effect.description,
    tags: effect.tags,
    demo: `${SITE}/?effect=${effect.id}`,
    css: `${SITE}/spos-effects.css`,
  })),
};

writeFileSync(
  join(root, "public", "effects.json"),
  JSON.stringify(catalog, null, 2) + "\n",
  "utf8"
);

/* ------------------------------------------------------------------ */
/* llms.txt — curated overview for AI agents                           */
/* ------------------------------------------------------------------ */

const effectIndex = effectCategories
  .map((category) => {
    const items = allEffects
      .filter((effect) => effect.category === category.id)
      .map(
        (effect) =>
          `- [${effect.id}] ${effect.name}: ${effect.description} Tags: ${effect.tags.join(", ")}.`
      )
      .join("\n");
    return `## ${category.label} (${category.description})\n\n${items}`;
  })
  .join("\n\n");

const llmsTxt = `# SPOS Effects

> Open-source library of ${allEffects.length} hand-crafted, pure-CSS effects — buttons, text animations, loaders, cards, backgrounds, and inputs — with live interactive demos and one-click copy. Zero JavaScript, zero dependencies, MIT licensed. By SPOS Systems (صولة للأنظمة), Libya.

- Website / live demos: ${SITE}
- GitHub repository: ${REPO}
- Machine-readable catalog: ${SITE}/effects.json
- Complete CSS in one file (this version): ${CDN}
- Download the compiled stylesheet: ${SITE}/spos-effects.css
- License: MIT (free for personal and commercial use)
- Contact: SPOS Systems — https://spos.ly · WhatsApp https://wa.me/218935535606 · +218 93 553 5606

## How to use

Add one stylesheet, then put an \`fx-\` class on any element. Every effect is fully self-contained and works with any framework (React, Vue, Svelte, Angular) or plain HTML:

\`\`\`html
<link rel="stylesheet" href="${CDN}" />
<button class="fx-btn-neon-glow">Get Started</button>
\`\`\`

Each effect has its own shareable demo page — open any effect and copy its exact CSS and HTML from the code dialog, e.g. ${SITE}/?effect=btn-neon-glow

## The effects (id · name · description · tags)

${effectIndex}

## About the authors

SPOS Systems (صولة للأنظمة) is a Libyan software company building complete software solutions "from idea to launch" (حلول برمجية متكاملة — من الفكرة إلى الإطلاق): websites, e-commerce stores, administrative systems, and custom applications. Contact: https://spos.ly · WhatsApp: https://wa.me/218935535606 · Phone: +218 93 553 5606.
`;

writeFileSync(join(root, "public", "llms.txt"), llmsTxt, "utf8");

/* ------------------------------------------------------------------ */
/* llms-full.txt — everything, including the full CSS                  */
/* ------------------------------------------------------------------ */

const perEffect = allEffects
  .map(
    (effect) => `### ${effect.name} (\`${effect.id}\`)

${effect.description}

HTML:

\`\`\`html
${effect.html}
\`\`\`
`
  )
  .join("\n");

const llmsFullTxt = `# SPOS Effects — full reference

> Complete, expanded reference of the SPOS Effects library for LLMs and AI agents. Includes every effect with its demo HTML and the full compiled CSS (${allEffects.length} effects, pure CSS, MIT).

- Website: ${SITE}
- Repository: ${REPO}
- Catalog: ${SITE}/effects.json
- One-file CSS: ${CDN}

## Effect reference (HTML snippets)

${perEffect}

## Full compiled CSS (spos-effects.css)

\`\`\`css
${allEffectsCss}
\`\`\`

## Usage

\`\`\`html
<link rel="stylesheet" href="${CDN}" />
<button class="fx-btn-slide-fill">Hover Me</button>
\`\`\`
`;

writeFileSync(join(root, "public", "llms-full.txt"), llmsFullTxt, "utf8");

/* ------------------------------------------------------------------ */
/* humans.txt                                                          */
/* ------------------------------------------------------------------ */

const humansTxt = `/* TEAM */

        SPOS Systems — صولة للأنظمة
        Complete software solutions, from idea to launch
        Website: https://spos.ly
        WhatsApp: https://wa.me/218935535606
        Phone: +218 93 553 5606
        GitHub: https://github.com/spos-systems

/* SITE */

        Language: English + Arabic
        Stack: Next.js, TypeScript, Tailwind CSS, shadcn/ui, Prisma
        Effects: 100% pure CSS — zero JavaScript
`;

writeFileSync(join(root, "public", "humans.txt"), humansTxt, "utf8");

/* ------------------------------------------------------------------ */
/* spos-effects.css — served copy for one-click download               */
/* ------------------------------------------------------------------ */

copyFileSync(join(root, "spos-effects.css"), join(root, "public", "spos-effects.css"));

console.log(
  `Meta generated: effects.json (${allEffects.length} effects), llms.txt, llms-full.txt (${Math.round(
    llmsFullTxt.length / 1024
  )} KB), humans.txt, public/spos-effects.css`
);
