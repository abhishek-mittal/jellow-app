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
  sm: { px: 48, strokeWidth: 4, scoreFontSize: "0.625rem", labelFontSize: "0.5rem" },
  md: { px: 80, strokeWidth: 6, scoreFontSize: "1rem", labelFontSize: "0.625rem" },
  lg: { px: 120, strokeWidth: 8, scoreFontSize: "1.5rem", labelFontSize: "0.75rem" },
};

const verdictColor: Record<HealthVerdict, string> = {
  good: "var(--candy-mint)",
  moderate: "var(--verdict-caution)",
  bad: "var(--candy-pink)",
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
        {/* Track */}
        <circle
          cx={px / 2}
          cy={px / 2}
          r={radius}
          fill="none"
          stroke="var(--gray-100)"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <circle
          cx={px / 2}
          cy={px / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: "stroke-dashoffset 0.6s ease-out" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span
          className="font-bold leading-none"
          style={{ fontSize: scoreFontSize, color }}
        >
          {score}
        </span>
        {showLabel && (
          <span
            className="mt-0.5 font-medium text-[var(--gray-500)]"
            style={{ fontSize: labelFontSize }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
