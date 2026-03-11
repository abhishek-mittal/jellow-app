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
    <div className="space-y-6 p-4">
      {/* Back navigation */}
      <nav className="flex items-center gap-2 pt-2">
        <Link
          href="/home"
          className="flex items-center gap-1 rounded-[var(--r-sm)] border border-j-stone bg-j-warm-white px-3 py-1.5 text-sm font-medium text-j-navy-soft transition-colors hover:border-j-teal"
        >
          ← Back
        </Link>
      </nav>

      {/* Product header */}
      <header className="flex flex-col items-center text-center">
        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-[var(--r-lg)] bg-j-teal-soft">
          <ScoreCircle score={verdict.score} level={verdict.level} size={64} />
        </div>
        <h1 className="font-[var(--font-heading)] text-2xl font-semibold text-j-navy">{verdict.name}</h1>
        <p className="text-sm text-j-navy-soft">{verdict.brand}</p>
        <VerdictBadge verdict={verdictLevelToVerdict(verdict.level)} className="mt-2 px-4 py-1.5 text-sm" />
      </header>

      {/* Health score */}
      <section className="flex flex-col items-center gap-2">
        <ScoreCircle score={verdict.score} level={verdict.level} size={140} />
        <p className="text-sm font-medium text-j-navy-soft">Health Score</p>
      </section>

      {/* Verdict explanation */}
      <section className="rounded-[var(--r-lg)] border border-j-stone bg-j-warm-white p-4">
        <h2 className="mb-2 font-[var(--font-heading)] text-base font-semibold text-j-navy">
          Why this verdict?
        </h2>
        <p className="text-sm leading-relaxed text-j-navy-soft">
          {verdict.verdictExplanation}
        </p>
      </section>

      {/* Nutrition panel */}
      <section>
        <h2 className="mb-3 font-[var(--font-heading)] text-lg font-semibold text-j-navy">Nutrition</h2>
        <NutritionPanel {...verdict.nutrition} />
      </section>

      {/* Ingredients */}
      <section>
        <h2 className="mb-3 font-[var(--font-heading)] text-lg font-semibold text-j-navy">Ingredients</h2>
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
        <div className="mt-3 flex items-center gap-4 text-xs text-j-navy-soft">
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

      {/* Healthier alternatives */}
      {verdict.alternatives.length > 0 && (
        <section>
          <h2 className="mb-3 font-[var(--font-heading)] text-lg font-semibold text-j-navy">
            Healthier Options
          </h2>
          <div className="space-y-3">
            {verdict.alternatives.map((alt) => (
              <FoodCard
                key={alt.id}
                food={{
                  id: alt.id,
                  name: alt.name,
                  brand: alt.brand,
                  verdict: verdictLevelToVerdict(alt.level),
                }}
              />
            ))}
          </div>
        </section>
      )}

      {/* Action buttons */}
      <section className="space-y-3 pb-4">
        <Button variant="primary" size="lg" className="w-full">
          Save to Favourites
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" size="md" className="w-full">
            Share
          </Button>
          <Link href="/scan" className="block w-full">
            <Button variant="primary" size="md" className="w-full">
              Scan Another
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
