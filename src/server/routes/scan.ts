import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { getScanHistory, createScan } from "@/server/services/scan.service";
import { lookupByBarcode } from "@/server/services/product.service";

const scanQuerySchema = z.object({
  barcode: z.string().min(1),
});

const historyQuerySchema = z.object({
  limit: z.coerce.number().int().min(1).max(100).default(20),
  offset: z.coerce.number().int().min(0).default(0),
});

const createScanSchema = z.object({
  productId: z.string().min(1),
});

export const scanRoute = new Hono()
  .get("/history", zValidator("query", historyQuerySchema), async (c) => {
    const userId = c.req.header("x-user-id");
    if (!userId) return c.json({ error: "Unauthorized" }, 401);

    const { limit, offset } = c.req.valid("query");
    const data = await getScanHistory(userId, limit, offset);
    return c.json({ data });
  })
  .get("/lookup", zValidator("query", scanQuerySchema), async (c) => {
    const { barcode } = c.req.valid("query");
    const product = await lookupByBarcode(barcode);

    if (!product) {
      return c.json({ data: null, message: "Product not found" }, 404);
    }

    return c.json({
      data: {
        barcode: product.barcode,
        productId: product.id,
        name: product.name,
        brand: product.brand,
      },
    });
  })
  .post("/create", zValidator("json", createScanSchema), async (c) => {
    const userId = c.req.header("x-user-id");
    if (!userId) return c.json({ error: "Unauthorized" }, 401);

    const { productId } = c.req.valid("json");
    const scan = await createScan(userId, productId);
    return c.json({ data: scan }, 201);
  });
