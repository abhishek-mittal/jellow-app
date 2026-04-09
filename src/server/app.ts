import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { healthRoute } from "./routes/health";
import { scanRoute } from "./routes/scan";
import { verdictRoute } from "./routes/verdict";
import { rewardsRoute } from "./routes/rewards";
import { userRoute } from "./routes/user";

const app = new Hono().basePath("/api/v1");

// Middleware
app.use("*", logger());
app.use("*", cors());

// Routes
app.route("/health", healthRoute);
app.route("/scan", scanRoute);
app.route("/verdict", verdictRoute);
app.route("/rewards", rewardsRoute);
app.route("/user", userRoute);

// Global error handler
app.onError((err, c) => {
  console.error(`[API Error] ${err.message}`);
  return c.json({ error: "Internal Server Error" }, 500);
});

app.notFound((c) => {
  return c.json({ error: "Not Found" }, 404);
});

export default app;
export type AppType = typeof app;
