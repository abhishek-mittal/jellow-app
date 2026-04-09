import { db } from "@/lib/db";

/** Record a new product scan for a user. */
export async function createScan(userId: string, productId: string) {
  const [scan] = await db.$transaction([
    db.scan.create({ data: { userId, productId } }),
    db.userStats.upsert({
      where: { userId },
      create: { userId, totalScans: 1, jellyPoints: 10 },
      update: {
        totalScans: { increment: 1 },
        jellyPoints: { increment: 10 },
      },
    }),
  ]);

  return scan;
}

/** Fetch paginated scan history for a user. */
export async function getScanHistory(
  userId: string,
  limit = 20,
  offset = 0
) {
  const scans = await db.scan.findMany({
    where: { userId },
    orderBy: { scannedAt: "desc" },
    take: limit,
    skip: offset,
    include: {
      product: {
        include: { verdict: { select: { score: true, level: true } } },
      },
    },
  });

  return scans.map((s: (typeof scans)[number]) => ({
    id: s.id,
    product: {
      id: s.product.id,
      name: s.product.name,
      brand: s.product.brand,
      score: s.product.verdict?.score ?? 0,
      level: s.product.verdict?.level ?? "caution",
    },
    scannedAt: s.scannedAt.toISOString(),
  }));
}
