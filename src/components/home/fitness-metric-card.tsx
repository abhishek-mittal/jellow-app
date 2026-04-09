import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export interface MetricChartData {
  day: string;
  value: number;
  highlighted?: boolean;
}

interface FitnessMetricCardProps {
  icon: ReactNode;
  title: string;
  value: string | number;
  unit?: string;
  subtitle: string;
  chartType: "bar" | "line";
  chartData: MetricChartData[];
  chartColor?: string; // hex or tailwind class for the filled bar
}

export function FitnessMetricCard({
  icon,
  title,
  value,
  unit,
  subtitle,
  chartType,
  chartData,
  chartColor,
}: FitnessMetricCardProps) {
  // Simple max finding for scaling charts relative to max value
  const maxVal = Math.max(...chartData.map((d) => d.value));

  return (
    <div className="flex flex-col rounded-[var(--r-lg)] bg-surface-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5 text-[15px] font-bold text-s-dark-gray">
          {icon}
          {title}
        </div>
        <div className="flex items-center gap-0.5 text-[13px] font-medium text-gray-400">
          Today <ChevronRight size={16} className="text-gray-400" />
        </div>
      </div>

      <div className="flex flex-row items-end justify-between">
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-[26px] font-bold tracking-tight text-s-dark-gray leading-none">
              {value}
            </span>
            {unit && <span className="text-[15px] font-semibold text-s-dark-gray mb-0.5">{unit}</span>}
          </div>
          <p className="mt-2 text-[13px] font-medium text-gray-500">{subtitle}</p>
        </div>

        {/* Chart Area */}
        <div className="flex items-end gap-2 h-14">
          {chartType === "bar" &&
            chartData.map((d, i) => {
              const heightPct = Math.max(15, (d.value / maxVal) * 100);
              return (
                <div key={i} className="flex flex-col items-center gap-[6px]">
                  <div className="w-1.5 h-[36px] flex items-end rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`w-full rounded-full transition-all`}
                      style={{
                        height: `${heightPct}%`,
                        backgroundColor: chartColor || "#E87A3E",
                        opacity: d.highlighted ? 1 : d.value === 0 ? 0 : 0.8,
                      }}
                    />
                  </div>
                  <span className="text-[10px] font-semibold text-gray-400">{d.day}</span>
                </div>
              );
            })}

          {chartType === "line" && (
            <div className="w-full h-full flex flex-col justify-end">
              <svg viewBox="0 0 100 40" className="w-[90px] h-9 overflow-visible">
                <defs>
                  <linearGradient id="line-gradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={chartColor || "#E95A6E"} stopOpacity="0.25" />
                    <stop offset="100%" stopColor={chartColor || "#E95A6E"} stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  d="M0,8 L15,18 L30,5 L45,15 L60,12 L75,25 L90,15 L100,30 L100,40 L0,40 Z"
                  fill="url(#line-gradient)"
                  stroke="none"
                />
                <path
                  d="M0,8 L15,18 L30,5 L45,15 L60,12 L75,25 L90,15 L100,30"
                  fill="none"
                  stroke={chartColor || "#E95A6E"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <div className="flex items-center justify-between mt-1.5 w-full gap-2 px-1">
                {chartData.map((d, i) => (
                  <span key={i} className="text-[10px] font-semibold text-gray-400">
                    {d.day}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
