import { describe, it, expect } from "vitest";
import tokens from "@/config/design-tokens.json";

describe("design-tokens.json", () => {
  it("has verdict colors", () => {
    expect(tokens.colors.verdict.excellent).toBe("#10B981");
    expect(tokens.colors.verdict.good).toBe("#3B82F6");
    expect(tokens.colors.verdict.caution).toBe("#F59E0B");
    expect(tokens.colors.verdict.avoid).toBe("#EF4444");
  });

  it("has brand colors", () => {
    expect(tokens.colors.brand.orange).toBe("#FF6B00");
    expect(tokens.colors.brand.blue).toBe("#3B82F6");
  });

  it("has grayscale tokens", () => {
    const gs = tokens.colors.grayscale;
    expect(gs.black).toBe("#111111");
    expect(gs.darkGray).toBe("#2D2D2D");
    expect(gs.gray).toBe("#F8F9FA");
    expect(gs.white).toBe("#FFFFFF");
  });

  it("has 8pt spacing grid", () => {
    const spacing = tokens.spacing;
    expect(spacing["1"]).toBe("4px");
    expect(spacing["2"]).toBe("8px");
    expect(spacing["3"]).toBe("12px");
    expect(spacing["4"]).toBe("16px");
    expect(spacing["5"]).toBe("20px");
    expect(spacing["6"]).toBe("24px");
    expect(spacing["8"]).toBe("32px");
    expect(spacing["10"]).toBe("40px");
    expect(spacing["12"]).toBe("48px");
  });

  it("has 3-level shadow elevation ladder", () => {
    const shadows = tokens.shadows;
    expect(shadows.card).toBeDefined();
    expect(shadows.elevated).toBeDefined();
    expect(shadows.modal).toBeDefined();
  });

  it("has iOS HIG typography scale (11pt–34pt)", () => {
    const fontSize = tokens.typography.fontSize;
    expect(fontSize.caption2).toBe("11px");
    expect(fontSize.largeTitle).toBe("34px");
  });
});
