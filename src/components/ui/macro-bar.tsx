import React from "react";
import { cn } from "@/lib/utils";

interface MacroBarProps {
  label: string;
  consumed: number;
  total: number;
  color: string;
  className?: string;
}

export function MacroBar({ label, consumed, total, color, className }: MacroBarProps) {
  const percentage = Math.min(100, Math.max(0, (consumed / total) * 100));

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <span className="text-[12px] font-medium text-nav-inactive">{label}</span>
      <div className="w-full h-[5px] bg-surface-divider rounded-full overflow-hidden relative">
        <div 
          className="absolute left-0 top-0 bottom-0 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-[13px] font-bold text-s-black">
        {consumed}/<span className="text-nav-inactive">{total}g</span>
      </span>
    </div>
  );
}