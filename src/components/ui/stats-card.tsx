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
  flat: { symbol: "→", colorClass: "text-j-navy-soft" },
};

export function StatsCard({ label, value, icon, trend, trendValue, className }: StatsCardProps) {
  return (
    <div className={cn("flex items-start gap-3", className)}>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--r-sm)] bg-j-teal-soft text-j-teal">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-[var(--font-heading)] text-xl font-bold leading-tight text-j-navy">{value}</p>
        <p className="mt-0.5 text-xs text-j-navy-soft">{label}</p>
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
    </div>
  );
}
