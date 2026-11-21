import type { CssEffect, EffectCategory, EffectCategoryId } from "./types";
import { buttonEffects } from "./buttons";
import { textEffects } from "./text";
import { loaderEffects } from "./loaders";
import { cardEffects } from "./cards";
import { backgroundEffects } from "./backgrounds";
import { inputEffects } from "./inputs";

export type { CssEffect, EffectCategory, EffectCategoryId };

export const effectCategories: EffectCategory[] = [
  { id: "buttons", label: "Buttons", description: "Hover, press & border micro-interactions" },
  { id: "text", label: "Text Effects", description: "Animated typography & headlines" },
  { id: "loaders", label: "Loaders", description: "Spinners, progress & waiting states" },
  { id: "cards", label: "Cards", description: "3D flips, lifts & spotlight surfaces" },
  { id: "backgrounds", label: "Backgrounds", description: "Gradients, grids & ambient patterns" },
  { id: "inputs", label: "Inputs", description: "Fields with delightful focus states" },
];

export const allEffects: CssEffect[] = [
  ...buttonEffects,
  ...textEffects,
  ...loaderEffects,
  ...cardEffects,
  ...backgroundEffects,
  ...inputEffects,
];

export const effectsByCategory = (category: EffectCategoryId): CssEffect[] =>
  allEffects.filter((effect) => effect.category === category);

export const getEffect = (id: string): CssEffect | undefined =>
  allEffects.find((effect) => effect.id === id);

export const allEffectsCss: string = allEffects.map((effect) => effect.css).join("\n\n");
