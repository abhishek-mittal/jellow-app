import { db } from "@/lib/db";

/** Award Jelly Points to a user. */
export async function awardPoints(userId: string, amount: number) {
  return db.userStats.upsert({
    where: { userId },
    create: { userId, jellyPoints: amount },
    update: { jellyPoints: { increment: amount } },
  });
}

/** Fetch all earned badges for a user. */
export async function getUserBadges(userId: string) {
  const userBadges = await db.userBadge.findMany({
    where: { userId },
    include: { badge: true },
    orderBy: { earnedAt: "desc" },
  });

  return userBadges.map((ub: (typeof userBadges)[number]) => ({
    id: ub.badge.id,
    title: ub.badge.title,
    iconEmoji: ub.badge.iconEmoji,
    earnedAt: ub.earnedAt.toISOString(),
  }));
}

/** Check badge criteria and award any newly earned badges. */
export async function checkAndAwardBadges(userId: string) {
  const stats = await db.userStats.findUnique({ where: { userId } });
  if (!stats) return [];

  const definitions = await db.badgeDefinition.findMany();
  const existing = await db.userBadge.findMany({
    where: { userId },
    select: { badgeId: true },
  });
  const earnedIds = new Set(existing.map((e: (typeof existing)[number]) => e.badgeId));

  const newBadges: string[] = [];

  for (const def of definitions) {
    if (earnedIds.has(def.id)) continue;

    const criteria = def.criteria as Record<string, number> | null;
    if (!criteria) continue;

    let earned = true;
    if (criteria.totalScans && stats.totalScans < criteria.totalScans)
      earned = false;
    if (criteria.streakDays && stats.streakDays < criteria.streakDays)
      earned = false;
    if (criteria.jellyPoints && stats.jellyPoints < criteria.jellyPoints)
      earned = false;

    if (earned) {
      await db.userBadge.create({ data: { userId, badgeId: def.id } });
      newBadges.push(def.id);
    }
  }

  return newBadges;
}

/** Fetch active (incomplete) challenges for a user. */
export async function getActiveChallenges(userId: string) {
  const challenges = await db.userChallenge.findMany({
    where: { userId, completedAt: null },
    include: { challenge: true },
    orderBy: { startedAt: "desc" },
  });

  return challenges.map((uc: (typeof challenges)[number]) => ({
    id: uc.challenge.id,
    title: uc.challenge.title,
    description: uc.challenge.description,
    iconEmoji: uc.challenge.iconEmoji,
    progress: uc.progress,
    goal: uc.challenge.goal,
    reward: uc.challenge.reward,
    expiresAt: new Date(
      uc.startedAt.getTime() + uc.challenge.durationDays * 86400000
    ).toISOString(),
  }));
}

/** Update challenge progress and complete if goal is met. */
export async function updateChallengeProgress(
  userId: string,
  challengeId: string,
  increment = 1
) {
  const uc = await db.userChallenge.findUnique({
    where: { userId_challengeId: { userId, challengeId } },
    include: { challenge: true },
  });

  if (!uc || uc.completedAt) return null;

  const newProgress = Math.min(uc.progress + increment, uc.challenge.goal);
  const completed = newProgress >= uc.challenge.goal;

  const updated = await db.userChallenge.update({
    where: { userId_challengeId: { userId, challengeId } },
    data: {
      progress: newProgress,
      completedAt: completed ? new Date() : undefined,
    },
  });

  // Award points on completion
  if (completed) {
    await awardPoints(userId, uc.challenge.reward);
  }

  return updated;
}

/** Assign a new challenge to a user. */
export async function assignChallenge(userId: string, challengeId: string) {
  return db.userChallenge.create({
    data: { userId, challengeId },
  });
}
