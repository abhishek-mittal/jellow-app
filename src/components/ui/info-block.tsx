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
      <div className="flex items-center justify-center w-[42px] h-[42px] bg-s-gray rounded-[var(--r-md)] text-s-dark-gray opacity-80 shrink-0">
        {icon}
      </div>
      <div className="flex flex-col">
        <span className="text-[17px] font-bold text-s-black leading-tight">{value}</span>
        <span className="text-[13px] font-medium text-nav-inactive">{label}</span>
      </div>
    </div>
  );
}