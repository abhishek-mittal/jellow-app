"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export type HealthVerdict = "good" | "moderate" | "bad";
export type RingSize = "sm" | "md" | "lg";

export interface HealthScoreRingProps {
  score: number;
  size?: RingSize;
  showLabel?: boolean;
  verdict: HealthVerdict;
  className?: string;
}

const sizeMap: Record<
  RingSize,
  { px: number; strokeWidth: number; scoreFontSize: string; labelFontSize: string }
> = {
  sm: { px: 48, strokeWidth: 3, scoreFontSize: "0.625rem", labelFontSize: "0.5rem" },
  md: { px: 80, strokeWidth: 3, scoreFontSize: "1rem", labelFontSize: "0.625rem" },
  lg: { px: 120, strokeWidth: 3, scoreFontSize: "1.5rem", labelFontSize: "0.75rem" },
};

const verdictColor: Record<HealthVerdict, string> = {
  good: "var(--v-good)",
  moderate: "var(--v-caution)",
  bad: "var(--v-avoid)",
};

const verdictLabel: Record<HealthVerdict, string> = {
  good: "Good",
  moderate: "Okay",
  bad: "Poor",
};

export function HealthScoreRing({
  score,
  size = "md",
  showLabel = true,
  verdict,
  className,
}: HealthScoreRingProps) {
  const { px, strokeWidth, scoreFontSize, labelFontSize } = sizeMap[size];
  const radius = (px - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.min(Math.max(score, 0), 10);
  const targetOffset = circumference - (clampedScore / 10) * circumference;

  const [dashOffset, setDashOffset] = useState(circumference);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setDashOffset(targetOffset);
    });
    return () => cancelAnimationFrame(raf);
  }, [targetOffset]);

  const color = verdictColor[verdict];
  const label = verdictLabel[verdict];

  return (
    <div
      className={cn("relative inline-flex items-center justify-center", className)}
      role="img"
      aria-label={`Health score: ${score} out of 10 — ${label}`}
    >
      <svg width={px} height={px} className="-rotate-90">
        <circle
          cx={px / 2}
          cy={px / 2}
          r={radius}
          fill="none"
          stroke="var(--j-stone)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={px / 2}
          cy={px / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="square"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.6s ease-out" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span
          className="font-[var(--font-heading)] font-bold leading-none"
          style={{ fontSize: scoreFontSize, color }}
        >
          {score}
        </span>
        {showLabel && (
          <span
            className="mt-0.5 text-j-navy-soft uppercase tracking-wider"
            style={{ fontSize: labelFontSize }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
