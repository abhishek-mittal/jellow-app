import { db } from "@/lib/db";
import { VERDICT_THRESHOLDS } from "@/config/constants";
import type { VerdictLevel } from "@/lib/types";

/** Map a 0-100 score to a verdict level. */
function scoreToLevel(score: number): VerdictLevel {
  if (score >= VERDICT_THRESHOLDS.excellent.min) return "excellent";
  if (score >= VERDICT_THRESHOLDS.good.min) return "good";
  if (score >= VERDICT_THRESHOLDS.caution.min) return "caution";
  return "avoid";
}

/** Compute a health score from nutrition data and ingredients. */
function computeScore(
  nutrition: { calories: number; protein: number; fiber: number; sodium: number; fat: number },
  ingredients: Array<{ safety: string }>
): number {
  let score = 70; // base

  // Protein bonus
  if (nutrition.protein >= 15) score += 10;
  else if (nutrition.protein >= 8) score += 5;

  // Fiber bonus
  if (nutrition.fiber >= 5) score += 5;

  // Low calorie bonus
  if (nutrition.calories <= 150) score += 5;

  // Sodium penalty
  if (nutrition.sodium > 600) score -= 15;
  else if (nutrition.sodium > 400) score -= 10;

  // Fat penalty
  if (nutrition.fat > 20) score -= 10;

  // Ingredient safety
  const cautionCount = ingredients.filter((i) => i.safety === "caution").length;
  const harmfulCount = ingredients.filter((i) => i.safety === "harmful").length;
  score -= cautionCount * 3;
  score -= harmfulCount * 8;

  return Math.max(0, Math.min(100, score));
}

/** Compute and store a verdict for a product. */
export async function computeVerdict(productId: string) {
  const product = await db.product.findUnique({
    where: { id: productId },
    include: { nutrition: true, ingredients: true },
  });

  if (!product || !product.nutrition) return null;

  const score = computeScore(product.nutrition, product.ingredients);
  const level = scoreToLevel(score);
  const label =
    level === "excellent"
      ? "Excellent Choice!"
      : level === "good"
        ? "Good Pick"
        : level === "caution"
          ? "Caution"
          : "Avoid";

  const verdict = await db.verdict.upsert({
    where: { productId },
    create: {
      productId,
      score,
      level,
      label,
      verdictExplanation: `This product scored ${score}/100 based on its nutritional profile and ingredient safety.`,
      nutrients: {
        create: [
          { name: "Protein", value: product.nutrition.protein, unit: "g" },
          { name: "Calories", value: product.nutrition.calories, unit: "kcal" },
          { name: "Fat", value: product.nutrition.fat, unit: "g" },
          { name: "Fiber", value: product.nutrition.fiber, unit: "g" },
          { name: "Sodium", value: product.nutrition.sodium, unit: "mg" },
        ],
      },
    },
    update: { score, level, label },
    include: { nutrients: true },
  });

  return verdict;
}

/** Fetch stored verdict for a product — compute if none exists. */
export async function getOrComputeVerdict(productId: string) {
  const existing = await db.verdict.findUnique({
    where: { productId },
    include: {
      nutrients: true,
      product: { include: { ingredients: true, nutrition: true } },
    },
  });

  if (existing) {
    return {
      productId: existing.productId,
      name: existing.product.name,
      brand: existing.product.brand,
      score: existing.score,
      level: existing.level,
      label: existing.label,
      verdictExplanation: existing.verdictExplanation ?? "",
      nutrition: existing.product.nutrition
        ? {
            calories: existing.product.nutrition.calories,
            protein: existing.product.nutrition.protein,
            carbs: existing.product.nutrition.carbs,
            fat: existing.product.nutrition.fat,
            fiber: existing.product.nutrition.fiber,
            sodium: existing.product.nutrition.sodium,
            servingSize: existing.product.nutrition.servingSize,
          }
        : null,
      ingredientDetails: existing.product.ingredients.map((i: (typeof existing.product.ingredients)[number]) => ({
        name: i.name,
        safety: i.safety,
        description: i.description,
      })),
      nutrients: existing.nutrients.map((n: (typeof existing.nutrients)[number]) => ({
        name: n.name,
        value: n.value,
        unit: n.unit,
        dailyValuePercent: n.dailyValuePercent,
      })),
      alternatives: [],
    };
  }

  return computeVerdict(productId);
}
