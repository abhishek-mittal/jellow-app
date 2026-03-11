import { test, expect } from "@playwright/test";

test.describe("Food Verdict Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/verdict/p1");
  });

  test("renders product name and brand", async ({ page }) => {
    await expect(page.getByText("Greek Yogurt")).toBeVisible();
    await expect(page.getByText("Organic Valley")).toBeVisible();
  });

  test("renders key nutrients section", async ({ page }) => {
    await expect(page.getByText("Key Nutrients")).toBeVisible();
  });

  test("renders ingredients section", async ({ page }) => {
    await expect(page.getByText("Ingredients")).toBeVisible();
  });

  test("renders better alternatives section", async ({ page }) => {
    await expect(page.getByText("Better Alternatives")).toBeVisible();
  });
});
