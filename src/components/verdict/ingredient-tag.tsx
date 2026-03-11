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
  { borderColor: string; bgColor: string; textColor: string }
> = {
  safe: {
    borderColor: "var(--verdict-excellent)",
    bgColor: "rgba(26,188,156,0.10)",
    textColor: "var(--verdict-excellent)",
  },
  caution: {
    borderColor: "var(--verdict-caution)",
    bgColor: "rgba(255,217,61,0.15)",
    textColor: "#B8860B",
  },
  harmful: {
    borderColor: "var(--verdict-avoid)",
    bgColor: "rgba(233,30,99,0.10)",
    textColor: "var(--verdict-avoid)",
  },
};

export function IngredientTag({
  name,
  safety,
  description,
  onPress,
  className,
}: IngredientTagProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const config = safetyConfig[safety];

  function handlePress() {
    if (description) {
      setShowTooltip((prev) => !prev);
    }
    onPress?.();
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handlePress}
        className={cn(
          "inline-flex max-w-[140px] items-center gap-1 rounded-full border-l-[3px] px-3 py-1 text-xs font-semibold transition-opacity hover:opacity-80",
          className
        )}
        style={{
          borderLeftColor: config.borderColor,
          backgroundColor: config.bgColor,
          color: config.textColor,
        }}
      >
        <span className="truncate">{name}</span>
        {description && (
          <span className="shrink-0 text-[10px] opacity-60">ⓘ</span>
        )}
      </button>

      {showTooltip && description && (
        <div className="absolute bottom-full left-0 z-10 mb-2 w-48 rounded-xl bg-gray-900 p-3 text-white shadow-medium">
          <p className="text-xs font-semibold">{name}</p>
          <p className="mt-1 text-[11px] leading-relaxed opacity-80">{description}</p>
          {/* Arrow */}
          <div className="absolute -bottom-1 left-4 h-2 w-2 rotate-45 bg-gray-900" />
        </div>
      )}
    </div>
  );
}
