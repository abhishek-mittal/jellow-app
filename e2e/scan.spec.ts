import { test, expect } from "@playwright/test";

test.describe("Scanner Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/scan");
  });

  test("renders scan page heading", async ({ page }) => {
    await expect(page.getByText("Scan a Product")).toBeVisible();
    await expect(
      page.getByText("Point your camera at a barcode to check the health score"),
    ).toBeVisible();
  });

  test("renders camera and barcode entry buttons", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Open Camera" }),
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Enter Barcode" }),
    ).toBeVisible();
  });

  test("demo verdict link is visible and navigates to verdict", async ({
    page,
  }) => {
    const demoLink = page.getByText("Try demo verdict →");
    await expect(demoLink).toBeVisible();
    await demoLink.click();
    await expect(page).toHaveURL(/\/verdict\//);
  });
});
