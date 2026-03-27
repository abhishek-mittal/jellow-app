import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type TrendDirection = "up" | "down" | "flat";

export interface StatsCardProps {
  label: string;
  value: string | number;
  icon: ReactNode;
  trend?: TrendDirection;
  trendValue?: string;
  className?: string;
}

const trendConfig: Record<TrendDirection, { symbol: string; colorClass: string }> = {
  up: { symbol: "↑", colorClass: "text-v-good" },
  down: { symbol: "↓", colorClass: "text-v-avoid" },
  flat: { symbol: "→", colorClass: "text-s-dark-gray" },
};

export function StatsCard({ label, value, icon, trend, trendValue, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--r-xl)] bg-white p-3 shadow-md",
        className
      )}
    >
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-[var(--r-lg)] bg-s-orange/20 text-s-orange">
        {icon}
      </div>
      <p className="font-[var(--font-heading)] text-xl font-bold leading-tight text-s-dark-gray">
        {value}
      </p>
      <p className="mt-0.5 text-xs text-s-dark-gray">{label}</p>
      {trend && trendValue && (
        <div
          className={cn(
            "mt-1 flex items-center gap-0.5 text-xs font-semibold",
            trendConfig[trend].colorClass
          )}
        >
          <span aria-hidden="true">{trendConfig[trend].symbol}</span>
          <span>{trendValue}</span>
        </div>
      )}
    </div>
  );
}
