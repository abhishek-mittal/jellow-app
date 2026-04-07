import Link from "next/link";
import { notFound } from "next/navigation";
import { ScoreCircle } from "@/components/ui/score-circle";
import { VerdictBadge } from "@/components/ui/verdict-badge";
import { verdictFixtures } from "@/lib/seed-data";
import { verdictLevelToVerdict } from "@/lib/verdict";
import { MotionPage, MotionItem, MotionPress } from "@/components/motion";
import { ArrowLeft, Heart, Share2, ArrowRight } from "lucide-react";

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
          <h1 className="flex-1 text-center font-[var(--font-heading)] text-lg font-bold text-s-dark-gray">
            Food Analysis
          </h1>
          <div className="w-10" />
        </div>
      </MotionItem>

      {/* ── Score + Product Info ── */}
      <MotionItem>
        <div className="mt-6 flex flex-col items-center px-5 text-center">
          <ScoreCircle score={verdict.score} level={verdict.level} size={120} />
          <h2 className="mt-4 font-[var(--font-heading)] text-2xl font-bold text-s-dark-gray">
            {verdict.name}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
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
              <h2 className="mb-3 font-[var(--font-heading)] text-lg font-bold text-s-dark-gray">
                Nutritional Highlights
              </h2>
              <div className="grid grid-cols-3 gap-3">
                {topNutrients.map((n) => (
                  <div
                    key={n.name}
                    className="rounded-[var(--r-xl)] bg-white p-4 text-center shadow-sm"
                  >
                    <span className="text-2xl">{nutrientIcons[n.name] ?? "📊"}</span>
                    <p className="mt-1 text-xs text-gray-500">{n.name}</p>
                    <p className="font-[var(--font-heading)] text-lg font-bold text-s-dark-gray">
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
            <h2 className="mb-3 font-[var(--font-heading)] text-lg font-bold text-s-dark-gray">
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
