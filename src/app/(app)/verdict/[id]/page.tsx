import Link from "next/link";
import { notFound } from "next/navigation";
import { ScoreCircle } from "@/components/ui/score-circle";
import { VerdictBadge } from "@/components/ui/verdict-badge";
import { FoodCard } from "@/components/ui/food-card";
import { Button } from "@/components/ui/button";
import { NutritionPanel } from "@/components/verdict/nutrition-panel";
import { IngredientTag } from "@/components/verdict/ingredient-tag";
import { verdictFixtures } from "@/lib/seed-data";

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
          className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-600 shadow-card transition-opacity hover:opacity-80"
        >
          ← Back
        </Link>
      </nav>

      {/* Product header */}
      <header className="flex flex-col items-center text-center">
        <div className="mb-3 flex h-20 w-20 items-center justify-center rounded-2xl bg-jellow-yellow/20 text-5xl">
          🥗
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{verdict.name}</h1>
        <p className="text-sm text-gray-500">{verdict.brand}</p>
        <VerdictBadge level={verdict.level} className="mt-2 px-4 py-1.5 text-sm" />
      </header>

      {/* Health score */}
      <section className="flex flex-col items-center gap-2">
        <ScoreCircle score={verdict.score} level={verdict.level} size={140} />
        <p className="text-sm font-medium text-gray-500">Health Score</p>
      </section>

      {/* Verdict explanation */}
      <section className="rounded-2xl bg-white p-4 shadow-card">
        <h2 className="mb-2 text-base font-bold text-gray-900">
          💡 Why this verdict?
        </h2>
        <p className="text-sm leading-relaxed text-gray-600">
          {verdict.verdictExplanation}
        </p>
      </section>

      {/* Nutrition panel */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Nutrition</h2>
        <NutritionPanel {...verdict.nutrition} />
      </section>

      {/* Ingredients */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Ingredients</h2>
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
        <div className="mt-3 flex items-center gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--verdict-excellent)" }}
            />
            Safe
          </span>
          <span className="flex items-center gap-1">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--verdict-caution)" }}
            />
            Caution
          </span>
          <span className="flex items-center gap-1">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: "var(--verdict-avoid)" }}
            />
            Harmful
          </span>
        </div>
      </section>

      {/* Healthier alternatives */}
      {verdict.alternatives.length > 0 && (
        <section>
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            ✨ Healthier Options
          </h2>
          <div className="space-y-3">
            {verdict.alternatives.map((alt) => (
              <FoodCard key={alt.id} product={alt} />
            ))}
          </div>
        </section>
      )}

      {/* Action buttons */}
      <section className="space-y-3 pb-4">
        <Button variant="primary" size="lg" className="w-full">
          ❤️ Save to Favourites
        </Button>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="secondary" size="md" className="w-full">
            📤 Share
          </Button>
          <Link href="/scan" className="block w-full">
            <Button variant="verdict" size="md" className="w-full">
              📷 Scan Another
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
