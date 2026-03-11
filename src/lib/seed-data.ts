import type { ScanHistoryEntry, UserProfile, VerdictResult, FoodVerdictDetail } from "@/lib/types";

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

/** Detailed verdict fixtures for the verdict/[id] page. */
export const verdictFixtures: Record<string, FoodVerdictDetail> = {
  p1: {
    productId: "p1",
    name: "Greek Yogurt",
    brand: "Organic Valley",
    score: 92,
    level: "excellent",
    verdictExplanation:
      "This organic Greek yogurt is a powerhouse of protein and probiotics. Low in sugar and rich in calcium, it supports gut health and muscle recovery — a genuinely excellent choice for a daily snack.",
    nutrition: {
      calories: 130,
      protein: 15,
      carbs: 9,
      fat: 4,
      fiber: 0,
      sodium: 65,
      servingSize: "170g",
    },
    ingredientDetails: [
      { name: "Organic Milk", safety: "safe", description: "High-quality dairy protein source, rich in calcium." },
      { name: "Live Cultures", safety: "safe", description: "Probiotics that support gut microbiome health." },
      { name: "Organic Honey", safety: "safe", description: "Natural sweetener with trace antioxidants." },
      { name: "Vanilla Extract", safety: "safe", description: "Natural flavoring, no artificial additives." },
    ],
    alternatives: [
      { id: "p4", name: "Skyr", brand: "Siggi's", score: 95, level: "excellent" },
      { id: "p5", name: "Cottage Cheese", brand: "Good Culture", score: 88, level: "excellent" },
      { id: "p6", name: "Kefir", brand: "Lifeway", score: 90, level: "excellent" },
    ],
  },
  p2: {
    productId: "p2",
    name: "Energy Bar",
    brand: "Clif Bar",
    score: 58,
    level: "caution",
    verdictExplanation:
      "While Clif Bars provide useful energy for active athletes, they contain significant added sugars and processed ingredients. Fine as an occasional pre-workout snack but not ideal for everyday snacking.",
    nutrition: {
      calories: 240,
      protein: 9,
      carbs: 44,
      fat: 5,
      fiber: 4,
      sodium: 150,
      servingSize: "68g",
    },
    ingredientDetails: [
      { name: "Organic Oats", safety: "safe", description: "Whole grain, good source of fiber and slow-release carbs." },
      { name: "Brown Rice Syrup", safety: "caution", description: "High glycemic index sweetener; raises blood sugar quickly." },
      { name: "Cane Syrup", safety: "caution", description: "Added sugar that contributes to high overall sugar content." },
      { name: "Soy Protein", safety: "safe", description: "Plant-based protein isolate." },
      { name: "Palm Kernel Oil", safety: "caution", description: "High in saturated fat; environmental concerns with sourcing." },
    ],
    alternatives: [
      { id: "p7", name: "RX Bar", brand: "RXBAR", score: 76, level: "good" },
      { id: "p8", name: "Kind Bar", brand: "Kind", score: 72, level: "good" },
      { id: "p9", name: "Larabar", brand: "Larabar", score: 80, level: "excellent" },
    ],
  },
  p3: {
    productId: "p3",
    name: "Almond Milk",
    brand: "Califia",
    score: 85,
    level: "excellent",
    verdictExplanation:
      "Califia Almond Milk is a clean, dairy-free alternative with minimal additives. Fortified with calcium and vitamins, it's a great choice for those avoiding dairy.",
    nutrition: {
      calories: 35,
      protein: 1,
      carbs: 3,
      fat: 2,
      fiber: 0,
      sodium: 160,
      servingSize: "240ml",
    },
    ingredientDetails: [
      { name: "Almonds", safety: "safe", description: "Whole almonds provide healthy unsaturated fats." },
      { name: "Filtered Water", safety: "safe", description: "Base ingredient." },
      { name: "Calcium Carbonate", safety: "safe", description: "Added for bone health; mirrors dairy calcium levels." },
      { name: "Sunflower Lecithin", safety: "safe", description: "Natural emulsifier, generally well-tolerated." },
      { name: "Carrageenan", safety: "caution", description: "Thickening agent; some studies suggest potential gut irritation in high amounts." },
    ],
    alternatives: [
      { id: "p10", name: "Oat Milk", brand: "Oatly", score: 82, level: "excellent" },
      { id: "p11", name: "Coconut Milk", brand: "So Delicious", score: 78, level: "good" },
    ],
  },
};
