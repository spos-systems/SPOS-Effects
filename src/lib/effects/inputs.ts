import type { CssEffect } from "./types";

export const inputEffects: CssEffect[] = [
  {
    id: "input-underline-grow",
    name: "Underline Grow",
    category: "inputs",
    description:
      "Focus the field and a two-tone gradient underline grows outward from the center — powered by :focus-within and a transform-happy pseudo-element.",
    tags: ["focus", "underline", "gradient", "focus-within"],
    previewTheme: "dark",
    previewHeight: 175,
    html: `<div class="fx-input-underline-grow">
  <input type="text" placeholder="Focus me..." />
</div>`,
    css: `.fx-input-underline-grow {
  position: relative;
  width: 240px;
}

.fx-input-underline-grow input {
  width: 100%;
  box-sizing: border-box;
  padding: 0.7rem 0.25rem;
  font-size: 0.95rem;
  color: #e2e8f0;
  background: transparent;
  border: none;
  border-bottom: 2px solid #475569;
  outline: none;
  transition: border-color 0.3s ease;
}

.fx-input-underline-grow input::placeholder {
  color: #64748b;
}

.fx-input-underline-grow input:focus {
  border-bottom-color: rgba(71, 85, 105, 0.35);
}

.fx-input-underline-grow::before {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #3b82f6, #fbbf24);
  transform: translateX(-50%);
  transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.fx-input-underline-grow:focus-within::before {
  width: 100%;
}`,
  },
  {
    id: "input-floating-label",
    name: "Floating Label",
    category: "inputs",
    description:
      "The label shrinks and floats to the top when the field is focused or filled. The trick: :not(:placeholder-shown) needs an empty placeholder to detect content.",
    tags: ["label", "float", "placeholder-shown", "form"],
    previewTheme: "dark",
    previewHeight: 185,
    html: `<div class="fx-input-floating-label">
  <input type="email" id="fx-float-demo" placeholder=" " />
  <label for="fx-float-demo">Email address</label>
</div>`,
    css: `.fx-input-floating-label {
  position: relative;
  width: 250px;
}

.fx-input-floating-label input {
  width: 100%;
  box-sizing: border-box;
  padding: 1.15rem 1rem 0.5rem;
  font-size: 0.95rem;
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid #334155;
  border-radius: 0.6rem;
  outline: none;
  transition: border-color 0.3s ease;
}

.fx-input-floating-label input:focus {
  border-color: #3b82f6;
}

.fx-input-floating-label label {
  position: absolute;
  left: 1rem;
  top: 0.85rem;
  color: #64748b;
  font-size: 0.95rem;
  pointer-events: none;
  transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.fx-input-floating-label input:focus + label,
.fx-input-floating-label input:not(:placeholder-shown) + label {
  top: 0.32rem;
  font-size: 0.68rem;
  letter-spacing: 0.05em;
  color: #3b82f6;
}`,
  },
  {
    id: "input-glow-focus",
    name: "Glow Focus",
    category: "inputs",
    description:
      "On focus the field lifts slightly and lights up with a layered amber glow — a friendly, tactile way to show where the user is typing.",
    tags: ["focus", "glow", "box-shadow", "lift"],
    previewTheme: "dark",
    previewHeight: 175,
    html: `<input class="fx-input-glow-focus" type="text" placeholder="Start typing..." />`,
    css: `.fx-input-glow-focus {
  width: 250px;
  box-sizing: border-box;
  padding: 0.85rem 1.1rem;
  font-size: 0.95rem;
  color: #e2e8f0;
  background: #0f172a;
  border: 2px solid #334155;
  border-radius: 0.7rem;
  outline: none;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.3s ease;
}

.fx-input-glow-focus::placeholder {
  color: #64748b;
}

.fx-input-glow-focus:focus {
  border-color: #fbbf24;
  box-shadow:
    0 0 0 4px rgba(251, 191, 36, 0.18),
    0 0 26px rgba(251, 191, 36, 0.28);
  transform: translateY(-3px);
}`,
  },
  {
    id: "input-search-expand",
    name: "Expanding Search",
    category: "inputs",
    description:
      "A circular icon that blooms into a full search field on focus. The wrapper animates its width while the magnifier glides to the right edge.",
    tags: ["search", "expand", "focus-within", "icon"],
    previewTheme: "dark",
    previewHeight: 185,
    html: `<div class="fx-input-search-expand">
  <input type="text" placeholder="Search effects..." aria-label="Search" />
  <span class="fx-input-search-expand-icon" aria-hidden="true">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
      stroke-width="2.2" stroke-linecap="round">
      <circle cx="11" cy="11" r="7"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </svg>
  </span>
</div>`,
    css: `.fx-input-search-expand {
  position: relative;
  display: flex;
  align-items: center;
  width: 54px;
  height: 54px;
  border-radius: 999px;
  background: #0f172a;
  border: 2px solid #334155;
  overflow: hidden;
  cursor: text;
  transition:
    width 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.3s ease,
    box-shadow 0.3s ease;
}

.fx-input-search-expand:focus-within {
  width: 250px;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.18);
}

.fx-input-search-expand input {
  flex: 1;
  min-width: 0;
  padding: 0 3.2rem 0 1.15rem;
  font-size: 0.95rem;
  color: #e2e8f0;
  background: transparent;
  border: none;
  outline: none;
}

.fx-input-search-expand input::placeholder {
  color: #64748b;
}

.fx-input-search-expand-icon {
  position: absolute;
  right: 50%;
  top: 50%;
  transform: translate(50%, -50%);
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  color: #3b82f6;
  pointer-events: none;
  transition: right 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
}

.fx-input-search-expand-icon svg {
  width: 100%;
  height: 100%;
}

.fx-input-search-expand:focus-within .fx-input-search-expand-icon {
  right: 0.95rem;
  transform: translateY(-50%);
}`,
  },
];
