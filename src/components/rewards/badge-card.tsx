import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface BadgeCardProps {
  name: string;
  icon: ReactNode | string;
  earned: boolean;
  earnedDate?: string;
  unlockCriteria?: string;
  progress?: number; // 0–100
  className?: string;
}

export function BadgeCard({
  name,
  icon,
  earned,
  earnedDate,
  unlockCriteria,
  progress,
  className,
}: BadgeCardProps) {
  const clampedProgress =
    progress !== undefined ? Math.min(100, Math.max(0, progress)) : undefined;

  return (
    <div
      className={cn(
        "relative flex flex-col items-center rounded-[var(--r-lg)] p-3 text-center transition-all animate-scale-in",
        earned
          ? "bg-j-warm-white border border-j-stone"
          : "bg-j-stone/40 opacity-60",
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-[var(--r-sm)] text-2xl",
          !earned && "grayscale"
        )}
      >
        {icon}
      </div>

      {/* Badge name */}
      <p
        className={cn(
          "mt-2 text-xs font-semibold leading-tight",
          earned ? "text-j-navy" : "text-j-navy-soft"
        )}
      >
        {name}
      </p>

      {/* Earned date */}
      {earned && earnedDate && (
        <p className="mt-0.5 text-xs text-j-navy-soft">{earnedDate}</p>
      )}

      {/* Progress bar for locked badges */}
      {!earned && clampedProgress !== undefined && (
        <div className="mt-2 w-full">
          <p className="mb-1 text-xs text-j-navy-soft">{clampedProgress}%</p>
          <div className="h-0.5 w-full overflow-hidden rounded-full bg-j-stone">
            <div
              className="h-full rounded-full bg-j-teal transition-all"
              style={{ width: `${clampedProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Unlock criteria */}
      {unlockCriteria && (
        <p className="mt-1 text-xs leading-tight text-j-navy-soft">{unlockCriteria}</p>
      )}
    </div>
  );
}
