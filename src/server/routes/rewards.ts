import { Hono } from "hono";
import { getUserBadges, getActiveChallenges } from "@/server/services/rewards.service";
import { getUserProfile } from "@/server/services/user.service";

export const rewardsRoute = new Hono()
  .get("/profile", async (c) => {
    const userId = c.req.header("x-user-id");
    if (!userId) return c.json({ error: "Unauthorized" }, 401);

    const profile = await getUserProfile(userId);
    if (!profile) return c.json({ error: "User not found" }, 404);

    return c.json({ data: profile });
  })
  .get("/challenges", async (c) => {
    const userId = c.req.header("x-user-id");
    if (!userId) return c.json({ error: "Unauthorized" }, 401);

    const challenges = await getActiveChallenges(userId);
    return c.json({ data: challenges });
  })
  .get("/badges", async (c) => {
    const userId = c.req.header("x-user-id");
    if (!userId) return c.json({ error: "Unauthorized" }, 401);

    const badges = await getUserBadges(userId);
    return c.json({ data: badges });
  });
