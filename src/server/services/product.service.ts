import { db } from "@/lib/db";

/** Lookup product by barcode — check DB first, return null if not found. */
export async function lookupByBarcode(barcode: string) {
  return db.product.findUnique({
    where: { barcode },
    include: { nutrition: true, ingredients: true },
  });
}

/** Fetch product by ID with nutrition and ingredients. */
export async function getProduct(productId: string) {
  return db.product.findUnique({
    where: { id: productId },
    include: { nutrition: true, ingredients: true },
  });
}

/** Create or update a product from external API data. */
export async function upsertProduct(data: {
  barcode: string;
  name: string;
  brand: string;
  category?: string;
  imageUrl?: string;
  nutrition?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sodium: number;
    servingSize: string;
  };
  ingredients?: Array<{
    name: string;
    safety: "safe" | "caution" | "harmful";
    description?: string;
  }>;
}) {
  return db.product.upsert({
    where: { barcode: data.barcode },
    create: {
      barcode: data.barcode,
      name: data.name,
      brand: data.brand,
      category: data.category ?? "",
      imageUrl: data.imageUrl,
      nutrition: data.nutrition
        ? { create: data.nutrition }
        : undefined,
      ingredients: data.ingredients
        ? { create: data.ingredients }
        : undefined,
    },
    update: {
      name: data.name,
      brand: data.brand,
      category: data.category ?? undefined,
      imageUrl: data.imageUrl ?? undefined,
    },
    include: { nutrition: true, ingredients: true },
  });
}
