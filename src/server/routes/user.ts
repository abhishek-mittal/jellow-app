import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import {
  getUserProfile,
  updateUserProfile,
  saveUserPreferences,
  getUserPreferences,
} from "@/server/services/user.service";

const updateProfileSchema = z.object({
  name: z.string().min(1).optional(),
  image: z.string().url().optional(),
});

const preferencesSchema = z.object({
  dietaryPreference: z
    .enum(["omnivore", "vegetarian", "vegan", "pescatarian"])
    .optional(),
  allergies: z.array(z.string()).optional(),
  healthGoals: z.array(z.string()).optional(),
  onboardingCompleted: z.boolean().optional(),
});

export const userRoute = new Hono()
  .get("/profile", async (c) => {
    // TODO: extract userId from auth session
    const userId = c.req.header("x-user-id");
    if (!userId) return c.json({ error: "Unauthorized" }, 401);

    const profile = await getUserProfile(userId);
    if (!profile) return c.json({ error: "User not found" }, 404);

    return c.json({ data: profile });
  })
  .put(
    "/profile",
    zValidator("json", updateProfileSchema),
    async (c) => {
      const userId = c.req.header("x-user-id");
      if (!userId) return c.json({ error: "Unauthorized" }, 401);

      const data = c.req.valid("json");
      const updated = await updateUserProfile(userId, data);
      return c.json({ data: updated });
    }
  )
  .get("/preferences", async (c) => {
    const userId = c.req.header("x-user-id");
    if (!userId) return c.json({ error: "Unauthorized" }, 401);

    const prefs = await getUserPreferences(userId);
    return c.json({ data: prefs });
  })
  .post(
    "/preferences",
    zValidator("json", preferencesSchema),
    async (c) => {
      const userId = c.req.header("x-user-id");
      if (!userId) return c.json({ error: "Unauthorized" }, 401);

      const data = c.req.valid("json");
      const prefs = await saveUserPreferences(userId, data);
      return c.json({ data: prefs });
    }
  );
