import Link from "next/link";
import { notFound } from "next/navigation";
import { ScoreCircle } from "@/components/ui/score-circle";
import { VerdictBadge } from "@/components/ui/verdict-badge";
import { FoodCard } from "@/components/ui/food-card";
import { Button } from "@/components/ui/button";
import { NutritionPanel } from "@/components/verdict/nutrition-panel";
import { IngredientTag } from "@/components/verdict/ingredient-tag";
import { verdictFixtures } from "@/lib/seed-data";
import { verdictLevelToVerdict } from "@/lib/verdict";
import { MotionPage, MotionItem, MotionPress } from "@/components/motion";
import { ArrowLeft, Heart, Share2, ScanBarcode } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VerdictDetailPage({ params }: PageProps) {
  const { id } = await params;
  const verdict = verdictFixtures[id];

  if (!verdict) {
    notFound();
  }

  return (
    <MotionPage className="min-h-screen pb-6">
      {/* ── Gradient Header with Score ── */}
      <MotionItem>
        <div className="gradient-hero relative overflow-hidden rounded-b-[var(--r-2xl)] px-5 pb-8 pt-12">
          {/* Decorative circles */}
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -left-6 bottom-2 h-20 w-20 rounded-full bg-white/5" />

          {/* Back button */}
          <Link
            href="/home"
            className="relative mb-6 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur-sm"
          >
            <ArrowLeft size={16} /> Back
          </Link>

          {/* Product info centered */}
          <div className="relative flex flex-col items-center text-center">
            <div className="mb-3">
              <ScoreCircle score={verdict.score} level={verdict.level} size={100} />
            </div>
            <h1 className="font-[var(--font-heading)] text-2xl font-bold text-white">{verdict.name}</h1>
            <p className="mt-0.5 text-sm text-white/70">{verdict.brand}</p>
            <div className="mt-3">
              <VerdictBadge verdict={verdictLevelToVerdict(verdict.level)} className="px-4 py-1.5 text-sm" />
            </div>
          </div>
        </div>
      </MotionItem>

      <div className="space-y-5 px-5 pt-5">
        {/* Verdict explanation */}
        <MotionItem>
          <section className="rounded-[var(--r-xl)] bg-white p-5 shadow-md">
            <h2 className="mb-2 font-[var(--font-heading)] text-base font-bold text-s-dark-gray">
              Why this verdict?
            </h2>
            <p className="text-sm leading-relaxed text-s-dark-gray">
              {verdict.verdictExplanation}
            </p>
          </section>
        </MotionItem>

        {/* Nutrition panel */}
        <MotionItem>
          <section>
            <h2 className="mb-3 font-[var(--font-heading)] text-lg font-bold text-s-dark-gray">Nutrition</h2>
            <NutritionPanel {...verdict.nutrition} />
          </section>
        </MotionItem>

        {/* Ingredients */}
        <MotionItem>
          <section>
            <h2 className="mb-3 font-[var(--font-heading)] text-lg font-bold text-s-dark-gray">Ingredients</h2>
            <div className="flex flex-wrap gap-2">
              {verdict.ingredientDetails.map((ing) => (
                <IngredientTag
                  key={ing.name}
                  name={ing.name}
                  safety={ing.safety}
                  description={ing.description}
                />
              ))}
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-s-dark-gray">
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-v-good" />
                Safe
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-v-caution" />
                Caution
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-v-avoid" />
                Harmful
              </span>
            </div>
          </section>
        </MotionItem>

        {/* Healthier alternatives */}
        {verdict.alternatives.length > 0 && (
          <MotionItem>
            <section>
              <h2 className="mb-3 font-[var(--font-heading)] text-lg font-bold text-s-dark-gray">
                Healthier Options
              </h2>
              <div className="space-y-3">
                {verdict.alternatives.map((alt) => (
                  <MotionPress key={alt.id}>
                    <FoodCard
                      food={{
                        id: alt.id,
                        name: alt.name,
                        brand: alt.brand,
                        verdict: verdictLevelToVerdict(alt.level),
                      }}
                    />
                  </MotionPress>
                ))}
              </div>
            </section>
          </MotionItem>
        )}

        {/* Action buttons */}
        <MotionItem>
          <section className="space-y-3 pb-4">
            <MotionPress>
              <Button variant="primary" size="lg" className="w-full">
                <Heart size={18} className="mr-2" /> Save to Favourites
              </Button>
            </MotionPress>
            <div className="grid grid-cols-2 gap-3">
              <MotionPress>
                <Button variant="secondary" size="md" className="w-full">
                  <Share2 size={16} className="mr-2" /> Share
                </Button>
              </MotionPress>
              <Link href="/scan" className="block w-full">
                <MotionPress>
                  <Button variant="primary" size="md" className="w-full">
                    <ScanBarcode size={16} className="mr-2" /> Scan Another
                  </Button>
                </MotionPress>
              </Link>
            </div>
          </section>
        </MotionItem>
      </div>
    </MotionPage>
  );
}
