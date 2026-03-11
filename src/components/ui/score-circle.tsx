import { cn } from "@/lib/utils";
import type { VerdictLevel } from "@/lib/types";

const levelColors: Record<VerdictLevel, string> = {
  excellent: "text-verdict-excellent",
  good: "text-verdict-good",
  caution: "text-verdict-caution",
  avoid: "text-verdict-avoid",
};

const trackColors: Record<VerdictLevel, string> = {
  excellent: "stroke-verdict-excellent",
  good: "stroke-verdict-good",
  caution: "stroke-verdict-caution",
  avoid: "stroke-verdict-avoid",
};

interface ScoreCircleProps {
  score: number;
  level: VerdictLevel;
  size?: number;
  className?: string;
}

export function ScoreCircle({ score, level, size = 120, className }: ScoreCircleProps) {
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-gray-100"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className={trackColors[level]}
        />
      </svg>
      <span
        className={cn(
          "absolute text-2xl font-bold",
          levelColors[level]
        )}
      >
        {score}
      </span>
    </div>
  );
}
