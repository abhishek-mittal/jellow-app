"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  WeeklyMiniChart,
  type WeeklyDataPoint,
} from "@/components/ui/weekly-mini-chart";
import { ChevronRight } from "lucide-react";

export interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  icon: ReactNode;
  accentColor?: string;
  weeklyData?: WeeklyDataPoint[];
  link?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  unit,
  subtitle,
  icon,
  accentColor = "var(--s-orange)",
  weeklyData,
  link = "Today",
  className,
}: MetricCardProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[20px] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
        className
      )}
    >
      {/* Subtle left-colored border accent */}
      <div 
        className="absolute bottom-0 left-0 top-0 w-1" 
        style={{ backgroundColor: accentColor }} 
      />

      {/* Header row: icon + title + link */}
      <div className="mb-4 flex items-center justify-between pl-1">
        <div className="flex items-center gap-3">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-[12px]"
            style={{ backgroundColor: `color-mix(in srgb, ${accentColor} 12%, transparent)` }}
          >
            <span style={{ color: accentColor }}>{icon}</span>
          </div>
          <span className="text-[17px] font-semibold text-gray-900">
            {title}
          </span>
        </div>
        {link && (
          <div className="flex items-center gap-0.5 text-[15px] font-semibold text-gray-400">
            {link} <ChevronRight size={18} />
          </div>
        )}
      </div>

      {/* Content: Value + Chart */}
      <div className="flex items-end justify-between pl-1">
        {/* Value + subtitle */}
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[32px] font-bold tracking-tight text-gray-900 leading-none">
              {value}
            </span>
            {unit && (
              <span className="text-[16px] font-semibold text-gray-500">{unit}</span>
            )}
          </div>
          {subtitle && (
            <p className="mt-1.5 text-[14px] font-medium text-gray-400">{subtitle}</p>
          )}
        </div>

        {/* Weekly chart */}
        {weeklyData && (
          <div className="h-[54px] w-[140px] shrink-0">
            <WeeklyMiniChart data={weeklyData} accentColor={accentColor} />
          </div>
        )}
      </div>
    </div>
  );
}
