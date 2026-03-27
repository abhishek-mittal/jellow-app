"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import type { VerdictLevel } from "@/lib/types";

const levelStroke: Record<VerdictLevel, string> = {
  excellent: "var(--v-good)",
  good: "var(--v-good)",
  caution: "var(--v-caution)",
  avoid: "var(--v-avoid)",
};

interface ScoreCircleProps {
  score: number;
  level: VerdictLevel;
  size?: number;
  className?: string;
}

export function ScoreCircle({ score, level, size = 120, className }: ScoreCircleProps) {
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const targetOffset = circumference - (score / 100) * circumference;
  const color = levelStroke[level];

  const [dashOffset, setDashOffset] = useState(circumference);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setDashOffset(targetOffset);
    });
    return () => cancelAnimationFrame(raf);
  }, [targetOffset]);

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      role="img"
      aria-label={`Score: ${score} out of 100`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
        />
      </svg>
      <span
        className="absolute font-[var(--font-heading)] text-2xl font-bold"
        style={{ color }}
      >
        {score}
      </span>
    </div>
  );
}
