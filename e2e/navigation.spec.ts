import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test("BottomNav renders all links on home page", async ({ page }) => {
    await page.goto("/home");
    await expect(page.getByRole("link", { name: "Home" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Scan" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Rewards" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Profile" })).toBeVisible();
  });

  test("navigates to Scan via BottomNav", async ({ page }) => {
    await page.goto("/home");
    await page.getByRole("link", { name: "Scan" }).click();
    await expect(page).toHaveURL(/\/scan/);
    await expect(page.getByText("Scan a Product")).toBeVisible();
  });

  test("navigates to Rewards via BottomNav", async ({ page }) => {
    await page.goto("/home");
    await page.getByRole("link", { name: "Rewards" }).click();
    await expect(page).toHaveURL(/\/rewards/);
    await expect(page.getByText("Your Jelly Points")).toBeVisible();
  });

  test("navigates to Profile via BottomNav", async ({ page }) => {
    await page.goto("/home");
    await page.getByRole("link", { name: "Profile" }).click();
    await expect(page).toHaveURL(/\/profile/);
  });

  test("navigates back to Home via BottomNav", async ({ page }) => {
    await page.goto("/scan");
    await page.getByRole("link", { name: "Home" }).click();
    await expect(page).toHaveURL(/\/home/);
    await expect(page.getByText("Good morning,")).toBeVisible();
  });
});
