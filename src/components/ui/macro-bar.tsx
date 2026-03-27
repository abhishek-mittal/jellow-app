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
      <span className="text-[12px] font-medium text-[#7D7D7D]">{label}</span>
      <div className="w-full h-[5px] bg-[#E8E8E8] rounded-full overflow-hidden relative">
        <div 
          className="absolute left-0 top-0 bottom-0 rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        />
      </div>
      <span className="text-[13px] font-bold text-[#111]">
        {consumed}/<span className="text-[#7D7D7D]">{total}g</span>
      </span>
    </div>
  );
}