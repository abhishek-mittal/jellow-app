import { test, expect } from "@playwright/test";

/**
 * Auth flow e2e tests.
 *
 * Stub credentials used by the Hono auth route:
 *   email:    user@jellow.app
 *   password: password123
 */

const VALID_EMAIL = "user@jellow.app";
const VALID_PASSWORD = "password123";
const INVALID_PASSWORD = "wrongpassword";

test.describe("Auth — sign-in flow", () => {
  test.beforeEach(async ({ page }) => {
    // Ensure no active session before each test
    await page.context().clearCookies();
  });

  test("renders the sign-in page", async ({ page }) => {
    await page.goto("/auth/sign-in");
    await expect(page.getByText("Sign In To Jellow")).toBeVisible();
  });

  test("signs in with valid credentials and lands on /home", async ({ page }) => {
    await page.goto("/auth/sign-in");

    await page.getByPlaceholder("you@example.com").fill(VALID_EMAIL);
    await page.locator("input[type='password']").fill(VALID_PASSWORD);
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page).toHaveURL(/\/home/);
    await expect(page.getByText("Good morning,")).toBeVisible();
  });

  test("shows error on invalid credentials", async ({ page }) => {
    await page.goto("/auth/sign-in");

    await page.getByPlaceholder("you@example.com").fill(VALID_EMAIL);
    await page.locator("input[type='password']").fill(INVALID_PASSWORD);
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page.getByText("Invalid email or password")).toBeVisible();
    await expect(page).toHaveURL(/\/auth\/sign-in/);
  });

  test("shows validation errors when fields are empty", async ({ page }) => {
    await page.goto("/auth/sign-in");
    await page.getByRole("button", { name: "Sign In" }).click();

    await expect(page.getByText("Email is required")).toBeVisible();
    await expect(page.getByText("Password is required")).toBeVisible();
  });

  test("redirects signed-in users away from /auth/sign-in to /home", async ({ page }) => {
    // Sign in first
    await page.goto("/auth/sign-in");
    await page.getByPlaceholder("you@example.com").fill(VALID_EMAIL);
    await page.locator("input[type='password']").fill(VALID_PASSWORD);
    await page.getByRole("button", { name: "Sign In" }).click();
    await expect(page).toHaveURL(/\/home/);

    // Now visiting /auth/sign-in should redirect to /home
    await page.goto("/auth/sign-in");
    await expect(page).toHaveURL(/\/home/);
  });
});

test.describe("Auth — sign-up flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test("renders the sign-up page", async ({ page }) => {
    await page.goto("/auth/sign-up");
    await expect(page.getByText("Sign Up For Free")).toBeVisible();
  });

  test("signs up with new credentials and lands on /home", async ({ page }) => {
    await page.goto("/auth/sign-up");

    const newEmail = `test+${Date.now()}@example.com`;
    await page.getByRole("textbox", { name: "Email Address" }).fill(newEmail);
    const passwordInputs = page.locator("input[type='password']");
    await passwordInputs.nth(0).fill("mypassword123");
    await passwordInputs.nth(1).fill("mypassword123");

    await page.getByRole("button", { name: /sign up/i }).click();

    await expect(page).toHaveURL(/\/home/);
  });

  test("keeps CTA disabled when passwords do not match", async ({ page }) => {
    await page.goto("/auth/sign-up");

    await page.getByRole("textbox", { name: "Email Address" }).fill("a@b.com");
    const passwordInputs = page.locator("input[type='password']");
    await passwordInputs.nth(0).fill("password123");
    await passwordInputs.nth(1).fill("different123");
    await passwordInputs.nth(1).blur();

    await expect(page.getByRole("button", { name: /sign up/i })).toBeDisabled();
    await expect(page.getByText("ERROR: Password Don't Match!")).toBeVisible();
  });
});

test.describe("Auth — password-reset flow", () => {
  test.beforeEach(async ({ page }) => {
    await page.context().clearCookies();
  });

  test("renders the reset-password page", async ({ page }) => {
    await page.goto("/auth/reset-password");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Reset Password");
  });

  test("CTA is disabled until a method is selected", async ({ page }) => {
    await page.goto("/auth/reset-password");
    await expect(page.getByRole("button", { name: /reset password/i })).toBeDisabled();
  });

  test("selects a reset method and proceeds to password-sent screen", async ({ page }) => {
    await page.goto("/auth/reset-password");

    await page.getByText("Send via Email").click();
    await page.getByRole("button", { name: /reset password/i }).click();

    await expect(page).toHaveURL(/\/auth\/password-sent/);
  });

  test("back button navigates to sign-in", async ({ page }) => {
    await page.goto("/auth/reset-password");
    await page.getByRole("button", { name: /go back/i }).click();
    await expect(page).toHaveURL(/\/auth\/sign-in/);
  });
});

test.describe("Auth — route guard", () => {
  test("signed-out user is redirected from /home to /auth/sign-in", async ({ page }) => {
    await page.context().clearCookies();
    await page.goto("/home");
    await expect(page).toHaveURL(/\/auth\/sign-in/);
  });
});
