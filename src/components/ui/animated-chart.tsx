"use client";

import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

// Expose standard design system tones for the charts.
export const chartColors = {
  teal: "var(--s-orange)",
  tealSoft: "rgba(255,107,0,0.2)",
  coral: "#EF4444",
  amber: "#F59E0B",
  navy: "var(--s-dark-gray)",
  good: "var(--v-good)",
  caution: "var(--v-caution)",
  avoid: "var(--v-avoid)",
};

interface BaseChartProps {
  data: any[];
  xKey?: string;
  className?: string; // used to size the ResponsiveContainer parent
  height?: number | `${number}%`;
  type?: "line" | "area" | "bar";
  series: {
    key: string;
    color?: string;
    name?: string;
  }[];
  showGrid?: boolean;
  showAxis?: boolean;
  animate?: boolean;
}

/**
 * A Jellow-branded wrapper over Recharts for consistent mobile-friendly graphing.
 */
export function AnimatedChart({
  data,
  xKey = "name",
  className = "w-full min-h-[200px]",
  height = "100%",
  type = "area",
  series,
  showGrid = false,
  showAxis = true,
  animate = true,
}: BaseChartProps) {
  const ChartComponent = useMemo(() => {
    switch (type) {
      case "line":
        return LineChart;
      case "bar":
        return BarChart;
      case "area":
      default:
        return AreaChart;
    }
  }, [type]);

  const renderSeries = () => {
    return series.map((s, idx) => {
      const color = s.color || chartColors.teal;
      
      switch (type) {
        case "line":
          return (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.name || s.key}
              stroke={color}
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 6, fill: color }}
              isAnimationActive={animate}
            />
          );
        case "bar":
          return (
            <Bar
              key={s.key}
              dataKey={s.key}
              name={s.name || s.key}
              fill={color}
              radius={[4, 4, 0, 0]}
              isAnimationActive={animate}
            />
          );
        case "area":
        default:
          return (
            <React.Fragment key={s.key}>
              <defs>
                <linearGradient id={`gradient-\${s.key}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey={s.key}
                name={s.name || s.key}
                stroke={color}
                strokeWidth={3}
                fillOpacity={1}
                fill={`url(#gradient-\${s.key})`}
                isAnimationActive={animate}
              />
            </React.Fragment>
          );
      }
    });
  };

  return (
    <div className={cn(className)}>
      <ResponsiveContainer width="100%" height={height}>
        <ChartComponent data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          {showGrid && (
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--glass-border)" />
          )}
          {showAxis && (
            <>
              <XAxis
                dataKey={xKey}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "var(--s-dark-gray)" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "var(--s-dark-gray)" }}
              />
            </>
          )}
          <Tooltip
            contentStyle={{
              borderRadius: "var(--r-md)",
              border: "none",
              boxShadow: "var(--shadow-md)",
              backgroundColor: "var(--glass-bg-strong)",
              backdropFilter: "blur(8px)",
              color: "var(--s-dark-gray)",
            }}
            itemStyle={{ color: "var(--s-dark-gray)", fontWeight: 600 }}
          />
          {renderSeries()}
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
}
