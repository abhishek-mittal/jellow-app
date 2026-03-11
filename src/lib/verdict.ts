import type { VerdictLevel } from "@/lib/types";
import type { Verdict } from "@/components/ui/verdict-badge";
import { VERDICT_THRESHOLDS } from "@/config/constants";

/** Map a 0–100 score to a verdict level. */
export function scoreToVerdict(score: number): VerdictLevel {
  if (score >= VERDICT_THRESHOLDS.excellent.min) return "excellent";
  if (score >= VERDICT_THRESHOLDS.good.min) return "good";
  if (score >= VERDICT_THRESHOLDS.caution.min) return "caution";
  return "avoid";
}

/** Map a VerdictLevel to the simplified Verdict type used by UI components. */
export function verdictLevelToVerdict(level: VerdictLevel): Verdict {
  if (level === "excellent" || level === "good") return "good";
  if (level === "caution") return "moderate";
  return "bad";
}

/** Format a relative timestamp (e.g. "2h ago", "Yesterday"). */
export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffHours < 48) return "Yesterday";
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}
