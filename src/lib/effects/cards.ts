import type { CssEffect } from "./types";

export const cardEffects: CssEffect[] = [
  {
    id: "card-hover-lift",
    name: "Hover Lift",
    category: "cards",
    description:
      "The card floats up with a soft blue glow on hover. A spring-like cubic-bezier easing makes the motion feel physical.",
    tags: ["hover", "lift", "shadow", "elevation"],
    previewTheme: "light",
    previewHeight: 260,
    html: `<article class="fx-card-hover-lift">
  <h4>Hover Lift</h4>
  <p>Float above the noise with a spring-eased elevation and a glowing blue aura.</p>
  <span class="fx-card-hover-lift-link">Learn more &rarr;</span>
</article>`,
    css: `.fx-card-hover-lift {
  width: 250px;
  padding: 1.5rem;
  border-radius: 1rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 10px rgba(15, 23, 42, 0.06);
  cursor: pointer;
  transition:
    transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.35s ease,
    border-color 0.35s ease;
}

.fx-card-hover-lift h4 {
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
}

.fx-card-hover-lift p {
  margin: 0 0 0.9rem;
  font-size: 0.85rem;
  line-height: 1.55;
  color: #64748b;
}

.fx-card-hover-lift-link {
  font-size: 0.82rem;
  font-weight: 600;
  color: #2563eb;
}

.fx-card-hover-lift:hover {
  transform: translateY(-10px);
  border-color: #3b82f6;
  box-shadow: 0 24px 44px -14px rgba(37, 99, 235, 0.35);
}`,
  },
  {
    id: "card-flip-3d",
    name: "3D Flip",
    category: "cards",
    description:
      "A true 3D card flip on hover: preserve-3d keeps both faces in shared perspective while backface-visibility hides the far side.",
    tags: ["3d", "flip", "perspective", "backface-visibility"],
    previewTheme: "dark",
    previewHeight: 260,
    html: `<div class="fx-card-flip-3d">
  <div class="fx-card-flip-3d-inner">
    <div class="fx-card-flip-3d-face fx-card-flip-3d-front">
      <strong>Hover to flip</strong>
      <small>Front side</small>
    </div>
    <div class="fx-card-flip-3d-face fx-card-flip-3d-back">
      <strong>Back side</strong>
      <small>See you on the flip side</small>
    </div>
  </div>
</div>`,
    css: `.fx-card-flip-3d {
  width: 250px;
  height: 160px;
  perspective: 1000px;
}

.fx-card-flip-3d-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.7s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.fx-card-flip-3d:hover .fx-card-flip-3d-inner {
  transform: rotateY(180deg);
}

.fx-card-flip-3d-face {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 1rem;
  border-radius: 1rem;
  text-align: center;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
}

.fx-card-flip-3d-face strong {
  font-size: 1.1rem;
}

.fx-card-flip-3d-face small {
  font-size: 0.8rem;
  opacity: 0.75;
}

.fx-card-flip-3d-front {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: #ffffff;
}

.fx-card-flip-3d-back {
  background: #0f172a;
  border: 1px solid #1e3a6e;
  color: #bfdbfe;
  transform: rotateY(180deg);
}`,
  },
  {
    id: "card-spotlight",
    name: "Spotlight",
    category: "cards",
    description:
      "Hovering reveals a radial spotlight that washes over the card. Tip: drive the position with a --fx-x/--fx-y custom property and two lines of JS to make it follow the cursor.",
    tags: ["hover", "spotlight", "radial-gradient", "custom-property"],
    previewTheme: "dark",
    previewHeight: 260,
    html: `<article class="fx-card-spotlight">
  <h4>Spotlight</h4>
  <p>A soft blue light blooms from the center of the card on hover.</p>
</article>`,
    css: `.fx-card-spotlight {
  position: relative;
  width: 250px;
  padding: 1.5rem;
  border-radius: 1rem;
  background: #0f172a;
  border: 1px solid #1e293b;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.fx-card-spotlight::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(
    260px circle at var(--fx-x, 50%) var(--fx-y, 50%),
    rgba(59, 130, 246, 0.2),
    transparent 65%
  );
  opacity: 0;
  transition: opacity 0.35s ease;
}

.fx-card-spotlight h4 {
  position: relative;
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #f1f5f9;
}

.fx-card-spotlight p {
  position: relative;
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.55;
  color: #94a3b8;
}

.fx-card-spotlight:hover {
  border-color: rgba(59, 130, 246, 0.45);
}

.fx-card-spotlight:hover::before {
  opacity: 1;
}`,
  },
  {
    id: "card-image-zoom",
    name: "Image Zoom Reveal",
    category: "cards",
    description:
      "A cover image (here a pure-CSS sunset gradient) zooms gently while a caption slides up with a gradient scrim — a classic media card pattern.",
    tags: ["zoom", "caption", "scrim", "media"],
    previewTheme: "dark",
    previewHeight: 260,
    html: `<figure class="fx-card-image-zoom">
  <div class="fx-card-image-zoom-img"></div>
  <figcaption class="fx-card-image-zoom-caption">
    <strong>Golden Hour</strong>
    <span>Sunset over the bay</span>
  </figcaption>
</figure>`,
    css: `.fx-card-image-zoom {
  position: relative;
  width: 250px;
  height: 172px;
  margin: 0;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
}

.fx-card-image-zoom-img {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 72% 30%, #fef3c7 0 14px, transparent 15px),
    linear-gradient(180deg, #7c2d12 0%, #ea580c 38%, #fbbf24 72%, #fde68a 100%);
  transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
}

.fx-card-image-zoom:hover .fx-card-image-zoom-img {
  transform: scale(1.15);
}

.fx-card-image-zoom-caption {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 2.4rem 1.1rem 1rem;
  background: linear-gradient(to top, rgba(2, 6, 23, 0.92), transparent);
  color: #f8fafc;
  transform: translateY(38%);
  opacity: 0;
  transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease;
}

.fx-card-image-zoom-caption strong {
  font-size: 1.05rem;
}

.fx-card-image-zoom-caption span {
  font-size: 0.78rem;
  opacity: 0.8;
}

.fx-card-image-zoom:hover .fx-card-image-zoom-caption {
  transform: translateY(0);
  opacity: 1;
}`,
  },
  {
    id: "card-gradient-border",
    name: "Animated Gradient Border",
    category: "cards",
    description:
      "A rotating conic-gradient ring glows around the card forever. The ring is an oversized pseudo-element clipped by overflow: hidden.",
    tags: ["gradient", "border", "conic-gradient", "glow"],
    previewTheme: "dark",
    previewHeight: 260,
    html: `<article class="fx-card-gradient-border">
  <h4>Gradient Border</h4>
  <p>An aurora ring endlessly circles this card. Zero JavaScript, one pseudo-element.</p>
</article>`,
    css: `.fx-card-gradient-border {
  position: relative;
  z-index: 0;
  width: 250px;
  padding: 1.5rem;
  border-radius: 1rem;
  background: transparent;
  overflow: hidden;
  cursor: pointer;
}

.fx-card-gradient-border::before {
  content: "";
  position: absolute;
  z-index: -2;
  inset: -60%;
  background: conic-gradient(
    #3b82f6,
    #fbbf24,
    #f472b6,
    #a78bfa,
    #60a5fa,
    #3b82f6
  );
  animation: fx-grad-border-spin 5s linear infinite;
}

.fx-card-gradient-border::after {
  content: "";
  position: absolute;
  inset: 2px;
  z-index: -1;
  border-radius: calc(1rem - 2px);
  background: #0f172a;
  transition: background 0.3s ease;
}

.fx-card-gradient-border h4 {
  position: relative;
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  font-weight: 700;
  color: #f1f5f9;
}

.fx-card-gradient-border p {
  position: relative;
  margin: 0;
  font-size: 0.85rem;
  line-height: 1.55;
  color: #94a3b8;
}

.fx-card-gradient-border:hover::after {
  background: #111f33;
}

@keyframes fx-grad-border-spin {
  to {
    transform: rotate(360deg);
  }
}`,
  },
];
