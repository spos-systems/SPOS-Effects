"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Code2, Copy, Eye, Heart, Share2 } from "lucide-react";
import type { CssEffect } from "@/lib/effects";
import { cn } from "@/lib/utils";
import { EffectPreview } from "./effect-preview";

interface EffectCardProps {
  effect: CssEffect;
  index: number;
  favorited: boolean;
  views: number;
  onToggleFavorite: (effectId: string) => void;
  onOpenCode: (effect: CssEffect) => void;
  onCopyCss: (effect: CssEffect) => void;
  onShare: (effect: CssEffect) => void;
}

export function EffectCard({
  effect,
  index,
  favorited,
  views,
  onToggleFavorite,
  onOpenCode,
  onCopyCss,
  onShare,
}: EffectCardProps) {
  return (
    <article
      id={`fx-${effect.id}`}
      className="group flex animate-in fade-in slide-in-from-bottom-4 duration-500 flex-col overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/50 scroll-mt-24 transition-colors duration-300 hover:border-blue-500/30"
      style={{ animationDelay: `${Math.min(index, 12) * 50}ms`, animationFillMode: "backwards" }}
    >
      <EffectPreview effect={effect} />

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[0.95rem] font-semibold text-zinc-100">
              {effect.name}
            </h3>
            <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-500">
              {effect.description}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onShare(effect)}
              aria-label={`Share ${effect.name} link`}
              title="Copy shareable link"
              className="shrink-0 rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-blue-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              <Share2 className="size-[1.05rem]" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => onToggleFavorite(effect.id)}
              aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
              aria-pressed={favorited}
              className="shrink-0 rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-rose-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              <Heart
                className={cn(
                  "size-[1.05rem] transition-all duration-300",
                  favorited ? "scale-110 fill-rose-500 text-rose-500" : "group-hover:text-zinc-300"
                )}
              />
            </button>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {effect.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-zinc-800/80 text-[0.68rem] font-medium text-zinc-400"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between gap-2 pt-4">
          <span className="inline-flex items-center gap-1.5 text-xs tabular-nums text-zinc-500">
            <Eye className="size-3.5" aria-hidden />
            {views.toLocaleString()} views
          </span>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8 gap-1.5 border-zinc-700/80 bg-transparent text-xs font-medium text-zinc-300 hover:border-blue-400/40 hover:bg-blue-400/10 hover:text-blue-300"
              onClick={() => onCopyCss(effect)}
            >
              <Copy className="size-3.5" aria-hidden />
              CSS
            </Button>
            <Button
              size="sm"
              className="h-8 gap-1.5 bg-blue-500 text-xs font-semibold text-white hover:bg-blue-400"
              onClick={() => onOpenCode(effect)}
            >
              <Code2 className="size-3.5" aria-hidden />
              Code
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
