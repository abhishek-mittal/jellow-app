import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { seedVerdict } from "@/lib/seed-data";

const verdictParamSchema = z.object({
  productId: z.string().min(1),
});

export const verdictRoute = new Hono().get(
  "/:productId",
  zValidator("param", verdictParamSchema),
  (c) => {
    const { productId } = c.req.valid("param");
    // TODO: compute real verdict from nutrition API
    return c.json({ data: { ...seedVerdict, productId } });
  }
);
