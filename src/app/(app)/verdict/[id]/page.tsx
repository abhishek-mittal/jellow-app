import Link from "next/link";
import { notFound } from "next/navigation";
import { ScoreCircle } from "@/components/ui/score-circle";
import { VerdictBadge } from "@/components/ui/verdict-badge";
import type { FoodVerdictDetail } from "@/lib/types";
import { verdictLevelToVerdict } from "@/lib/verdict";
import { MotionPage, MotionItem, MotionPress } from "@/components/motion";
import { ArrowLeft, Heart, Share2, ArrowRight } from "lucide-react";

/** Demo verdict fixtures — replace with real API data when available. */
const verdictFixtures: Record<string, FoodVerdictDetail> = {
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

/** Emoji icons for common nutrients. */
const nutrientIcons: Record<string, string> = {
  Protein: "💪",
  Calcium: "🦴",
  Sugar: "🍬",
  Fiber: "🌾",
  Fat: "🥑",
  Sodium: "🧂",
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VerdictDetailPage({ params }: PageProps) {
  const { id } = await params;
  const verdict = verdictFixtures[id];

  if (!verdict) {
    notFound();
  }

  const topNutrients = verdict.nutrition
    ? [
        { name: "Protein", value: `${verdict.nutrition.protein}g` },
        { name: "Calcium", value: "20% DV" },
        { name: "Sugar", value: `${verdict.nutrition.fat}g` },
      ]
    : [];

  return (
    <MotionPage className="min-h-screen bg-gradient-to-b from-[#E8F5F0] via-[#F0FAF7] to-[#F8F9FA]">
      {/* ── Header bar ── */}
      <MotionItem>
        <div className="flex items-center px-5 pt-12">
          <Link
            href="/home"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm"
          >
            <ArrowLeft size={18} className="text-s-dark-gray" />
          </Link>
          <h1 className="flex-1 text-center font-heading text-lg font-bold text-s-dark-gray">
            Food Analysis
          </h1>
          <div className="w-10" />
        </div>
      </MotionItem>

      {/* ── Score + Product Info ── */}
      <MotionItem>
        <div className="mt-6 flex flex-col items-center px-5 text-center">
          <ScoreCircle score={verdict.score} level={verdict.level} size={120} />
          <h2 className="mt-4 font-heading text-2xl font-bold text-s-dark-gray">
            {verdict.name}
          </h2>
          <p className="mt-1 text-sm text-nav-inactive">
            {verdict.brand} · {verdict.nutrition?.servingSize ?? "150g"}
          </p>
          <div className="mt-3">
            <VerdictBadge
              verdict={verdictLevelToVerdict(verdict.level)}
              className="px-4 py-1.5 text-sm"
            />
          </div>
        </div>
      </MotionItem>

      <div className="space-y-6 px-5 pt-8">
        {/* ── Nutritional Highlights ── */}
        {topNutrients.length > 0 && (
          <MotionItem>
            <section>
              <h2 className="mb-3 font-heading text-lg font-bold text-s-dark-gray">
                Nutritional Highlights
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {topNutrients.map((n) => (
                  <div
                    key={n.name}
                    className="rounded-[var(--r-xl)] bg-surface-card p-4 text-center shadow-sm"
                  >
                    <span className="text-2xl">{nutrientIcons[n.name] ?? "📊"}</span>
                    <p className="mt-1 text-xs text-nav-inactive">{n.name}</p>
                    <p className="font-heading text-lg font-bold text-s-dark-gray">
                      {n.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </MotionItem>
        )}

        {/* ── Key Ingredients ── */}
        <MotionItem>
          <section>
            <h2 className="mb-3 font-heading text-lg font-bold text-s-dark-gray">
              Key Ingredients
            </h2>
            <div className="flex flex-wrap gap-2">
              {verdict.ingredientDetails.map((ing) => (
                <span
                  key={ing.name}
                  className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-sm font-medium text-emerald-700"
                >
                  <span className="text-emerald-500">✓</span>
                  {ing.name}
                </span>
              ))}
            </div>
          </section>
        </MotionItem>

        {/* ── Alternatives CTA ── */}
        {verdict.alternatives.length > 0 && (
          <MotionItem>
            <Link href="/home" className="block">
              <div className="flex items-center gap-4 rounded-[var(--r-xl)] bg-[#E0F2F1] p-5 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#80CBC4] text-xl">
                  🔍
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-s-dark-gray">See healthier alternatives</p>
                  <p className="text-sm text-gray-500">
                    {verdict.alternatives.length} similar products with better scores
                  </p>
                </div>
                <ArrowRight size={18} className="text-s-dark-gray" />
              </div>
            </Link>
          </MotionItem>
        )}

        {/* ── Action Buttons ── */}
        <MotionItem>
          <div className="grid grid-cols-2 gap-3 pb-6">
            <MotionPress>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-200 bg-white py-3.5 font-semibold text-s-dark-gray shadow-sm"
              >
                <Heart size={16} className="text-red-500" /> Save
              </button>
            </MotionPress>
            <MotionPress>
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF9A44] to-[#FC6076] py-3.5 font-semibold text-white shadow-sm"
              >
                <Share2 size={16} /> Share
              </button>
            </MotionPress>
          </div>
        </MotionItem>
      </div>
    </MotionPage>
  );
}
