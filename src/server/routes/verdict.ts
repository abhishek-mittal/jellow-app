import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getOrComputeVerdict } from "@/server/services/verdict.service";

const verdictParamSchema = z.object({
  productId: z.string().min(1),
});

export const verdictRoute = new Hono().get(
  "/:productId",
  zValidator("param", verdictParamSchema),
  async (c) => {
    const { productId } = c.req.valid("param");
    const verdict = await getOrComputeVerdict(productId);

    if (!verdict) {
      return c.json({ error: "Product not found or no nutrition data" }, 404);
    }

    return c.json({ data: verdict });
  }
);
