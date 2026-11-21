import type { CssEffect } from "./types";

export const buttonEffects: CssEffect[] = [
  {
    id: "btn-slide-fill",
    name: "Slide Fill",
    category: "buttons",
    description:
      "A solid layer slides in from the left on hover while the label smoothly changes color, using a ::before pseudo-element and transform transitions.",
    tags: ["hover", "pseudo-element", "transition", "minimal"],
    previewTheme: "light",
    previewHeight: 170,
    html: `<button class="fx-btn-slide-fill">Hover Me</button>`,
    css: `.fx-btn-slide-fill {
  position: relative;
  z-index: 0;
  padding: 0.875rem 2.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #2563eb;
  background: transparent;
  border: 2px solid #2563eb;
  border-radius: 0.55rem;
  cursor: pointer;
  overflow: hidden;
  transition: color 0.35s ease;
}

.fx-btn-slide-fill::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: #2563eb;
  transform: translateX(-101%);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.fx-btn-slide-fill:hover {
  color: #ffffff;
}

.fx-btn-slide-fill:hover::before {
  transform: translateX(0);
}`,
  },
  {
    id: "btn-neon-glow",
    name: "Neon Glow",
    category: "buttons",
    description:
      "A cyberpunk-style neon button. Text-shadow and layered box-shadows bloom into a bright blue halo on hover.",
    tags: ["hover", "neon", "glow", "box-shadow", "cyberpunk"],
    previewTheme: "dark",
    previewHeight: 170,
    html: `<button class="fx-btn-neon-glow">Power On</button>`,
    css: `.fx-btn-neon-glow {
  padding: 0.875rem 2.25rem;
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #60a5fa;
  background: rgba(96, 165, 250, 0.06);
  border: 2px solid #60a5fa;
  border-radius: 0.55rem;
  cursor: pointer;
  text-shadow: 0 0 8px rgba(96, 165, 250, 0.6);
  box-shadow:
    inset 0 0 14px rgba(96, 165, 250, 0.12),
    0 0 12px rgba(96, 165, 250, 0.18);
  transition: all 0.3s ease;
}

.fx-btn-neon-glow:hover {
  color: #0b1220;
  background: #60a5fa;
  text-shadow: none;
  box-shadow:
    0 0 22px rgba(96, 165, 250, 0.85),
    0 0 64px rgba(96, 165, 250, 0.45);
}`,
  },
  {
    id: "btn-3d-push",
    name: "3D Push",
    category: "buttons",
    description:
      "A chunky retro arcade button with a hard shadow base. Pressing it (active state) sinks the button into its shadow for a physical 3D feel.",
    tags: ["3d", "active", "box-shadow", "tactile", "retro"],
    previewTheme: "light",
    previewHeight: 185,
    html: `<button class="fx-btn-3d-push">Press Me</button>`,
    css: `.fx-btn-3d-push {
  padding: 0.9rem 2.25rem;
  font-size: 0.95rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #fff1f2;
  background: #f43f5e;
  border: none;
  border-radius: 0.65rem;
  cursor: pointer;
  transform: translateY(0);
  box-shadow:
    0 6px 0 #9f1239,
    0 12px 18px rgba(159, 18, 57, 0.35);
  transition: transform 0.1s ease, box-shadow 0.1s ease, background 0.2s ease;
}

.fx-btn-3d-push:hover {
  background: #fb7185;
}

.fx-btn-3d-push:active {
  transform: translateY(6px);
  box-shadow:
    0 0 0 #9f1239,
    0 3px 8px rgba(159, 18, 57, 0.25);
}`,
  },
  {
    id: "btn-border-runner",
    name: "Border Runner",
    category: "buttons",
    description:
      "A comet of gradient light endlessly orbits the button border, built with a rotating conic-gradient pseudo-element clipped by overflow: hidden.",
    tags: ["conic-gradient", "animation", "border", "premium"],
    previewTheme: "dark",
    previewHeight: 170,
    html: `<button class="fx-btn-border-runner">Loading...</button>`,
    css: `.fx-btn-border-runner {
  position: relative;
  z-index: 0;
  padding: 0.875rem 2.25rem;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #fbbf24;
  background: transparent;
  border: none;
  border-radius: 0.6rem;
  overflow: hidden;
  cursor: pointer;
}

.fx-btn-border-runner::before {
  content: "";
  position: absolute;
  z-index: -2;
  left: 50%;
  top: 50%;
  width: 200%;
  aspect-ratio: 1;
  transform: translate(-50%, -50%) rotate(0deg);
  background: conic-gradient(
    transparent 0deg,
    #fbbf24 40deg,
    #f59e0b 80deg,
    transparent 120deg,
    transparent 360deg
  );
  animation: fx-border-runner-spin 2.4s linear infinite;
}

.fx-btn-border-runner::after {
  content: "";
  position: absolute;
  inset: 2px;
  z-index: -1;
  border-radius: calc(0.6rem - 2px);
  background: #1c1917;
  transition: background 0.3s ease;
}

.fx-btn-border-runner:hover {
  color: #78350f;
}

.fx-btn-border-runner:hover::after {
  background: #fbbf24;
}

@keyframes fx-border-runner-spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}`,
  },
  {
    id: "btn-arrow-swap",
    name: "Arrow Swap",
    category: "buttons",
    description:
      "On hover the arrow icon slides out and a second one slides in from the right, while the button fills with color — a classic modern CTA micro-interaction.",
    tags: ["hover", "icon", "micro-interaction", "cta"],
    previewTheme: "light",
    previewHeight: 170,
    html: `<button class="fx-btn-arrow-swap">
  <span class="fx-btn-arrow-swap-label">Explore</span>
  <span class="fx-btn-arrow-swap-icon" aria-hidden="true"></span>
</button>`,
    css: `.fx-btn-arrow-swap {
  position: relative;
  z-index: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.875rem 1.9rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #2563eb;
  background: transparent;
  border: 2px solid #2563eb;
  border-radius: 999px;
  cursor: pointer;
  overflow: hidden;
  transition: color 0.35s ease;
}

.fx-btn-arrow-swap::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  transform: translateX(-101%);
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.fx-btn-arrow-swap:hover {
  color: #ffffff;
}

.fx-btn-arrow-swap:hover::before {
  transform: translateX(0);
}

.fx-btn-arrow-swap-icon {
  position: relative;
  width: 1.15em;
  height: 1.15em;
  overflow: hidden;
}

.fx-btn-arrow-swap-icon::before,
.fx-btn-arrow-swap-icon::after {
  content: "\\2192";
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: 1.05em;
  line-height: 1;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.fx-btn-arrow-swap-icon::after {
  transform: translateX(110%);
}

.fx-btn-arrow-swap:hover .fx-btn-arrow-swap-icon::before {
  transform: translateX(-110%);
}

.fx-btn-arrow-swap:hover .fx-btn-arrow-swap-icon::after {
  transform: translateX(0);
}`,
  },
  {
    id: "btn-ripple",
    name: "Ripple Press",
    category: "buttons",
    description:
      "Material-style ripple that radiates from the center on every press, animated with the :active pseudo-class — no JavaScript required.",
    tags: ["ripple", "active", "material", "animation"],
    previewTheme: "dark",
    previewHeight: 170,
    html: `<button class="fx-btn-ripple">Click Me</button>`,
    css: `.fx-btn-ripple {
  position: relative;
  overflow: hidden;
  padding: 0.9rem 2.4rem;
  font-size: 0.95rem;
  font-weight: 600;
  color: #ffffff;
  background: linear-gradient(135deg, #8b5cf6, #d946ef);
  border: none;
  border-radius: 0.6rem;
  cursor: pointer;
  box-shadow: 0 10px 24px rgba(139, 92, 246, 0.35);
  transition: transform 0.15s ease, box-shadow 0.25s ease;
}

.fx-btn-ripple:active {
  transform: scale(0.95);
  box-shadow: 0 6px 14px rgba(139, 92, 246, 0.3);
}

.fx-btn-ripple::after {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 130%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
  transform: translate(-50%, -50%) scale(0);
  opacity: 0;
}

.fx-btn-ripple:active::after {
  animation: fx-btn-ripple 0.65s ease-out;
}

@keyframes fx-btn-ripple {
  from {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.6;
  }
  to {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0;
  }
}`,
  },
];
