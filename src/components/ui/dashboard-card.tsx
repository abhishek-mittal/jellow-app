import { cn } from "@/lib/utils";
import React from "react";

export interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DashboardCard({ children, className, ...props }: DashboardCardProps) {
  return (
    <div
      className={cn(
        "rounded-[28px] bg-white border border-[#E8E8E8] shadow-[0_2px_12px_rgba(0,0,0,0.02)] overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}