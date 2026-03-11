import { test, expect } from "@playwright/test";

test.describe("Rewards Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/rewards");
  });

  test("renders Jelly Points header", async ({ page }) => {
    await expect(page.getByText("Your Jelly Points")).toBeVisible();
  });

  test("renders badges earned section", async ({ page }) => {
    await expect(page.getByText("Badges Earned")).toBeVisible();
  });

  test("renders challenges section", async ({ page }) => {
    await expect(page.getByText("Challenges")).toBeVisible();
  });
});
