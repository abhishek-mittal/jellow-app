import { test, expect } from "@playwright/test";

test.describe("Onboarding Flow", () => {
  test("renders welcome screen", async ({ page }) => {
    await page.goto("/onboarding");
    await expect(page.getByText("Welcome to Jellow")).toBeVisible();
    await expect(
      page.getByText(
        "Your playful health companion. Scan products, learn what's inside, and earn rewards for healthy choices.",
      ),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Get Started" }),
    ).toBeVisible();
  });

  test("Get Started button navigates to home", async ({ page }) => {
    await page.goto("/onboarding");
    await page.getByRole("link", { name: "Get Started" }).click();
    await expect(page).toHaveURL(/\/home/);
    await expect(page.getByText("Good morning,")).toBeVisible();
  });
});
