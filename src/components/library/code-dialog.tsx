"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import type { CssEffect } from "@/lib/effects";
import { effectCategories } from "@/lib/effects";

interface CodeDialogProps {
  effect: CssEffect | null;
  onClose: () => void;
  onCopy: (text: string, label: string) => void;
}

export function CodeDialog({ effect, onClose, onCopy }: CodeDialogProps) {
  const [activeTab, setActiveTab] = useState<"css" | "html">("css");
  const categoryLabel = effect
    ? (effectCategories.find((c) => c.id === effect.category)?.label ?? effect.category)
    : "";

  return (
    <Dialog
      open={!!effect}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className="max-w-3xl gap-0 overflow-hidden border-zinc-800 bg-zinc-950 p-0 sm:rounded-xl [&>button]:top-3.5 [&>button]:z-20 [&>button]:rounded-md [&>button]:bg-zinc-800/80 [&>button]:text-zinc-300 hover:[&>button]:bg-zinc-700"
        aria-describedby={undefined}
      >
        {effect && (
          <>
            <DialogHeader className="border-b border-zinc-800/80 px-5 py-4 pr-14">
              <DialogTitle className="flex flex-wrap items-center gap-2.5 text-base">
                {effect.name}
                <Badge className="bg-blue-400/15 text-[0.68rem] font-medium text-blue-300 hover:bg-blue-400/15">
                  {categoryLabel}
                </Badge>
              </DialogTitle>
              <DialogDescription className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                {effect.description}
              </DialogDescription>
            </DialogHeader>

            <div className="px-5 py-4">
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as "css" | "html")}
              >
                <div className="flex items-center justify-between gap-3">
                  <TabsList className="bg-zinc-900">
                    <TabsTrigger
                      value="css"
                      className="text-xs data-[state=active]:bg-zinc-700 data-[state=active]:text-blue-300"
                    >
                      style.css
                    </TabsTrigger>
                    <TabsTrigger
                      value="html"
                      className="text-xs data-[state=active]:bg-zinc-700 data-[state=active]:text-blue-300"
                    >
                      index.html
                    </TabsTrigger>
                  </TabsList>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 gap-1.5 border-zinc-700/80 bg-transparent text-xs font-medium text-zinc-300 hover:border-blue-400/40 hover:bg-blue-400/10 hover:text-blue-300"
                    onClick={() =>
                      onCopy(
                        activeTab === "css" ? effect.css : effect.html,
                        activeTab === "css" ? "CSS" : "HTML"
                      )
                    }
                  >
                    <Copy className="size-3.5" aria-hidden />
                    Copy {activeTab.toUpperCase()}
                  </Button>
                </div>

                <TabsContent value="css" className="mt-3">
                  <CodeBlock code={effect.css} language="css" />
                </TabsContent>
                <TabsContent value="html" className="mt-3">
                  <CodeBlock code={effect.html} language="html" />
                </TabsContent>
              </Tabs>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  return (
    <div className="fx-scroll max-h-[52vh] overflow-auto rounded-lg border border-zinc-800 bg-[#0d1117]">
      <div className="flex items-center gap-1.5 border-b border-zinc-800/80 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-rose-500/70" aria-hidden />
        <span className="size-2.5 rounded-full bg-amber-400/70" aria-hidden />
        <span className="size-2.5 rounded-full bg-blue-400/70" aria-hidden />
        <span className="ml-2 text-[0.68rem] font-medium text-zinc-500">
          {language === "css" ? "style.css" : "index.html"}
        </span>
      </div>
      <div className="p-4">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            background: "transparent",
            padding: 0,
            fontSize: "0.78rem",
            lineHeight: 1.65,
          }}
          codeTagProps={{
            style: { fontFamily: "var(--font-geist-mono), ui-monospace, monospace" },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
