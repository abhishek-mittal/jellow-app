import { cn } from "@/lib/utils";
import type { VerdictLevel } from "@/lib/types";
import { VERDICT_LABELS } from "@/config/constants";

const levelStyles: Record<VerdictLevel, string> = {
  excellent: "bg-verdict-excellent/15 text-verdict-excellent border-verdict-excellent/30",
  good: "bg-verdict-good/15 text-verdict-good border-verdict-good/30",
  caution: "bg-verdict-caution/15 text-verdict-caution-dark border-verdict-caution/30",
  avoid: "bg-verdict-avoid/15 text-verdict-avoid border-verdict-avoid/30",
};

interface VerdictBadgeProps {
  level: VerdictLevel;
  label?: string;
  className?: string;
}

export function VerdictBadge({ level, label, className }: VerdictBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        levelStyles[level],
        className
      )}
    >
      {label ?? VERDICT_LABELS[level]}
    </span>
  );
}
