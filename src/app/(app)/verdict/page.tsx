import { ScoreCircle } from "@/components/ui/score-circle";
import { VerdictBadge } from "@/components/ui/verdict-badge";
import { FoodCard } from "@/components/ui/food-card";
import { Chip } from "@/components/ui/chip";
import { seedVerdict } from "@/lib/seed-data";
import { verdictLevelToVerdict } from "@/lib/verdict";

export default function VerdictPage() {
  const v = seedVerdict;

  return (
    <div className="space-y-6 p-4">
      {/* Product Header */}
      <header className="flex flex-col items-center pt-4 text-center">
        <ScoreCircle score={v.score} level={v.level} size={140} />
        <h1 className="mt-4 font-[var(--font-heading)] text-2xl font-semibold text-j-navy">Greek Yogurt</h1>
        <p className="text-sm text-j-navy-soft">Organic Valley</p>
        <VerdictBadge
          verdict={verdictLevelToVerdict(v.level)}
          score={Math.round(v.score / 10)}
          size="lg"
          className="mt-2"
        />
      </header>

      {/* Nutrients */}
      <section>
        <h2 className="mb-3 font-[var(--font-heading)] text-lg font-semibold text-j-navy">Key Nutrients</h2>
        <div className="grid grid-cols-3 gap-3">
          {v.nutrients.map((n) => (
            <div key={n.name} className="rounded-[var(--r-lg)] border border-j-stone bg-j-warm-white p-3 text-center">
              <p className="font-[var(--font-heading)] text-lg font-semibold text-j-navy">
                {n.value}
                <span className="text-xs text-j-navy-soft">{n.unit}</span>
              </p>
              <p className="text-xs text-j-navy-soft">{n.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ingredients */}
      <section>
        <h2 className="mb-3 font-[var(--font-heading)] text-lg font-semibold text-j-navy">Ingredients</h2>
        <div className="flex flex-wrap gap-2">
          {v.ingredients.map((ing) => (
            <Chip
              key={ing.name}
              color={ing.isFlagged ? "danger" : "default"}
              variant="flat"
              size="sm"
              classNames={{ content: "text-sm font-medium" }}
            >
              {ing.name}
            </Chip>
          ))}
        </div>
      </section>

      {/* Alternatives */}
      <section>
        <h2 className="mb-3 font-[var(--font-heading)] text-lg font-semibold text-j-navy">Better Alternatives</h2>
        <div className="space-y-3">
          {v.alternatives.map((alt) => (
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
    </div>
  );
}
