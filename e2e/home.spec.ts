import { test, expect } from "@playwright/test";

test.describe("Home Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/home");
  });

  test("renders greeting and stats", async ({ page }) => {
    await expect(page.getByText("Good morning,")).toBeVisible();
    await expect(page.getByText("Scans")).toBeVisible();
    await expect(page.getByText("Day Streak")).toBeVisible();
    await expect(page.getByText("Badges")).toBeVisible();
  });

  test("renders scan CTA", async ({ page }) => {
    await expect(page.getByText("Scan a Product")).toBeVisible();
    await expect(
      page.getByText("Check if your food is healthy"),
    ).toBeVisible();
  });

  test("renders active challenges section", async ({ page }) => {
    await expect(page.getByText("Active Challenges")).toBeVisible();
  });

  test("renders recent scans section", async ({ page }) => {
    await expect(page.getByText("Recent Scans")).toBeVisible();
  });
});
