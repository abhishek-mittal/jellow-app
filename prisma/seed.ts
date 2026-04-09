import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hashPassword } from "better-auth/crypto";

const adapter = new PrismaPg(process.env.DATABASE_URL!);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // ─── Badge Definitions ────────────────────────────────────────────────────
  const badges = [
    {
      title: "First Scan",
      iconEmoji: "🌟",
      description: "Complete your first product scan",
      criteria: { totalScans: 1 },
    },
    {
      title: "Veggie Lover",
      iconEmoji: "🥗",
      description: "Scan 10 healthy vegetable products",
      criteria: { totalScans: 10 },
    },
    {
      title: "Protein Pro",
      iconEmoji: "👍",
      description: "Scan 20 high-protein products",
      criteria: { totalScans: 20 },
    },
    {
      title: "7-Day Streak",
      iconEmoji: "🎯",
      description: "Use Jellow for 7 consecutive days",
      criteria: { streakDays: 7 },
    },
    {
      title: "Health Guru",
      iconEmoji: "🏆",
      description: "Reach 5000 Jelly Points",
      criteria: { jellyPoints: 5000 },
    },
    {
      title: "Scanner Expert",
      iconEmoji: "📱",
      description: "Complete 50 scans",
      criteria: { totalScans: 50 },
    },
    {
      title: "30-Day Warrior",
      iconEmoji: "🔥",
      description: "Maintain a 30-day streak",
      criteria: { streakDays: 30 },
    },
  ];

  for (const badge of badges) {
    await prisma.badgeDefinition.upsert({
      where: { title: badge.title },
      create: badge,
      update: badge,
    });
  }
  console.log(`  ✓ ${badges.length} badge definitions seeded`);

  // ─── Challenge Definitions ────────────────────────────────────────────────
  const challenges = [
    {
      title: "Veggie Week",
      description: "Scan 5 healthy products this week",
      iconEmoji: "🌿",
      goal: 5,
      reward: 100,
      durationDays: 7,
    },
    {
      title: "Streak Master",
      description: "Use Jellow for 7 days in a row",
      iconEmoji: "🔥",
      goal: 7,
      reward: 200,
      durationDays: 10,
    },
    {
      title: "Scan Marathon",
      description: "Scan 15 products in a week",
      iconEmoji: "🏃",
      goal: 15,
      reward: 300,
      durationDays: 7,
    },
    {
      title: "Health Explorer",
      description: "Scan 3 different product categories",
      iconEmoji: "🧭",
      goal: 3,
      reward: 150,
      durationDays: 14,
    },
  ];

  for (const challenge of challenges) {
    await prisma.challengeDefinition.upsert({
      where: { title: challenge.title },
      create: challenge,
      update: challenge,
    });
  }
  console.log(`  ✓ ${challenges.length} challenge definitions seeded`);

  // ─── Seed Products ────────────────────────────────────────────────────────
  const products = [
    {
      barcode: "0049900001018",
      name: "Greek Yogurt",
      brand: "Organic Valley",
      category: "dairy",
      nutrition: {
        calories: 130,
        protein: 15,
        carbs: 9,
        fat: 4,
        fiber: 0,
        sodium: 65,
        servingSize: "170g",
      },
      ingredients: [
        { name: "Organic Milk", safety: "safe" as const, description: "High-quality dairy protein source, rich in calcium." },
        { name: "Live Cultures", safety: "safe" as const, description: "Probiotics that support gut microbiome health." },
        { name: "Organic Honey", safety: "safe" as const, description: "Natural sweetener with trace antioxidants." },
        { name: "Vanilla Extract", safety: "safe" as const, description: "Natural flavoring, no artificial additives." },
      ],
    },
    {
      barcode: "0722252100900",
      name: "Energy Bar",
      brand: "Clif Bar",
      category: "snack",
      nutrition: {
        calories: 240,
        protein: 9,
        carbs: 44,
        fat: 5,
        fiber: 4,
        sodium: 150,
        servingSize: "68g",
      },
      ingredients: [
        { name: "Organic Oats", safety: "safe" as const, description: "Whole grain, good source of fiber." },
        { name: "Brown Rice Syrup", safety: "caution" as const, description: "High glycemic index sweetener." },
        { name: "Cane Syrup", safety: "caution" as const, description: "Added sugar contributing to high overall sugar." },
        { name: "Soy Protein", safety: "safe" as const, description: "Plant-based protein isolate." },
        { name: "Palm Kernel Oil", safety: "caution" as const, description: "High in saturated fat." },
      ],
    },
    {
      barcode: "0852909003015",
      name: "Almond Milk",
      brand: "Califia",
      category: "beverage",
      nutrition: {
        calories: 35,
        protein: 1,
        carbs: 3,
        fat: 2,
        fiber: 0,
        sodium: 160,
        servingSize: "240ml",
      },
      ingredients: [
        { name: "Almonds", safety: "safe" as const, description: "Healthy unsaturated fats." },
        { name: "Filtered Water", safety: "safe" as const, description: "Base ingredient." },
        { name: "Calcium Carbonate", safety: "safe" as const, description: "Added for bone health." },
        { name: "Sunflower Lecithin", safety: "safe" as const, description: "Natural emulsifier." },
        { name: "Carrageenan", safety: "caution" as const, description: "Potential gut irritant in high amounts." },
      ],
    },
  ];

  for (const p of products) {
    await prisma.product.upsert({
      where: { barcode: p.barcode },
      create: {
        barcode: p.barcode,
        name: p.name,
        brand: p.brand,
        category: p.category,
        nutrition: { create: p.nutrition },
        ingredients: { create: p.ingredients },
      },
      update: {
        name: p.name,
        brand: p.brand,
        category: p.category,
      },
    });
  }
  console.log(`  ✓ ${products.length} products seeded`);

  // ─── Test Users ───────────────────────────────────────────────────────────
  const testUsers = [
    {
      name: "Abhishek Mittal",
      email: "abhishek@jellow.app",
      password: "Test@1234",
      image: null,
      stats: { jellyPoints: 1250, totalScans: 34, streakDays: 7 },
    },
    {
      name: "Test User",
      email: "test@jellow.app",
      password: "Test@1234",
      image: null,
      stats: { jellyPoints: 200, totalScans: 5, streakDays: 2 },
    },
  ];

  for (const u of testUsers) {
    const hashedPassword = await hashPassword(u.password);

    const user = await prisma.user.upsert({
      where: { email: u.email },
      create: {
        name: u.name,
        email: u.email,
        emailVerified: true,
        image: u.image,
        stats: { create: u.stats },
      },
      update: { name: u.name },
    });

    // Upsert the "credential" account (Better Auth stores password in Account)
    const existingAccount = await prisma.account.findFirst({
      where: { userId: user.id, providerId: "credential" },
    });

    if (!existingAccount) {
      await prisma.account.create({
        data: {
          userId: user.id,
          accountId: user.id,
          providerId: "credential",
          password: hashedPassword,
        },
      });
    }
  }
  console.log(`  ✓ ${testUsers.length} test users seeded`);
  console.log("    Credentials: email / Test@1234");

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
