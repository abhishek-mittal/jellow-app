import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

/** Cookie name used to persist the session across requests. */
const SESSION_COOKIE = "jellow-session";

/** Stub credential for integration / e2e testing. */
const STUB_EMAIL = "user@jellow.app";
const STUB_PASSWORD = "password123";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const resetPasswordSchema = z.object({
  method: z.enum(["email", "2fa", "google"]),
  /**
   * Email is optional: "2fa" and "google" methods do not require an email
   * address since they use the user's linked authentication app/account.
   * For the "email" method, the email defaults to the signed-in user's address
   * on the server side (stubbed here).
   */
  email: z.string().email().optional(),
});

/**
 * Auth routes mounted at /api/v1/auth.
 * Uses a simple HTTP-only cookie to represent a signed-in session.
 * All credential checks are stubbed for integration/e2e use.
 */
export const authRoute = new Hono()
  /** POST /sign-in — validates credentials and sets session cookie. */
  .post("/sign-in", zValidator("json", signInSchema), (c) => {
    const { email, password } = c.req.valid("json");

    const isValid = email === STUB_EMAIL && password === STUB_PASSWORD;
    if (!isValid) {
      return c.json({ error: "Invalid email or password" }, 401);
    }

    c.header(
      "Set-Cookie",
      `${SESSION_COOKIE}=${encodeURIComponent(email)}; Path=/; HttpOnly; SameSite=Lax`,
    );
    return c.json({ user: { email } });
  })

  /** POST /sign-up — creates a stub account and sets session cookie. */
  .post("/sign-up", zValidator("json", signUpSchema), (c) => {
    const { email } = c.req.valid("json");

    c.header(
      "Set-Cookie",
      `${SESSION_COOKIE}=${encodeURIComponent(email)}; Path=/; HttpOnly; SameSite=Lax`,
    );
    return c.json({ user: { email } }, 201);
  })

  /** POST /sign-out — clears the session cookie. */
  .post("/sign-out", (c) => {
    c.header(
      "Set-Cookie",
      `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
    );
    return c.json({ ok: true });
  })

  /** POST /reset-password — stub: records the chosen reset method. */
  .post("/reset-password", zValidator("json", resetPasswordSchema), (c) => {
    const { method } = c.req.valid("json");
    return c.json({ ok: true, method });
  });
