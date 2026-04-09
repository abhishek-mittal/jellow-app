import type { VerdictLevel } from "@/lib/types";

export const VERDICT_THRESHOLDS: Record<VerdictLevel, { min: number; max: number }> = {
  excellent: { min: 80, max: 100 },
  good: { min: 60, max: 79 },
  caution: { min: 40, max: 59 },
  avoid: { min: 0, max: 39 },
};

export const VERDICT_COLORS: Record<VerdictLevel, string> = {
  excellent: "var(--v-excellent)",
  good: "var(--v-good)",
  caution: "var(--v-caution)",
  avoid: "var(--v-avoid)",
};

export const VERDICT_LABELS: Record<VerdictLevel, string> = {
  excellent: "Excellent Choice!",
  good: "Good Pick",
  caution: "Caution",
  avoid: "Avoid",
};

export const APP_NAME = "Jellow";
export const APP_TAGLINE = "Your playful health companion";
