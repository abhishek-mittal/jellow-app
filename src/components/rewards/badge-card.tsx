"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardBody } from "@heroui/card";
import { Progress } from "@heroui/progress";

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
    <Card
      shadow="none"
      radius="lg"
      className={cn(
        "transition-all",
        earned
          ? "bg-white shadow-md"
          : "bg-gray-200/40 opacity-60",
        className
      )}
    >
      <CardBody className="flex flex-col items-center p-3 text-center">
        {/* Icon */}
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-[var(--r-lg)] text-2xl",
            earned ? "bg-s-orange/20" : "bg-gray-200/40 grayscale"
          )}
        >
          {icon}
        </div>

        {/* Badge name */}
        <p
          className={cn(
            "mt-2 text-xs font-semibold leading-tight",
            earned ? "text-s-dark-gray" : "text-s-dark-gray"
          )}
        >
          {name}
        </p>

        {/* Earned date */}
        {earned && earnedDate && (
          <p className="mt-0.5 text-xs text-s-dark-gray">{earnedDate}</p>
        )}

        {/* Progress bar for locked badges */}
        {!earned && clampedProgress !== undefined && (
          <div className="mt-2 w-full">
            <p className="mb-1 text-xs text-s-dark-gray">{clampedProgress}%</p>
            <Progress
              value={clampedProgress}
              size="sm"
              color="primary"
              aria-label={`${name} progress: ${clampedProgress}%`}
              classNames={{
                track: "bg-gray-200 h-0.5",
                indicator: "bg-s-orange",
              }}
            />
          </div>
        )}

        {/* Unlock criteria */}
        {unlockCriteria && (
          <p className="mt-1 text-xs leading-tight text-s-dark-gray">{unlockCriteria}</p>
        )}
      </CardBody>
    </Card>
  );
}
