"use client";

import { cn } from "@/lib/utils";
import { Progress } from "@heroui/progress";

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
    <div className={cn("rounded-[var(--r-xl)] bg-white p-4 shadow-md", className)}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-[var(--font-heading)] font-bold text-s-dark-gray">Nutrition Facts</h3>
        <span className="rounded-full bg-gray-200/40 px-2.5 py-0.5 text-xs font-medium text-s-dark-gray">
          Per {servingSize}
        </span>
      </div>

      {/* Calorie highlight */}
      <div className="mb-4 rounded-[var(--r-lg)] bg-s-gray py-3 text-center">
        <span className="font-[var(--font-heading)] text-4xl font-bold text-s-dark-gray">{calories}</span>
        <span className="ml-1 text-sm text-s-dark-gray">kcal</span>
      </div>

      {/* Macro bars */}
      <div className="mb-4 space-y-3">
        <MacroBar label="Protein" grams={protein} pct={proteinPct} />
        <MacroBar label="Carbs" grams={carbs} pct={carbsPct} />
        <MacroBar label="Fat" grams={fat} pct={fatPct} />
      </div>

      {/* Divider */}
      <div className="my-3 border-t border-black/[0.06]" />

      {/* Key nutrients */}
      <div className="space-y-2">
        <NutrientRow label="Fiber" value={`${fiber}g`} />
        <NutrientRow label="Sodium" value={`${sodium}mg`} />
      </div>

      {/* % Daily Value */}
      <div className="mt-3 border-t border-black/[0.06] pt-3 space-y-2">
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
        <span className="font-semibold text-s-dark-gray">{label}</span>
        <span className="text-s-dark-gray">
          {grams}g &middot; {pct}%
        </span>
      </div>
      <Progress
        value={pct}
        size="sm"
        color="primary"
        aria-label={`${label}: ${pct}%`}
        classNames={{
          track: "bg-gray-200",
          indicator: "bg-s-orange",
        }}
      />
    </div>
  );
}

function NutrientRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-s-dark-gray">{label}</span>
      <span className="font-semibold text-s-dark-gray">{value}</span>
    </div>
  );
}
