import { createAuthClient } from "better-auth/react";

/** Better Auth client — use in React components for sign-in, sign-up, etc. */
export const authClient = createAuthClient({
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : (process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
});
