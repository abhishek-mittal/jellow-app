"use client";

import { cn } from "@/lib/utils";
import type { VerdictLevel } from "@/lib/types";

const levelColors: Record<VerdictLevel, { bg: string; shadow: string }> = {
  excellent: { bg: "bg-[#2ABFBF]", shadow: "shadow-[0_8px_32px_rgba(42,191,191,0.35)]" },
  good: { bg: "bg-[#2ABFBF]", shadow: "shadow-[0_8px_32px_rgba(42,191,191,0.35)]" },
  caution: { bg: "bg-[#F5A623]", shadow: "shadow-[0_8px_32px_rgba(245,166,35,0.35)]" },
  avoid: { bg: "bg-[#E74C3C]", shadow: "shadow-[0_8px_32px_rgba(231,76,60,0.35)]" },
};

interface ScoreCircleProps {
  score: number;
  level: VerdictLevel;
  size?: number;
  className?: string;
}

export function ScoreCircle({ score, level, size = 120, className }: ScoreCircleProps) {
  const { bg, shadow } = levelColors[level];

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-full",
        bg,
        shadow,
        className,
      )}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Score: ${score} out of 100`}
    >
      <span className="font-heading font-bold text-white leading-none flex items-baseline gap-0.5">
        <span style={{ fontSize: size * 0.35 }}>{score}</span>
        <span style={{ fontSize: size * 0.15 }} className="opacity-80">/100</span>
      </span>
    </div>
  );
}
