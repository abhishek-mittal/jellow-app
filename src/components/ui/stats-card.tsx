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
  up: { symbol: "↑", colorClass: "text-[var(--candy-mint)]" },
  down: { symbol: "↓", colorClass: "text-[var(--candy-pink)]" },
  flat: { symbol: "→", colorClass: "text-[var(--gray-500)]" },
};

export function StatsCard({ label, value, icon, trend, trendValue, className }: StatsCardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl bg-white p-3 shadow-[var(--shadow-soft)]",
        className
      )}
    >
      <div className="flex items-start gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--bg)]">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xl font-bold leading-tight text-[var(--gray-900)]">{value}</p>
          <p className="mt-0.5 text-xs text-[var(--gray-500)]">{label}</p>
        </div>
      </div>
      {trend && trendValue && (
        <div
          className={cn(
            "mt-2 flex items-center gap-0.5 text-xs font-semibold",
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
