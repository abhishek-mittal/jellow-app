import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MacroTargetProps {
  icon: ReactNode;
  value: string;
  label: string;
  progress: number; // 0 to 100
  colorClass: string; // Tailwind class for the color, e.g., 'bg-orange-500'
  trackClass?: string;
  className?: string;
}

export function MacroTarget({
  icon,
  value,
  label,
  progress,
  colorClass,
  trackClass = "bg-gray-100",
  className,
}: MacroTargetProps) {
  // Ensure progress is bound between 0 and 100
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="mb-4 text-2xl">
        {icon}
      </div>
      <span className="text-[17px] font-bold text-gray-900 leading-none mb-1.5">{value}</span>
      <span className="text-[13px] text-gray-500 font-medium mb-3">{label}</span>
      
      {/* Progress Line */}
      <div className={cn("h-[3px] w-12 rounded-full overflow-hidden", trackClass)}>
        <div 
          className={cn("h-full rounded-full", colorClass)}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
    </div>
  );
}
