"use client";

import { useState } from "react";
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
  const [showMore, setShowMore] = useState(false);

  const totalMacroCals = protein * 4 + carbs * 4 + fat * 9;
  const proteinPct = calcMacroPct(protein, 4, totalMacroCals);
  const carbsPct = calcMacroPct(carbs, 4, totalMacroCals);
  const fatPct = calcMacroPct(fat, 9, totalMacroCals);

  return (
    <div className={cn("rounded-2xl bg-white p-4 shadow-card", className)}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Nutrition Facts</h3>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
          Per {servingSize}
        </span>
      </div>

      {/* Calorie highlight */}
      <div className="mb-4 rounded-xl bg-gray-50 py-3 text-center">
        <span className="text-4xl font-bold text-gray-900">{calories}</span>
        <span className="ml-1 text-sm text-gray-500">kcal</span>
      </div>

      {/* Macro bars */}
      <div className="mb-4 space-y-3">
        {/* Protein */}
        <div>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-700">Protein</span>
            <span className="text-gray-500">
              {protein}g &middot; {proteinPct}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${proteinPct}%`,
                backgroundColor: "var(--verdict-good)",
              }}
            />
          </div>
        </div>

        {/* Carbs */}
        <div>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-700">Carbs</span>
            <span className="text-gray-500">
              {carbs}g &middot; {carbsPct}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${carbsPct}%`,
                backgroundColor: "var(--verdict-caution)",
              }}
            />
          </div>
        </div>

        {/* Fat */}
        <div>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="font-semibold text-gray-700">Fat</span>
            <span className="text-gray-500">
              {fat}g &middot; {fatPct}%
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${fatPct}%`,
                backgroundColor: "var(--candy-orange)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="my-3 border-t border-gray-100" />

      {/* Key nutrients */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Fiber</span>
          <span className="font-semibold text-gray-900">{fiber}g</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Sodium</span>
          <span className="font-semibold text-gray-900">{sodium}mg</span>
        </div>
      </div>

      {/* Collapsible section */}
      <button
        type="button"
        onClick={() => setShowMore((prev) => !prev)}
        className="mt-4 w-full text-center text-xs font-semibold text-gray-500 transition-colors hover:text-gray-700"
      >
        {showMore ? "Show less ▲" : "Show more nutrients ▼"}
      </button>

      {showMore && (
        <div className="mt-3 space-y-2 border-t border-gray-100 pt-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Protein (% DV)</span>
            <span className="font-semibold text-gray-900">
              {Math.round((protein / 50) * 100)}%
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Total Carbs (% DV)</span>
            <span className="font-semibold text-gray-900">
              {Math.round((carbs / 275) * 100)}%
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Dietary Fiber (% DV)</span>
            <span className="font-semibold text-gray-900">
              {Math.round((fiber / 28) * 100)}%
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Sodium (% DV)</span>
            <span className="font-semibold text-gray-900">
              {Math.round((sodium / 2300) * 100)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
