/**
 * Builds `spos-effects.css` — the compiled, all-in-one stylesheet that
 * contains every SPOS Effects effect, organized by category.
 *
 * Run: bun run build:css
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";
import { allEffects, effectCategories } from "../src/lib/effects";

const BANNER = `/*!
 * SPOS Effects v1.0.2 — Open-source CSS effects library
 * https://github.com/spos-systems/SPOS-Effects
 *
 * Crafted by SPOS Systems (صولة للأنظمة) — https://spos.ly
 * حلول برمجية متكاملة - من الفكرة إلى الإطلاق
 *
 * ${allEffects.length} pure-CSS effects. Zero JavaScript. MIT licensed.
 * Every class is prefixed with \`fx-\` to avoid collisions.
 */
`;

const sections = effectCategories.map((category) => {
  const effects = allEffects.filter((effect) => effect.category === category.id);
  const blocks = effects.map(
    (effect) => `/* --- ${effect.name} --- */\n${effect.css}`
  );
  return `/* ============================================================\n   ${category.label} — ${category.description}\n   ============================================================ */\n\n${blocks.join("\n\n")}`;
});

const output = `${BANNER}\n${sections.join("\n\n")}\n`;

const target = join(import.meta.dir, "..", "spos-effects.css");
writeFileSync(target, output, "utf8");

console.log(
  `spos-effects.css generated: ${allEffects.length} effects, ${
    output.split("\n").length
  } lines -> ${target}`
);
