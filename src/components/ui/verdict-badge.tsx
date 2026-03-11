import { cn } from "@/lib/utils";
import {
  VerdictGoodIcon,
  VerdictCautionIcon,
  VerdictAvoidIcon,
} from "@/components/icons/verdict-icons";

export type Verdict = "good" | "moderate" | "bad";

interface VerdictConfig {
  icon: typeof VerdictGoodIcon;
  label: string;
  bg: string;
  text: string;
  border: string;
}

const verdictConfig: Record<Verdict, VerdictConfig> = {
  good: {
    icon: VerdictGoodIcon,
    label: "Good for You",
    bg: "bg-v-good-bg",
    text: "text-v-good",
    border: "border-v-good/30",
  },
  moderate: {
    icon: VerdictCautionIcon,
    label: "Moderate",
    bg: "bg-v-caution-bg",
    text: "text-j-navy",
    border: "border-v-caution/30",
  },
  bad: {
    icon: VerdictAvoidIcon,
    label: "Bad for You",
    bg: "bg-v-avoid-bg",
    text: "text-v-avoid",
    border: "border-v-avoid/30",
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
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[var(--r-sm)] border font-medium tracking-wide uppercase animate-scale-in",
        isLarge ? "px-4 py-2 text-sm" : "px-3 py-1 text-xs",
        config.bg,
        config.text,
        config.border,
        isLarge && "justify-center",
        className
      )}
    >
      <Icon size={isLarge ? 18 : 14} />
      {showLabel && <span>{config.label}</span>}
      {score !== undefined && (
        <span className={cn("font-bold", isLarge ? "ml-1 text-lg" : "ml-0.5")}>
          {score}/10
        </span>
      )}
    </span>
  );
}
