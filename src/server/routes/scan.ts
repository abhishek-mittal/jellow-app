import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { seedHistory } from "@/lib/seed-data";

const scanQuerySchema = z.object({
  barcode: z.string().min(1),
});

export const scanRoute = new Hono()
  .get("/history", (c) => {
    return c.json({ data: seedHistory });
  })
  .get("/lookup", zValidator("query", scanQuerySchema), (c) => {
    const { barcode } = c.req.valid("query");
    // TODO: integrate real barcode lookup API
    return c.json({
      data: {
        barcode,
        productId: "p1",
        name: "Greek Yogurt",
        brand: "Organic Valley",
      },
    });
  });
