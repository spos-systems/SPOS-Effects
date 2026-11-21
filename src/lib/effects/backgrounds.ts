import type { CssEffect } from "./types";

export const backgroundEffects: CssEffect[] = [
  {
    id: "bg-gradient-shift",
    name: "Shifting Gradient",
    category: "backgrounds",
    description:
      "A deep blue gradient that slowly drifts across an oversized background — calm, ambient, and perfect for hero sections.",
    tags: ["gradient", "ambient", "hero", "animation"],
    previewTheme: "dark",
    previewHeight: 200,
    html: `<div class="fx-bg-gradient-shift"></div>`,
    css: `.fx-bg-gradient-shift {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    240deg,
    #0c1e4a,
    #1e40af,
    #2563eb,
    #3b82f6,
    #1e40af
  );
  background-size: 400% 400%;
  animation: fx-bg-shift 14s ease infinite;
}

@keyframes fx-bg-shift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}`,
  },
  {
    id: "bg-futuristic-grid",
    name: "Futuristic Grid",
    category: "backgrounds",
    description:
      "A synthwave grid built from two repeating gradients, softly faded at the edges with a radial mask — instantly sets a tech mood.",
    tags: ["grid", "mask", "synthwave", "pattern"],
    previewTheme: "dark",
    previewHeight: 200,
    html: `<div class="fx-bg-futuristic-grid"></div>`,
    css: `.fx-bg-futuristic-grid {
  width: 100%;
  height: 100%;
  background-color: #020617;
  background-image:
    linear-gradient(rgba(96, 165, 250, 0.14) 1px, transparent 1px),
    linear-gradient(90deg, rgba(96, 165, 250, 0.14) 1px, transparent 1px);
  background-size: 34px 34px;
  -webkit-mask-image: radial-gradient(
    ellipse at center,
    black 25%,
    transparent 72%
  );
  mask-image: radial-gradient(ellipse at center, black 25%, transparent 72%);
}`,
  },
  {
    id: "bg-dot-matrix",
    name: "Drifting Dot Matrix",
    category: "backgrounds",
    description:
      "A dot-pattern background that gently drifts forever. Made with a single radial-gradient tile and an animated background-position.",
    tags: ["dots", "pattern", "drift", "radial-gradient"],
    previewTheme: "dark",
    previewHeight: 200,
    html: `<div class="fx-bg-dot-matrix"></div>`,
    css: `.fx-bg-dot-matrix {
  width: 100%;
  height: 100%;
  background-color: #0b1120;
  background-image: radial-gradient(
    rgba(59, 130, 246, 0.4) 1.5px,
    transparent 1.5px
  );
  background-size: 26px 26px;
  animation: fx-dots-drift 18s linear infinite;
}

@keyframes fx-dots-drift {
  to {
    background-position: 26px 26px;
  }
}`,
  },
  {
    id: "bg-diagonal-stripes",
    name: "Moving Diagonal Stripes",
    category: "backgrounds",
    description:
      "Amber diagonal candy stripes that scroll seamlessly. The background-position period (67.88px) matches the 45deg stripe wavelength exactly.",
    tags: ["stripes", "diagonal", "seamless", "animation"],
    previewTheme: "light",
    previewHeight: 200,
    html: `<div class="fx-bg-diagonal-stripes"></div>`,
    css: `.fx-bg-diagonal-stripes {
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    45deg,
    #f59e0b 0 24px,
    #fbbf24 24px 48px
  );
  animation: fx-stripes-scroll 1.2s linear infinite;
}

/* 48px / sin(45deg) = 67.88px -> one full period along X */
@keyframes fx-stripes-scroll {
  to {
    background-position: 67.88px 0;
  }
}`,
  },
  {
    id: "bg-aurora",
    name: "Aurora",
    category: "backgrounds",
    description:
      "Two blurred orbs of light float and morph like the northern lights — layered pseudo-elements with filter: blur and slow transforms.",
    tags: ["aurora", "blur", "ambient", "glow"],
    previewTheme: "dark",
    previewHeight: 200,
    html: `<div class="fx-bg-aurora"></div>`,
    css: `.fx-bg-aurora {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #020617;
}

.fx-bg-aurora::before,
.fx-bg-aurora::after {
  content: "";
  position: absolute;
  width: 62%;
  aspect-ratio: 1;
  border-radius: 50%;
  filter: blur(64px);
  opacity: 0.55;
}

.fx-bg-aurora::before {
  top: -22%;
  left: -12%;
  background: #3b82f6;
  animation: fx-aurora-drift-1 10s ease-in-out infinite alternate;
}

.fx-bg-aurora::after {
  bottom: -28%;
  right: -12%;
  background: #8b5cf6;
  animation: fx-aurora-drift-2 12s ease-in-out infinite alternate;
}

@keyframes fx-aurora-drift-1 {
  to {
    transform: translate(42%, 30%) scale(1.18);
  }
}

@keyframes fx-aurora-drift-2 {
  to {
    transform: translate(-36%, -26%) scale(0.88);
  }
}`,
  },
];
