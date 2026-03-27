import { cn } from "@/lib/utils";
import React from "react";

export interface InfoBlockProps {
  icon: React.ReactNode;
  value: string;
  label: string;
  className?: string;
}

export function InfoBlock({ icon, value, label, className }: InfoBlockProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <div className="flex items-center justify-center w-[42px] h-[42px] bg-[#F7F7F7] rounded-[14px] text-[#555] opacity-80 shrink-0">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[17px] font-bold text-[#111] leading-tight">{value}</span>
        <span className="text-[13px] font-medium text-[#7D7D7D]">{label}</span>
      </div>
    </div>
  );
}