import { Hono } from "hono";
import { seedUser } from "@/lib/seed-data";

export const rewardsRoute = new Hono()
  .get("/profile", (c) => {
    return c.json({ data: seedUser });
  })
  .get("/challenges", (c) => {
    return c.json({ data: seedUser.activeChallenges });
  })
  .get("/badges", (c) => {
    return c.json({ data: seedUser.badges });
  });
