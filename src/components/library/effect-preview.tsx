"use client";

import type { CssEffect } from "@/lib/effects";
import { cn } from "@/lib/utils";

interface EffectPreviewProps {
  effect: CssEffect;
  /** Override the height (used for compact contexts) */
  height?: number;
}

/**
 * Live demo stage for a CSS effect. Renders the effect's HTML markup
 * on a neutral surface so dark- and light-themed effects both look great.
 */
export function EffectPreview({ effect, height }: EffectPreviewProps) {
  const isDark = effect.previewTheme === "dark";
  const isBackground = effect.category === "backgrounds";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        isDark ? "bg-[#0a0f1c]" : "bg-zinc-100"
      )}
      style={{ height: height ?? effect.previewHeight }}
    >
      {/* subtle stage texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={
          isDark
            ? {
                backgroundImage:
                  "radial-gradient(rgba(148, 163, 184, 0.09) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }
            : {
                backgroundImage:
                  "linear-gradient(rgba(15, 23, 42, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(15, 23, 42, 0.045) 1px, transparent 1px)",
                backgroundSize: "20px 20px",
              }
        }
      />
      {/* theme transition hint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent"
      />
      {isBackground ? (
        <div
          className="absolute inset-0"
          dangerouslySetInnerHTML={{ __html: effect.html }}
        />
      ) : (
        <div
          className="relative z-10 flex w-full justify-center px-4 py-4"
          dangerouslySetInnerHTML={{ __html: effect.html }}
        />
      )}
    </div>
  );
}
