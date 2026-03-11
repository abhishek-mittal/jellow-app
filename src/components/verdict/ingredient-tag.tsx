"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import type { IngredientSafety } from "@/lib/types";

export type { IngredientSafety };

export interface IngredientTagProps {
  name: string;
  safety: IngredientSafety;
  description?: string;
  onPress?: () => void;
  className?: string;
}

const safetyConfig: Record<
  IngredientSafety,
  { bg: string; text: string }
> = {
  safe: {
    bg: "bg-v-good-bg",
    text: "text-v-good",
  },
  caution: {
    bg: "bg-v-caution-bg",
    text: "text-v-caution",
  },
  harmful: {
    bg: "bg-v-avoid-bg",
    text: "text-v-avoid",
  },
};

export function IngredientTag({
  name,
  safety,
  description,
  onPress,
  className,
}: IngredientTagProps) {
  const [expanded, setExpanded] = useState(false);
  const config = safetyConfig[safety];

  function handlePress() {
    if (description) {
      setExpanded((prev) => !prev);
    }
    onPress?.();
  }

  return (
    <div className={cn("inline-block", className)}>
      <button
        type="button"
        onClick={handlePress}
        className={cn(
          "inline-flex max-w-[160px] items-center gap-1 rounded-[var(--r-sm)] px-2.5 py-1 text-xs font-semibold transition-opacity hover:opacity-80",
          config.bg,
          config.text
        )}
      >
        <span className="truncate">{name}</span>
        {description && (
          <span className="shrink-0 text-[10px] opacity-60">ⓘ</span>
        )}
      </button>

      {expanded && description && (
        <div className="mt-1 rounded-[var(--r-sm)] border border-j-stone bg-j-warm-white px-3 py-2">
          <p className="text-xs font-semibold text-j-navy">{name}</p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-j-navy-soft">{description}</p>
        </div>
      )}
    </div>
  );
}
