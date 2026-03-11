import { describe, it, expect, vi } from "vitest";
import { IngredientTag } from "@/components/verdict/ingredient-tag";
import type { IngredientSafety, IngredientTagProps } from "@/components/verdict/ingredient-tag";

describe("IngredientTag", () => {
  it("is exported as a function (component)", () => {
    expect(typeof IngredientTag).toBe("function");
  });

  it("has a name matching the component identifier", () => {
    expect(IngredientTag.name).toBe("IngredientTag");
  });

  it("accepts all three safety levels as valid IngredientSafety values", () => {
    const validSafetyLevels: IngredientSafety[] = ["safe", "caution", "harmful"];
    expect(validSafetyLevels).toHaveLength(3);
    expect(validSafetyLevels).toContain("safe");
    expect(validSafetyLevels).toContain("caution");
    expect(validSafetyLevels).toContain("harmful");
  });

  it("satisfies the IngredientTagProps interface with required props", () => {
    const props: IngredientTagProps = { name: "Sugar", safety: "caution" };
    expect(props.name).toBe("Sugar");
    expect(props.safety).toBe("caution");
  });

  it("satisfies the IngredientTagProps interface with all optional props", () => {
    const onPressMock = vi.fn();
    const props: IngredientTagProps = {
      name: "Aspartame",
      safety: "harmful",
      description: "Artificial sweetener with contested health effects.",
      onPress: onPressMock,
      className: "custom-class",
    };
    expect(props.description).toBeDefined();
    expect(typeof props.onPress).toBe("function");
  });

  it("accepts safe safety level", () => {
    const props: IngredientTagProps = { name: "Water", safety: "safe" };
    expect(props.safety).toBe("safe");
  });

  it("accepts caution safety level", () => {
    const props: IngredientTagProps = { name: "Palm Oil", safety: "caution" };
    expect(props.safety).toBe("caution");
  });

  it("accepts harmful safety level", () => {
    const props: IngredientTagProps = { name: "Trans Fat", safety: "harmful" };
    expect(props.safety).toBe("harmful");
  });
});
