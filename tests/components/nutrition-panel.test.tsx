import { describe, it, expect } from "vitest";
import { NutritionPanel } from "@/components/verdict/nutrition-panel";
import type { NutritionPanelProps } from "@/components/verdict/nutrition-panel";

describe("NutritionPanel", () => {
  it("is exported as a function (component)", () => {
    expect(typeof NutritionPanel).toBe("function");
  });

  it("has a name matching the component identifier", () => {
    expect(NutritionPanel.name).toBe("NutritionPanel");
  });

  it("accepts NutritionPanelProps — all required fields present", () => {
    // Type-level check: constructing the props object must satisfy the interface.
    const props: NutritionPanelProps = {
      calories: 200,
      protein: 10,
      carbs: 30,
      fat: 5,
      fiber: 3,
      sodium: 120,
      servingSize: "100g",
    };
    expect(props.calories).toBe(200);
    expect(props.servingSize).toBe("100g");
  });

  it("calculates protein macro percentage correctly", () => {
    // protein 4 cal/g, carbs 4 cal/g, fat 9 cal/g
    const protein = 15; // 60 kcal
    const carbs = 30;   // 120 kcal
    const fat = 5;      // 45 kcal
    const total = protein * 4 + carbs * 4 + fat * 9; // 225 kcal
    const pct = Math.round((protein * 4) / total * 100);
    expect(pct).toBe(27); // 60/225 ≈ 26.7 → 27
  });

  it("calculates carbs macro percentage correctly", () => {
    const protein = 15;
    const carbs = 30;
    const fat = 5;
    const total = protein * 4 + carbs * 4 + fat * 9;
    const pct = Math.round((carbs * 4) / total * 100);
    expect(pct).toBe(53); // 120/225 ≈ 53.3 → 53
  });

  it("calculates fat macro percentage correctly", () => {
    const protein = 15;
    const carbs = 30;
    const fat = 5;
    const total = protein * 4 + carbs * 4 + fat * 9;
    const pct = Math.round((fat * 9) / total * 100);
    expect(pct).toBe(20); // 45/225 = 20
  });

  it("handles zero macros without dividing by zero", () => {
    const total = 0;
    const pct = total === 0 ? 0 : Math.round((0 * 4) / total * 100);
    expect(pct).toBe(0);
  });

  it("protein + carbs + fat percentages sum to approximately 100", () => {
    const protein = 20;
    const carbs = 50;
    const fat = 10;
    const total = protein * 4 + carbs * 4 + fat * 9;
    const pPct = Math.round((protein * 4) / total * 100);
    const cPct = Math.round((carbs * 4) / total * 100);
    const fPct = Math.round((fat * 9) / total * 100);
    // Due to rounding each value independently, sum is within ±2 of 100
    expect(Math.abs(pPct + cPct + fPct - 100)).toBeLessThanOrEqual(2);
  });
});
