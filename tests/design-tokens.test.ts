import { describe, it, expect } from "vitest";
import tokens from "@/config/design-tokens.json";

describe("design-tokens.json", () => {
  it("has Penpot verdict colors", () => {
    expect(tokens.colors.verdict.green).toBe("#22C55E");
    expect(tokens.colors.verdict.yellow).toBe("#EAB308");
    expect(tokens.colors.verdict.red).toBe("#EF4444");
  });

  it("has background color", () => {
    expect(tokens.colors.background).toBe("#FFFBF0");
  });

  it("has full gray scale (50–900)", () => {
    const gray = tokens.colors.gray;
    expect(gray["50"]).toBeDefined();
    expect(gray["100"]).toBeDefined();
    expect(gray["200"]).toBeDefined();
    expect(gray["300"]).toBeDefined();
    expect(gray["400"]).toBeDefined();
    expect(gray["500"]).toBeDefined();
    expect(gray["600"]).toBeDefined();
    expect(gray["700"]).toBeDefined();
    expect(gray["800"]).toBeDefined();
    expect(gray["900"]).toBeDefined();
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

  it("has 4-level shadow elevation ladder", () => {
    const shadows = tokens.shadows;
    expect(shadows.subtle).toBeDefined();
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
