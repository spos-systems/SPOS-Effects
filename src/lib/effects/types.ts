export type EffectCategoryId =
  | "buttons"
  | "text"
  | "loaders"
  | "cards"
  | "backgrounds"
  | "inputs";

export interface EffectCategory {
  id: EffectCategoryId;
  label: string;
  description: string;
}

export interface CssEffect {
  /** Unique slug, also used as CSS class prefix */
  id: string;
  /** Display name */
  name: string;
  category: EffectCategoryId;
  /** Short description of the effect */
  description: string;
  /** Searchable tags */
  tags: string[];
  /** Demo HTML snippet */
  html: string;
  /** Demo CSS (self-contained, prefixed with .fx-) */
  css: string;
  /** Preview surface: dark or light */
  previewTheme: "dark" | "light";
  /** Preview area height in px */
  previewHeight: number;
}
