"use client";

import { cn } from "@/lib/utils";

export interface WeeklyDataPoint {
  day: string;
  value: number;
  highlighted?: boolean;
}

export interface WeeklyMiniChartProps {
  data: WeeklyDataPoint[];
  accentColor?: string;
  className?: string;
}

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];

/**
 * Compact 7-day bar chart for metric cards.
 * Each bar scales relative to the max value in the dataset.
 */
export function WeeklyMiniChart({
  data,
  accentColor = "var(--s-orange)",
  className,
}: WeeklyMiniChartProps) {
  const maxVal = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className={cn("flex h-full w-full items-end justify-between gap-1", className)}>
      {data.map((point, i) => {
        const heightPct = Math.max((point.value / maxVal) * 100, 15);
        const isHighlighted = point.highlighted ?? false;

        return (
          <div key={i} className="flex h-full flex-col items-center justify-end gap-1.5 flex-1">
            <div className="flex h-full w-full items-end justify-center">
              <div
                className="w-full max-w-[6px] rounded-full transition-all duration-300"
                style={{
                  height: `${heightPct}%`,
                  backgroundColor: isHighlighted ? accentColor : "#E5E7EB",
                }}
              />
            </div>
            <span className="text-[10px] font-medium text-gray-400">{DAYS[i]}</span>
          </div>
        );
      })}
    </div>
  );
}
