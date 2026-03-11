/** Jellow domain types */

export type VerdictLevel = "excellent" | "good" | "caution" | "avoid";

export type ScanMode = "food" | "medicine";

export interface Product {
  id: string;
  name: string;
  brand: string;
  barcode: string;
  category: string;
  imageUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface NutrientInfo {
  name: string;
  value: number;
  unit: string;
  dailyValuePercent?: number;
}

export interface Ingredient {
  name: string;
  isFlagged: boolean;
  reason?: string;
}

export type IngredientSafety = "safe" | "caution" | "harmful";

export interface IngredientDetail {
  name: string;
  safety: IngredientSafety;
  description?: string;
}

export interface NutritionFacts {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
  servingSize: string;
}

export interface FoodVerdictDetail {
  productId: string;
  name: string;
  brand: string;
  score: number;
  level: VerdictLevel;
  verdictExplanation: string;
  nutrition: NutritionFacts;
  ingredientDetails: IngredientDetail[];
  alternatives: ProductSummary[];
}

export interface VerdictResult {
  productId: string;
  score: number;
  level: VerdictLevel;
  label: string;
  nutrients: NutrientInfo[];
  ingredients: Ingredient[];
  alternatives: ProductSummary[];
}

export interface ProductSummary {
  id: string;
  name: string;
  brand: string;
  score: number;
  level: VerdictLevel;
}

export interface ScanHistoryEntry {
  id: string;
  product: ProductSummary;
  scannedAt: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  iconEmoji: string;
  progress: number;
  goal: number;
  reward: number;
  expiresAt: string;
}

export interface Badge {
  id: string;
  title: string;
  iconEmoji: string;
  earnedAt?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  avatarUrl?: string;
  jellyPoints: number;
  totalScans: number;
  streakDays: number;
  badges: Badge[];
  activeChallenges: Challenge[];
}
