import type { ScanHistoryEntry, UserProfile, VerdictResult, Challenge, Badge } from "@/lib/types";

/** Seed user profile for development. */
export const seedUser: UserProfile = {
  id: "user-1",
  name: "Sarah",
  jellyPoints: 2450,
  totalScans: 47,
  streakDays: 5,
  badges: [
    { id: "b1", title: "First Scan", iconEmoji: "🌟" },
    { id: "b2", title: "Veggie Lover", iconEmoji: "🥗" },
    { id: "b3", title: "Protein Pro", iconEmoji: "👍" },
    { id: "b4", title: "7-Day Streak", iconEmoji: "🎯" },
  ],
  activeChallenges: [
    {
      id: "c1",
      title: "Veggie Week",
      description: "5 healthy scans",
      iconEmoji: "🌿",
      progress: 3,
      goal: 5,
      reward: 100,
      expiresAt: "2026-03-18T00:00:00Z",
    },
    {
      id: "c2",
      title: "Streak Master",
      description: "7 days in a row",
      iconEmoji: "🔥",
      progress: 5,
      goal: 7,
      reward: 200,
      expiresAt: "2026-03-20T00:00:00Z",
    },
  ],
};

/** Seed scan history for development. */
export const seedHistory: ScanHistoryEntry[] = [
  {
    id: "s1",
    product: { id: "p1", name: "Greek Yogurt", brand: "Organic Valley", score: 92, level: "excellent" },
    scannedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "s2",
    product: { id: "p2", name: "Energy Bar", brand: "Clif Bar", score: 58, level: "caution" },
    scannedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "s3",
    product: { id: "p3", name: "Almond Milk", brand: "Califia", score: 85, level: "excellent" },
    scannedAt: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
];

/** Seed verdict for Greek Yogurt. */
export const seedVerdict: VerdictResult = {
  productId: "p1",
  score: 92,
  level: "excellent",
  label: "Excellent Choice!",
  nutrients: [
    { name: "Protein", value: 15, unit: "g" },
    { name: "Calcium", value: 20, unit: "% DV" },
    { name: "Sugar", value: 4, unit: "g" },
  ],
  ingredients: [
    { name: "Milk", isFlagged: false },
    { name: "Probiotics", isFlagged: false },
    { name: "Honey", isFlagged: false },
    { name: "Vanilla", isFlagged: false },
  ],
  alternatives: [
    { id: "p4", name: "Skyr", brand: "Siggi's", score: 95, level: "excellent" },
    { id: "p5", name: "Cottage Cheese", brand: "Good Culture", score: 88, level: "excellent" },
    { id: "p6", name: "Kefir", brand: "Lifeway", score: 90, level: "excellent" },
  ],
};
