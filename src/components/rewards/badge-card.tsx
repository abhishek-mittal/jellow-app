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
        "relative flex flex-col items-center rounded-2xl p-3 text-center transition-all",
        earned
          ? "bg-white shadow-[0_0_14px_rgba(255,217,61,0.45)]"
          : "bg-gray-100",
        className
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl text-2xl",
          !earned && "grayscale opacity-50"
        )}
      >
        {icon}
      </div>

      {/* Lock indicator for locked badges */}
      {!earned && (
        <span className="absolute right-2 top-2 text-xs">🔒</span>
      )}

      {/* Badge name */}
      <p
        className={cn(
          "mt-2 text-xs font-semibold leading-tight",
          earned ? "text-gray-900" : "text-gray-400"
        )}
      >
        {name}
      </p>

      {/* Earned date */}
      {earned && earnedDate && (
        <p className="mt-0.5 text-xs text-gray-400">{earnedDate}</p>
      )}

      {/* Progress bar for locked badges */}
      {!earned && clampedProgress !== undefined && (
        <div className="mt-2 w-full">
          <p className="mb-1 text-xs text-gray-400">{clampedProgress}% to unlock</p>
          <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-candy-mint transition-all"
              style={{ width: `${clampedProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Unlock criteria */}
      {unlockCriteria && (
        <p className="mt-1 text-xs leading-tight text-gray-400">{unlockCriteria}</p>
      )}
    </div>
  );
}
