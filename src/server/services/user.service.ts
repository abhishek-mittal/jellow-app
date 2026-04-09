import { db } from "@/lib/db";

/** Fetch full user profile including stats, badges, and active challenges. */
export async function getUserProfile(userId: string) {
  const user = await db.user.findUnique({
    where: { id: userId },
    include: {
      stats: true,
      badges: { include: { badge: true }, orderBy: { earnedAt: "desc" } },
      challenges: {
        where: { completedAt: null },
        include: { challenge: true },
        orderBy: { startedAt: "desc" },
      },
    },
  });

  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    avatarUrl: user.image,
    jellyPoints: user.stats?.jellyPoints ?? 0,
    totalScans: user.stats?.totalScans ?? 0,
    streakDays: user.stats?.streakDays ?? 0,
    badges: user.badges.map((ub: (typeof user.badges)[number]) => ({
      id: ub.badge.id,
      title: ub.badge.title,
      iconEmoji: ub.badge.iconEmoji,
      earnedAt: ub.earnedAt.toISOString(),
    })),
    activeChallenges: user.challenges.map((uc: (typeof user.challenges)[number]) => ({
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
    })),
  };
}

/** Update user profile fields (name, image). */
export async function updateUserProfile(
  userId: string,
  data: { name?: string; image?: string }
) {
  return db.user.update({ where: { id: userId }, data });
}

/** Upsert user preferences (onboarding data). */
export async function saveUserPreferences(
  userId: string,
  prefs: {
    dietaryPreference?: string;
    allergies?: string[];
    healthGoals?: string[];
    onboardingCompleted?: boolean;
  }
) {
  const data = {
    dietaryPreference: prefs.dietaryPreference as
      | "omnivore"
      | "vegetarian"
      | "vegan"
      | "pescatarian"
      | undefined,
    allergies: prefs.allergies,
    healthGoals: prefs.healthGoals,
    onboardingCompleted: prefs.onboardingCompleted,
  };

  return db.userPreferences.upsert({
    where: { userId },
    create: { userId, ...data },
    update: data,
  });
}

/** Fetch user preferences. */
export async function getUserPreferences(userId: string) {
  return db.userPreferences.findUnique({ where: { userId } });
}

/** Update daily streak — increment if consecutive, reset if not. */
export async function updateStreak(userId: string) {
  const stats = await db.userStats.findUnique({ where: { userId } });
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (!stats) {
    return db.userStats.create({
      data: { userId, streakDays: 1, lastActiveDate: today },
    });
  }

  if (!stats.lastActiveDate) {
    return db.userStats.update({
      where: { userId },
      data: { streakDays: 1, lastActiveDate: today },
    });
  }

  const lastActive = new Date(stats.lastActiveDate);
  lastActive.setHours(0, 0, 0, 0);
  const diffDays = Math.floor(
    (today.getTime() - lastActive.getTime()) / 86400000
  );

  if (diffDays === 0) return stats; // Already active today
  if (diffDays === 1) {
    return db.userStats.update({
      where: { userId },
      data: { streakDays: stats.streakDays + 1, lastActiveDate: today },
    });
  }
  // Streak broken
  return db.userStats.update({
    where: { userId },
    data: { streakDays: 1, lastActiveDate: today },
  });
}
