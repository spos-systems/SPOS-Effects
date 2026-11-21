import type { CssEffect } from "./types";

export const textEffects: CssEffect[] = [
  {
    id: "text-gradient-flow",
    name: "Gradient Flow",
    category: "text",
    description:
      "An animated multi-color gradient that flows endlessly through the letters, made with background-clip: text and a looping background-position animation.",
    tags: ["gradient", "animation", "background-clip", "headline"],
    previewTheme: "dark",
    previewHeight: 170,
    html: `<h3 class="fx-text-gradient-flow">Gradient Flow</h3>`,
    css: `.fx-text-gradient-flow {
  margin: 0;
  font-size: clamp(1.8rem, 5vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -0.02em;
  background: linear-gradient(90deg, #3b82f6, #fbbf24, #f472b6, #a78bfa, #3b82f6);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: fx-text-gradient-flow 6s linear infinite;
}

@keyframes fx-text-gradient-flow {
  to {
    background-position: 300% 0;
  }
}`,
  },
  {
    id: "text-typewriter",
    name: "Typewriter",
    category: "text",
    description:
      "Types and deletes text in a loop using the steps() timing function on the width property, complete with a blinking caret on the border-right.",
    tags: ["typewriter", "steps", "animation", "caret"],
    previewTheme: "dark",
    previewHeight: 170,
    html: `<h3 class="fx-text-typewriter">Pure CSS effects...</h3>`,
    css: `.fx-text-typewriter {
  margin: 0;
  font-family: "Courier New", ui-monospace, monospace;
  font-size: clamp(1.2rem, 3.5vw, 1.75rem);
  font-weight: 700;
  color: #93c5fd;
  white-space: nowrap;
  overflow: hidden;
  width: 19ch;
  border-right: 3px solid #93c5fd;
  animation:
    fx-typewriter-type 4.5s steps(19) infinite alternate,
    fx-typewriter-blink 0.7s step-end infinite;
}

@keyframes fx-typewriter-type {
  0% {
    width: 0;
  }
  15% {
    width: 0;
  }
  100% {
    width: 19ch;
  }
}

@keyframes fx-typewriter-blink {
  0%,
  100% {
    border-right-color: #93c5fd;
  }
  50% {
    border-right-color: transparent;
  }
}`,
  },
  {
    id: "text-highlight-sweep",
    name: "Highlight Sweep",
    category: "text",
    description:
      "A highlighter marker sweeps across the text on hover by animating background-size from 0% to 100% — perfect for headings that reveal emphasis.",
    tags: ["hover", "background-size", "marker", "transition"],
    previewTheme: "dark",
    previewHeight: 170,
    html: `<h3 class="fx-text-highlight-sweep">Highlight me</h3>`,
    css: `.fx-text-highlight-sweep {
  margin: 0;
  width: fit-content;
  font-size: clamp(1.6rem, 4.5vw, 2.2rem);
  font-weight: 800;
  color: #f1f5f9;
  cursor: default;
  background-image: linear-gradient(
    120deg,
    rgba(59, 130, 246, 0.4),
    rgba(251, 191, 36, 0.45)
  );
  background-repeat: no-repeat;
  background-size: 0% 46%;
  background-position: 0 82%;
  transition: background-size 0.5s ease;
}

.fx-text-highlight-sweep:hover {
  background-size: 100% 46%;
}`,
  },
  {
    id: "text-glitch",
    name: "Glitch",
    category: "text",
    description:
      "Cyberpunk distortion: two colored copies of the text (via data-text attribute and pseudo-elements) jitter with randomized clip-path slices.",
    tags: ["glitch", "clip-path", "pseudo-element", "cyberpunk"],
    previewTheme: "dark",
    previewHeight: 170,
    html: `<h3 class="fx-text-glitch" data-text="GLITCH">GLITCH</h3>`,
    css: `.fx-text-glitch {
  position: relative;
  margin: 0;
  font-size: clamp(2rem, 6vw, 3rem);
  font-weight: 800;
  letter-spacing: 0.08em;
  color: #f8fafc;
  cursor: default;
}

.fx-text-glitch::before,
.fx-text-glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  overflow: hidden;
}

.fx-text-glitch::before {
  color: #f43f5e;
  z-index: -1;
  animation: fx-glitch-shift-1 2.4s infinite linear alternate-reverse;
}

.fx-text-glitch::after {
  color: #60a5fa;
  z-index: -2;
  animation: fx-glitch-shift-2 3.1s infinite linear alternate-reverse;
}

@keyframes fx-glitch-shift-1 {
  0%   { clip-path: inset(12% 0 58% 0); transform: translate(-4px, -2px); }
  20%  { clip-path: inset(42% 0 32% 0); transform: translate(4px, 1px); }
  40%  { clip-path: inset(72% 0 8% 0);  transform: translate(-3px, 2px); }
  60%  { clip-path: inset(22% 0 52% 0); transform: translate(3px, -1px); }
  80%  { clip-path: inset(52% 0 30% 0); transform: translate(-4px, 1px); }
  100% { clip-path: inset(32% 0 42% 0); transform: translate(4px, 2px); }
}

@keyframes fx-glitch-shift-2 {
  0%   { clip-path: inset(62% 0 12% 0); transform: translate(3px, 2px); }
  20%  { clip-path: inset(8% 0 72% 0);  transform: translate(-3px, -1px); }
  40%  { clip-path: inset(38% 0 42% 0); transform: translate(4px, -2px); }
  60%  { clip-path: inset(72% 0 6% 0);  transform: translate(-4px, 1px); }
  80%  { clip-path: inset(18% 0 62% 0); transform: translate(3px, -2px); }
  100% { clip-path: inset(48% 0 28% 0); transform: translate(-3px, 2px); }
}`,
  },
  {
    id: "text-wave-letters",
    name: "Wave Letters",
    category: "text",
    description:
      "Each letter rides a gentle wave with a staggered animation-delay, creating a rippling motion — no JavaScript, just per-letter spans.",
    tags: ["wave", "stagger", "animation-delay", "playful"],
    previewTheme: "dark",
    previewHeight: 170,
    html: `<h3 class="fx-text-wave-letters">
  <span>W</span><span>A</span><span>V</span><span>E</span><span>&nbsp;</span><span>W</span><span>O</span><span>R</span><span>L</span><span>D</span>
</h3>`,
    css: `.fx-text-wave-letters {
  display: inline-flex;
  margin: 0;
  font-size: clamp(1.8rem, 5vw, 2.5rem);
  font-weight: 800;
  letter-spacing: 0.02em;
  color: #3b82f6;
  cursor: default;
}

.fx-text-wave-letters span {
  display: inline-block;
  animation: fx-letter-wave 1.2s ease-in-out infinite;
}

.fx-text-wave-letters span:nth-child(1)  { animation-delay: 0s;    color: #3b82f6; }
.fx-text-wave-letters span:nth-child(2)  { animation-delay: 0.1s;  color: #93c5fd; }
.fx-text-wave-letters span:nth-child(3)  { animation-delay: 0.2s;  color: #fbbf24; }
.fx-text-wave-letters span:nth-child(4)  { animation-delay: 0.3s;  color: #fb923c; }
.fx-text-wave-letters span:nth-child(5)  { animation-delay: 0.4s;  }
.fx-text-wave-letters span:nth-child(6)  { animation-delay: 0.5s;  color: #f472b6; }
.fx-text-wave-letters span:nth-child(7)  { animation-delay: 0.6s;  color: #e879f9; }
.fx-text-wave-letters span:nth-child(8)  { animation-delay: 0.7s;  color: #a78bfa; }
.fx-text-wave-letters span:nth-child(9)  { animation-delay: 0.8s;  color: #93c5fd; }
.fx-text-wave-letters span:nth-child(10) { animation-delay: 0.9s;  color: #3b82f6; }

@keyframes fx-letter-wave {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.45em);
  }
}`,
  },
];
