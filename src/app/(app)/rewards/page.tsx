"use client";

import { BadgeCard } from "@/components/rewards/badge-card";
import { seedUser } from "@/lib/seed-data";
import { Flame, Trophy, Sparkles, Star } from "lucide-react";
import { motion } from "framer-motion";
import {
  MotionPage,
  MotionItem,
  spring,
  staggerContainer,
  fadeInUp,
} from "@/components/motion";

// ── Mock data ──────────────────────────────────────────────────────────────

const LEVEL_XP: Record<number, number> = { 1: 500, 2: 1000, 3: 2000, 4: 3500, 5: 5000 };
const BEST_STREAK = 12;

const lockedBadges = [
  {
    id: "lb1",
    title: "Sugar Slayer",
    iconEmoji: "🍬",
    unlockCriteria: "Avoid 5 high-sugar items",
    progress: 40,
  },
  {
    id: "lb2",
    title: "Scan 100",
    iconEmoji: "📱",
    unlockCriteria: "Scan 100 products",
    progress: Math.round((seedUser.totalScans / 100) * 100),
  },
  {
    id: "lb3",
    title: "Omega Hero",
    iconEmoji: "🐟",
    unlockCriteria: "Log 10 omega-3 foods",
    progress: 20,
  },
  {
    id: "lb4",
    title: "Month Streak",
    iconEmoji: "📅",
    unlockCriteria: "30-day scan streak",
    progress: Math.round((seedUser.streakDays / 30) * 100),
  },
];

const recentAchievements = [
  { id: "ra1", title: "7-Day Streak", points: 200, earnedAt: "2 days ago" },
  { id: "ra2", title: "Veggie Lover badge", points: 50, earnedAt: "5 days ago" },
  { id: "ra3", title: "Protein Pro badge", points: 50, earnedAt: "1 week ago" },
];

// ── Helpers ────────────────────────────────────────────────────────────────

