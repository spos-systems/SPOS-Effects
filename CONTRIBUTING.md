# Contributing to SPOS Effects

Thank you for your interest in contributing to SPOS Effects. Whether you are reporting a bug, suggesting a new effect, or opening a pull request — every contribution is welcome.

## Ways to Contribute

- **Report a bug** — open an issue using the bug report template.
- **Suggest a feature or a new effect** — open an issue using the feature request template. New effect ideas are especially welcome; please check the existing collection first to avoid duplicates.
- **Improve the docs** — typo fixes and clarifications are always appreciated.
- **Submit a pull request** — follow the guides below.

## Development Setup

Prerequisites:

- [Bun](https://bun.sh) v1+ (recommended) or Node.js 18+
- Git

```bash
git clone https://github.com/spos-systems/SPOS-Effects.git
cd SPOS-Effects
bun install
bun run db:push   # set up the local SQLite database (favorites & view stats)
bun run dev       # http://localhost:3000
```

## Adding a New Effect

The effects library data lives in `src/lib/effects/`, one TypeScript file per category:

| File | Category |
| --- | --- |
| `buttons.ts` | Buttons |
| `text.ts` | Text effects |
| `loaders.ts` | Loaders |
| `cards.ts` | Cards |
| `backgrounds.ts` | Backgrounds |
| `inputs.ts` | Inputs |

To add a new effect:

1. Open the file that matches your category and append your effect to the exported array. If you want to introduce a brand-new category, please open an issue first so we can discuss it.
2. Follow the rules:
   - **Class prefix** — every class must be prefixed with `fx-` (for example `fx-btn-slide-fill`). This keeps the library collision-free.
   - **Keyframes** — every `@keyframes` name must be prefixed with `fx-` as well (for example `fx-loader-orbit-spin`).
   - **Self-contained CSS** — no JavaScript, no external assets, and no dependency on other effects, frameworks, or utility classes.
   - **Metadata** — include the `html` snippet, `tags`, `description`, and `previewTheme` (plus `previewHeight` where the default preview area does not fit your effect).
3. A complete example (see `src/lib/effects/types.ts` for the full `CssEffect` interface):

```ts
{
  id: "btn-slide-fill",
  name: "Slide Fill",
  category: "buttons",
  description: "A solid layer slides in from the left on hover while the label changes color.",
  tags: ["hover", "transition", "minimal"],
  previewTheme: "dark",
  previewHeight: 170,
  html: `<button class="fx-btn-slide-fill">Hover Me</button>`,
  css: `
    .fx-btn-slide-fill { /* ... */ }
    .fx-btn-slide-fill::before { /* ... */ }
  `,
}
```

4. Regenerate the compiled stylesheet so `spos-effects.css` stays in sync:

```bash
bun run build:css
```

5. Lint your changes:

```bash
bun run lint
```

6. Commit everything (including the regenerated `spos-effects.css`) and open a pull request. One effect per PR is preferred.

## Style Guidelines

- **Dark-friendly** — the demo defaults to a dark stage, so every effect must look great on dark backgrounds and hold up on the light stage too.
- **Reduced motion** — respecting `prefers-reduced-motion` is a big plus and will be noticed.
- **Dependency-free** — pure CSS only. No JavaScript, no external fonts, no images, and no framework or utility classes inside effect CSS.
- **No collisions** — always use the `fx-` prefix and scope selectors to your own classes only.
- **Performance** — prefer animating `transform` and `opacity` over properties that trigger layout or paint.

## Submitting a Pull Request

1. Fork the repository and create a descriptive branch (for example `fx-new-effect-name`).
2. Fill in the pull request template.
3. Make sure the checklist passes: `fx-` prefixes, self-contained CSS, regenerated `spos-effects.css`, and a clean lint run.
4. CI runs on every pull request — both the lint job and the `spos-effects.css` freshness check must pass.

## Need Help?

Open an issue or reach us directly on WhatsApp: https://wa.me/218935535606

---

## الملخص بالعربية

شكراً لاهتمامك بالمساهمة في SPOS Effects. يمكنك المساهمة عبر الإبلاغ عن الأخطاء، أو اقتراح تأثيرات وميزات جديدة، أو فتح pull request.

لإضافة تأثير جديد: أضف التأثير في الملف المناسب داخل src/lib/effects مع الالتزام بالقواعد التالية: بادئة `fx-` لجميع الأصناف ولكل أسماء keyframes، وأن يكون كود CSS مستقلاً تماماً وبدون JavaScript أو أي اعتماديات، مع إرفاق كود HTML والوسوم والوصف و previewTheme لكل تأثير. بعد ذلك شغّل `bun run build:css` لإعادة توليد ملف spos-effects.css المجمّع، ثم تأكد من نجاح `bun run lint`، ثم افتح pull request مع تعبئة قائمة التحقق. يُفضَّل تأثير واحد لكل pull request.

يرجى أن تبدو التأثيرات جيدة على الخلفيات الداكنة والفاتحة معاً، ونقدّر جداً دعم prefers-reduced-motion. للتواصل معنا: واتساب https://wa.me/218935535606
