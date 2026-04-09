import { cn } from "@/lib/utils";
import React from "react";

export interface DashboardCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DashboardCard({ children, className, ...props }: DashboardCardProps) {
  return (
    <div
      className={cn(
        "rounded-[var(--r-xl)] bg-surface-card shadow-[var(--shadow-card)] overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}