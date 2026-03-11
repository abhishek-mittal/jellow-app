import { test, expect } from "@playwright/test";

test.describe("Prescription Upload Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/prescription");
  });

  test("renders prescriptions heading", async ({ page }) => {
    await expect(page.getByText("Prescriptions")).toBeVisible();
  });

  test("renders upload description", async ({ page }) => {
    await expect(
      page.getByText(
        "Upload your prescriptions to get personalised health alerts.",
      ),
    ).toBeVisible();
  });

  test("renders coming soon notice", async ({ page }) => {
    await expect(page.getByText("Coming soon")).toBeVisible();
  });
});
