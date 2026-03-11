"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Chip } from "@heroui/chip";
import type { IngredientSafety } from "@/lib/types";

export type { IngredientSafety };

export interface IngredientTagProps {
  name: string;
  safety: IngredientSafety;
  description?: string;
  onPress?: () => void;
  className?: string;
}

const safetyColorMap: Record<IngredientSafety, "success" | "warning" | "danger"> = {
  safe: "success",
  caution: "warning",
  harmful: "danger",
};

export function IngredientTag({
  name,
  safety,
  description,
  onPress,
  className,
}: IngredientTagProps) {
  const [expanded, setExpanded] = useState(false);

  function handlePress() {
    if (description) {
      setExpanded((prev) => !prev);
    }
    onPress?.();
  }

  return (
    <div className={cn("inline-block", className)}>
      <Chip
        as="button"
        color={safetyColorMap[safety]}
        variant="flat"
        size="sm"
        onClick={handlePress}
        endContent={description ? <span className="shrink-0 text-[10px] opacity-60">ⓘ</span> : undefined}
        classNames={{
          base: "cursor-pointer max-w-[160px] transition-opacity hover:opacity-80",
          content: "font-semibold text-xs truncate",
        }}
      >
        {name}
      </Chip>

      {expanded && description && (
        <div className="mt-1 rounded-[var(--r-sm)] border border-j-stone bg-j-warm-white px-3 py-2">
          <p className="text-xs font-semibold text-j-navy">{name}</p>
          <p className="mt-0.5 text-[11px] leading-relaxed text-j-navy-soft">{description}</p>
        </div>
      )}
    </div>
  );
}
