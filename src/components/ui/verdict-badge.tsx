import { cn } from "@/lib/utils";

export type Verdict = "good" | "moderate" | "bad";

interface VerdictConfig {
  emoji: string;
  label: string;
  styles: string;
  largeStyles: string;
}

const verdictConfig: Record<Verdict, VerdictConfig> = {
  good: {
    emoji: "🟢",
    label: "Good for You",
    styles:
      "bg-[var(--verdict-excellent)]/15 text-[var(--verdict-excellent)] border-[var(--verdict-excellent)]/30",
    largeStyles: "bg-[var(--verdict-excellent)]/15 text-[var(--verdict-excellent)] border-[var(--verdict-excellent)]/30",
  },
  moderate: {
    emoji: "🟡",
    label: "Moderate",
    styles:
      "bg-[var(--verdict-caution)]/15 text-[var(--gray-900)] border-[var(--verdict-caution)]/30",
    largeStyles:
      "bg-[var(--verdict-caution)]/15 text-[var(--gray-900)] border-[var(--verdict-caution)]/30",
  },
  bad: {
    emoji: "🔴",
    label: "Bad for You",
    styles:
      "bg-[var(--verdict-avoid)]/15 text-[var(--verdict-avoid)] border-[var(--verdict-avoid)]/30",
    largeStyles:
      "bg-[var(--verdict-avoid)]/15 text-[var(--verdict-avoid)] border-[var(--verdict-avoid)]/30",
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
  const isLarge = size === "lg";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[var(--radius-full)] border font-semibold shadow-[var(--shadow-soft)]",
        isLarge
          ? "px-4 py-2 text-base"
          : "px-3 py-1 text-xs",
        isLarge ? config.largeStyles : config.styles,
        isLarge && "justify-center",
        className
      )}
    >
      <span aria-hidden="true">{config.emoji}</span>
      {showLabel && <span>{config.label}</span>}
      {score !== undefined && (
        <span className={cn("font-bold", isLarge ? "ml-1 text-lg" : "ml-0.5")}>
          {score}/10
        </span>
      )}
    </span>
  );
}
