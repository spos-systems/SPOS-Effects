import type { CssEffect } from "./types";

export const loaderEffects: CssEffect[] = [
  {
    id: "loader-dual-ring",
    name: "Dual Ring",
    category: "loaders",
    description:
      "Two counter-rotating rings built with asymmetric border colors and opposite spin animations — a timeless spinner for any waiting state.",
    tags: ["spinner", "border", "rotate", "classic"],
    previewTheme: "dark",
    previewHeight: 170,
    html: `<div class="fx-loader-dual-ring" role="status" aria-label="Loading"></div>`,
    css: `.fx-loader-dual-ring {
  position: relative;
  width: 64px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 5px solid transparent;
  border-top-color: #3b82f6;
  border-bottom-color: #3b82f6;
  animation: fx-spin-clockwise 1.1s linear infinite;
}

.fx-loader-dual-ring::after {
  content: "";
  position: absolute;
  inset: 9px;
  border-radius: 50%;
  border: 5px solid transparent;
  border-left-color: #fbbf24;
  border-right-color: #fbbf24;
  animation: fx-spin-counter 1.7s linear infinite;
}

@keyframes fx-spin-clockwise {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fx-spin-counter {
  to {
    transform: rotate(-360deg);
  }
}`,
  },
  {
    id: "loader-bouncing-dots",
    name: "Bouncing Dots",
    category: "loaders",
    description:
      "Three playful dots bounce in sequence with staggered animation delays and a soft opacity breathing effect.",
    tags: ["dots", "bounce", "stagger", "playful"],
    previewTheme: "dark",
    previewHeight: 170,
    html: `<div class="fx-loader-bouncing-dots" role="status" aria-label="Loading">
  <span></span><span></span><span></span>
</div>`,
    css: `.fx-loader-bouncing-dots {
  display: flex;
  gap: 0.65rem;
}

.fx-loader-bouncing-dots span {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #3b82f6;
  animation: fx-dots-bounce 0.9s ease-in-out infinite;
}

.fx-loader-bouncing-dots span:nth-child(2) {
  background: #fbbf24;
  animation-delay: 0.15s;
}

.fx-loader-bouncing-dots span:nth-child(3) {
  background: #f472b6;
  animation-delay: 0.3s;
}

@keyframes fx-dots-bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 0.45;
  }
  50% {
    transform: translateY(-16px);
    opacity: 1;
  }
}`,
  },
  {
    id: "loader-pulse-ring",
    name: "Pulse Ring",
    category: "loaders",
    description:
      "Radar-style expanding rings emitted from a solid core. Two pseudo-elements share one keyframe with a one-second offset for a continuous sonar pulse.",
    tags: ["pulse", "sonar", "scale", "ping"],
    previewTheme: "dark",
    previewHeight: 175,
    html: `<div class="fx-loader-pulse-ring" role="status" aria-label="Loading"></div>`,
    css: `.fx-loader-pulse-ring {
  position: relative;
  width: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #3b82f6;
}

.fx-loader-pulse-ring::before,
.fx-loader-pulse-ring::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 3px solid #3b82f6;
  animation: fx-pulse-ring 2s cubic-bezier(0.2, 0.6, 0.4, 1) infinite;
}

.fx-loader-pulse-ring::after {
  animation-delay: 1s;
}

@keyframes fx-pulse-ring {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(3.4);
    opacity: 0;
  }
}`,
  },
  {
    id: "loader-stripe-bar",
    name: "Stripe Progress Bar",
    category: "loaders",
    description:
      "An indeterminate progress bar: a striped block slides left-to-right with repeating-linear-gradient stripes scrolling inside it.",
    tags: ["progress", "stripes", "indeterminate", "gradient"],
    previewTheme: "light",
    previewHeight: 170,
    html: `<div class="fx-loader-stripe-bar" role="status" aria-label="Loading">
  <div class="fx-loader-stripe-bar-track"></div>
</div>`,
    css: `.fx-loader-stripe-bar {
  display: flex;
  align-items: center;
  width: 230px;
  height: 14px;
  padding: 2px;
  border-radius: 999px;
  background: #e2e8f0;
}

.fx-loader-stripe-bar-track {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 999px;
  overflow: hidden;
}

.fx-loader-stripe-bar-track::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 42%;
  height: 100%;
  border-radius: 999px;
  background: repeating-linear-gradient(
    60deg,
    #3b82f6 0 12px,
    #2563eb 12px 24px
  );
  animation:
    fx-stripe-slide 1.5s cubic-bezier(0.45, 0, 0.55, 1) infinite,
    fx-stripe-scroll 0.5s linear infinite;
}

@keyframes fx-stripe-slide {
  0% {
    left: -42%;
  }
  100% {
    left: 100%;
  }
}

@keyframes fx-stripe-scroll {
  to {
    background-position: 28px 0;
  }
}`,
  },
  {
    id: "loader-orbit",
    name: "Orbit",
    category: "loaders",
    description:
      "A glowing moon circles a planet along a rotating dashed orbit — pure CSS astronomy using nested pseudo-elements.",
    tags: ["orbit", "planet", "rotate", "creative"],
    previewTheme: "dark",
    previewHeight: 175,
    html: `<div class="fx-loader-orbit" role="status" aria-label="Loading"></div>`,
    css: `.fx-loader-orbit {
  position: relative;
  width: 68px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 2px dashed rgba(148, 163, 184, 0.45);
  animation: fx-orbit-spin 5s linear infinite;
}

.fx-loader-orbit::after {
  content: "";
  position: absolute;
  inset: 22px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #93c5fd, #2563eb);
  box-shadow: 0 0 18px rgba(37, 99, 235, 0.55);
}

.fx-loader-orbit::before {
  content: "";
  position: absolute;
  top: -8px;
  left: 50%;
  width: 14px;
  aspect-ratio: 1;
  margin-left: -7px;
  border-radius: 50%;
  background: radial-gradient(circle at 35% 35%, #fde68a, #f59e0b);
  box-shadow: 0 0 14px rgba(251, 191, 36, 0.8);
}

@keyframes fx-orbit-spin {
  to {
    transform: rotate(360deg);
  }
}`,
  },
];
