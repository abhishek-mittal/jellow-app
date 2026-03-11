import { ScoreCircle } from "@/components/ui/score-circle";
import { VerdictBadge } from "@/components/ui/verdict-badge";
import { FoodCard } from "@/components/ui/food-card";
import { seedVerdict } from "@/lib/seed-data";
import { VERDICT_LABELS } from "@/config/constants";

export default function VerdictPage() {
  const v = seedVerdict;

  return (
    <div className="space-y-6 p-4">
      {/* Product Header */}
      <header className="flex flex-col items-center pt-4 text-center">
        <ScoreCircle score={v.score} level={v.level} size={140} />
        <h1 className="mt-4 text-2xl font-bold text-gray-900">Greek Yogurt</h1>
        <p className="text-sm text-gray-500">Organic Valley</p>
        <VerdictBadge level={v.level} className="mt-2" />
      </header>

      {/* Nutrients */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Key Nutrients</h2>
        <div className="grid grid-cols-3 gap-3">
          {v.nutrients.map((n) => (
            <div key={n.name} className="rounded-2xl bg-white p-3 text-center shadow-card">
              <p className="text-lg font-bold text-gray-900">
                {n.value}
                <span className="text-xs text-gray-400">{n.unit}</span>
              </p>
              <p className="text-xs text-gray-500">{n.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ingredients */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Ingredients</h2>
        <div className="flex flex-wrap gap-2">
          {v.ingredients.map((ing) => (
            <span
              key={ing.name}
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                ing.isFlagged
                  ? "bg-verdict-avoid/15 text-verdict-avoid"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {ing.name}
            </span>
          ))}
        </div>
      </section>

      {/* Alternatives */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Better Alternatives</h2>
        <div className="space-y-3">
          {v.alternatives.map((alt) => (
            <FoodCard key={alt.id} product={alt} />
          ))}
        </div>
      </section>
    </div>
  );
}
