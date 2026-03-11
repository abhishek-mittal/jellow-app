"use client";

import { cn } from "@/lib/utils";
import { Chip } from "@heroui/chip";
import {
  VerdictGoodIcon,
  VerdictCautionIcon,
  VerdictAvoidIcon,
} from "@/components/icons/verdict-icons";

export type Verdict = "good" | "moderate" | "bad";

interface VerdictConfig {
  icon: typeof VerdictGoodIcon;
  label: string;
  color: "success" | "warning" | "danger";
}

const verdictConfig: Record<Verdict, VerdictConfig> = {
  good: {
    icon: VerdictGoodIcon,
    label: "Good for You",
    color: "success",
  },
  moderate: {
    icon: VerdictCautionIcon,
    label: "Moderate",
    color: "warning",
  },
  bad: {
    icon: VerdictAvoidIcon,
    label: "Bad for You",
    color: "danger",
  },
};

export interface VerdictBadgeProps {
  verdict: Verdict;
  score?: number;
  size?: "sm" | "lg";
  showLabel?: boolean;
  className?: string;
}

export function VerdictBadge({
  verdict,
  score,
  size = "sm",
  showLabel = true,
  className,
}: VerdictBadgeProps) {
  const config = verdictConfig[verdict];
  const Icon = config.icon;
  const isLarge = size === "lg";

  return (
    <Chip
      color={config.color}
      variant="flat"
      size={isLarge ? "lg" : "sm"}
      startContent={<Icon size={isLarge ? 18 : 14} />}
      endContent={
        score !== undefined ? (
          <span className={cn("font-bold", isLarge ? "ml-1 text-lg" : "ml-0.5 text-xs")}>
            {score}/10
          </span>
        ) : undefined
      }
      classNames={{
        base: cn("uppercase tracking-wide animate-scale-in", isLarge && "justify-center", className),
        content: "font-medium",
      }}
    >
      {showLabel ? config.label : null}
    </Chip>
  );
}
