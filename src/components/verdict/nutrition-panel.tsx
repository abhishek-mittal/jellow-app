import { cn } from "@/lib/utils";

export interface NutritionPanelProps {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  sodium: number;
  servingSize: string;
  className?: string;
}

function calcMacroPct(grams: number, calsPerGram: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((grams * calsPerGram) / total * 100);
}

export function NutritionPanel({
  calories,
  protein,
  carbs,
  fat,
  fiber,
  sodium,
  servingSize,
  className,
}: NutritionPanelProps) {
  const totalMacroCals = protein * 4 + carbs * 4 + fat * 9;
  const proteinPct = calcMacroPct(protein, 4, totalMacroCals);
  const carbsPct = calcMacroPct(carbs, 4, totalMacroCals);
  const fatPct = calcMacroPct(fat, 9, totalMacroCals);

  return (
    <div className={cn("rounded-[var(--r-lg)] border border-j-stone bg-j-warm-white p-4", className)}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-[var(--font-heading)] font-bold text-j-navy">Nutrition Facts</h3>
        <span className="rounded-[var(--r-sm)] bg-j-stone/40 px-2 py-0.5 text-xs text-j-navy-soft">
          Per {servingSize}
        </span>
      </div>

      {/* Calorie highlight */}
      <div className="mb-4 rounded-[var(--r-sm)] bg-j-cream py-3 text-center">
        <span className="font-[var(--font-heading)] text-4xl font-bold text-j-navy">{calories}</span>
        <span className="ml-1 text-sm text-j-navy-soft">kcal</span>
      </div>

      {/* Macro bars */}
      <div className="mb-4 space-y-3">
        <MacroBar label="Protein" grams={protein} pct={proteinPct} />
        <MacroBar label="Carbs" grams={carbs} pct={carbsPct} />
        <MacroBar label="Fat" grams={fat} pct={fatPct} />
      </div>

      {/* Divider */}
      <div className="my-3 border-t border-j-stone" />

      {/* Key nutrients */}
      <div className="space-y-2">
        <NutrientRow label="Fiber" value={`${fiber}g`} />
        <NutrientRow label="Sodium" value={`${sodium}mg`} />
      </div>

      {/* % Daily Value */}
      <div className="mt-3 border-t border-j-stone pt-3 space-y-2">
        <NutrientRow label="Protein (% DV)" value={`${Math.round((protein / 50) * 100)}%`} />
        <NutrientRow label="Total Carbs (% DV)" value={`${Math.round((carbs / 275) * 100)}%`} />
        <NutrientRow label="Dietary Fiber (% DV)" value={`${Math.round((fiber / 28) * 100)}%`} />
        <NutrientRow label="Sodium (% DV)" value={`${Math.round((sodium / 2300) * 100)}%`} />
      </div>
    </div>
  );
}

function MacroBar({ label, grams, pct }: { label: string; grams: number; pct: number }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-xs">
        <span className="font-semibold text-j-navy">{label}</span>
        <span className="text-j-navy-soft">
          {grams}g &middot; {pct}%
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-j-stone">
        <div
          className="h-full rounded-full bg-j-teal transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

function NutrientRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-j-navy-soft">{label}</span>
      <span className="font-semibold text-j-navy">{value}</span>
    </div>
  );
}