function getUserLevel(points: number): { level: number; current: number; target: number } {
  const thresholds = Object.entries(LEVEL_XP).map(([lvl, xp]) => ({
    level: Number(lvl),
    xp,
  }));
  const maxLevel = thresholds[thresholds.length - 1].level;
  const achieved = thresholds.filter(({ xp }) => points >= xp);
  const level = achieved.length > 0 ? achieved[achieved.length - 1].level : 0;
  const cappedLevel = Math.min(level, maxLevel);
  const prevXp = LEVEL_XP[cappedLevel] ?? 0;
  const nextXp = LEVEL_XP[cappedLevel + 1] ?? LEVEL_XP[maxLevel];
  const current = points - prevXp;
  const target = nextXp - prevXp;
  return { level: cappedLevel, current, target };
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function RewardsPage() {
  const { level, current, target } = getUserLevel(seedUser.jellyPoints);
  const levelProgress = Math.min(100, Math.round((current / target) * 100));

  return (
    <MotionPage className="min-h-screen">
      {/* ── Gradient Hero Header with Points ── */}
      <MotionItem>
        <div className="gradient-hero relative overflow-hidden rounded-b-[var(--r-2xl)] px-5 pb-8 pt-12">
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -left-4 bottom-4 h-20 w-20 rounded-full bg-white/5" />

          <div className="relative">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-amber-300" />
              <p className="text-sm font-medium text-white/70">Your Points</p>
            </div>
            <p className="font-[var(--font-heading)] text-5xl font-bold text-white">
              {seedUser.jellyPoints.toLocaleString()}
            </p>

            <div className="mt-5 space-y-2">
              <div className="flex items-center justify-between text-xs font-medium text-white/70">
                <span className="flex items-center gap-1">
                  <Star size={12} className="text-amber-300" />
                  Level {level}
                </span>
                <span>
                  {current.toLocaleString()} / {target.toLocaleString()} XP
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/20">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${levelProgress}%` }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                  className="h-full rounded-full bg-white"
                />
              </div>
              <p className="text-right text-xs text-white/60">
                {target - current} XP to Level {level + 1}
              </p>
            </div>
          </div>
        </div>
      </MotionItem>

      <div className="space-y-5 px-5 pt-5 pb-6">
        {/* ── Streak tracker ── */}
        <MotionItem>
          <section>
            <h2 className="mb-3 font-[var(--font-heading)] text-lg font-bold text-s-dark-gray">Streaks</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-[var(--r-xl)] bg-white p-4 text-center shadow-md">
                <div className="flex items-center justify-center gap-1.5">
                  <Flame size={22} className="text-v-caution" />
                  <p className="font-[var(--font-heading)] text-3xl font-bold text-s-dark-gray">
                    {seedUser.streakDays}
                  </p>
                </div>
                <p className="mt-1 text-xs font-medium text-s-dark-gray">Current Streak</p>
              </div>
              <div className="rounded-[var(--r-xl)] bg-white p-4 text-center shadow-md">
                <div className="flex items-center justify-center gap-1.5">
                  <Trophy size={22} className="text-s-orange" />
                  <p className="font-[var(--font-heading)] text-3xl font-bold text-s-dark-gray">
                    {BEST_STREAK}
                  </p>
                </div>
                <p className="mt-1 text-xs font-medium text-s-dark-gray">Best Streak</p>
              </div>
            </div>
          </section>
        </MotionItem>

        {/* ── Badges grid ── */}
        <MotionItem>
          <section>
            <h2 className="mb-3 font-[var(--font-heading)] text-lg font-bold text-s-dark-gray">Badges</h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-3"
            >
              {seedUser.badges.map((badge) => (
                <motion.div key={badge.id} variants={fadeInUp} transition={spring.gentle}>
                  <BadgeCard
                    name={badge.title}
                    icon={badge.iconEmoji}
                    earned
                    earnedDate={badge.earnedAt}
                  />
                </motion.div>
              ))}
              {lockedBadges.map((badge) => (
                <motion.div key={badge.id} variants={fadeInUp} transition={spring.gentle}>
                  <BadgeCard
                    name={badge.title}
                    icon={badge.iconEmoji}
                    earned={false}
                    unlockCriteria={badge.unlockCriteria}
                    progress={badge.progress}
                  />
                </motion.div>
              ))}
            </motion.div>
          </section>
        </MotionItem>

        {/* ── Active challenges ── */}
        <MotionItem>
          <section>
            <h2 className="mb-3 font-[var(--font-heading)] text-lg font-bold text-s-dark-gray">Challenges</h2>
            <div className="space-y-3">
              {seedUser.activeChallenges.map((challenge) => {
                const pct = Math.round((challenge.progress / challenge.goal) * 100);
                return (
                  <div
                    key={challenge.id}
                    className="rounded-[var(--r-xl)] bg-white p-4 shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-[var(--r-lg)] bg-s-orange/20 text-lg">
                        {challenge.iconEmoji}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-s-dark-gray">{challenge.title}</p>
                        <p className="text-sm text-s-dark-gray">
                          {challenge.progress}/{challenge.goal} — {challenge.description}
                        </p>
                      </div>
                      <span className="rounded-full bg-s-orange/20 px-2.5 py-1 text-xs font-bold text-s-orange">
                        +{challenge.reward}
                      </span>
                    </div>
                    <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-gray-200">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        className="h-full rounded-full bg-s-orange"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </MotionItem>

        {/* ── Recent achievements ── */}
        <MotionItem>
          <section>
            <h2 className="mb-3 font-[var(--font-heading)] text-lg font-bold text-s-dark-gray">Recent Achievements</h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="space-y-2"
            >
              {recentAchievements.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  transition={spring.gentle}
                  className="flex items-center gap-3 rounded-[var(--r-xl)] bg-white p-3 shadow-md"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-[var(--r-lg)] bg-s-orange/20 text-s-orange">
                    <Trophy size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-s-dark-gray">{item.title}</p>
                    <p className="text-xs text-s-dark-gray">{item.earnedAt}</p>
                  </div>
                  <span className="text-sm font-bold text-s-orange">+{item.points}</span>
                </motion.div>
              ))}
            </motion.div>
          </section>
        </MotionItem>
      </div>
    </MotionPage>
  );
}
