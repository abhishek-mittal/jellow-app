"use client";

import type { Badge, Challenge } from "@/lib/types";
import { ChevronRight, Trophy, Gift } from "lucide-react";
import { motion } from "framer-motion";
import { MotionPage, MotionItem } from "@/components/motion";

/** Demo rewards data — replace with real API data when available. */
const jellyPoints = 2450;

const activeChallenges: Challenge[] = [
  {
    id: "c1",
    title: "Veggie Week",
    description: "5 healthy scans",
    iconEmoji: "🌿",
    progress: 3,
    goal: 5,
    reward: 100,
    expiresAt: "2026-03-18T00:00:00Z",
  },
  {
    id: "c2",
    title: "Streak Master",
    description: "7 days in a row",
    iconEmoji: "🔥",
    progress: 5,
    goal: 7,
    reward: 200,
    expiresAt: "2026-03-20T00:00:00Z",
  },
];

const badges: Badge[] = [
  { id: "b1", title: "First Scan", iconEmoji: "🌟" },
  { id: "b2", title: "Veggie Lover", iconEmoji: "🥗" },
  { id: "b3", title: "Protein Pro", iconEmoji: "👍" },
  { id: "b4", title: "7-Day Streak", iconEmoji: "🎯" },
];

const challengeColors: Record<string, { bg: string; bar: string }> = {
  c1: { bg: "bg-[#E8F5E9]", bar: "bg-accent-green" },
  c2: { bg: "bg-[#FFF3E0]", bar: "bg-s-orange" },
};

export default function RewardsPage() {
  return (
    <MotionPage className="min-h-screen bg-s-gray pb-24">
      <div className="px-5 pt-12 pb-6">
        {/* ── Page Title ── */}
        <MotionItem>
          <h1 className="font-heading text-[28px] font-extrabold text-s-dark-gray">
            Rewards
          </h1>
        </MotionItem>

        {/* ── Jelly Points Card ── */}
        <MotionItem>
          <div className="mt-5 rounded-[var(--r-xl)] bg-s-dark-gray p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-s-orange">
                <Trophy size={26} className="text-white" />
              </div>
              <div>
                <p className="font-heading text-[32px] font-extrabold leading-none text-white">
                  {jellyPoints.toLocaleString()}
                </p>
                <p className="mt-1 text-sm font-medium text-white/60">Jelly Points</p>
              </div>
            </div>
          </div>
        </MotionItem>

        {/* ── Active Challenges ── */}
        <MotionItem>
          <section className="mt-7">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-s-dark-gray">
                Active Challenges
              </h2>
              <button className="text-sm font-semibold text-s-orange">See All</button>
            </div>
            <div className="space-y-3">
              {activeChallenges.map((challenge) => {
                const pct = Math.round((challenge.progress / challenge.goal) * 100);
                const colors = challengeColors[challenge.id] ?? { bg: "bg-gray-100", bar: "bg-s-orange" };
                return (
                  <div
                    key={challenge.id}
                    className="rounded-[var(--r-xl)] bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-[var(--r-md)] ${colors.bg} text-2xl`}
                      >
                        {challenge.iconEmoji}
                      </div>
                      <div className="flex-1">
                        <p className="text-[15px] font-semibold text-s-dark-gray">{challenge.title}</p>
                        <p className="text-sm text-gray-500">{challenge.description}</p>
                      </div>
                      <span className="rounded-full bg-s-orange/10 px-2.5 py-1 text-xs font-bold text-s-orange">
                        +{challenge.reward}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-100">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                          className={`h-full rounded-full ${colors.bar}`}
                        />
                      </div>
                      <span className="text-xs font-medium text-gray-400">{challenge.progress}/{challenge.goal}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </MotionItem>

        {/* ── Your Badges ── */}
        <MotionItem>
          <section className="mt-7">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-heading text-lg font-bold text-s-dark-gray">
                Your Badges
              </h2>
              <button className="text-sm font-semibold text-s-orange">See All</button>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {badges.map((badge) => (
                <div key={badge.id} className="flex w-[72px] flex-col items-center gap-1.5">
                  <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[var(--r-md)] bg-surface-card text-[28px] shadow-sm">
                    {badge.iconEmoji}
                  </div>
                  <p className="w-full text-center text-[11px] font-medium leading-tight text-s-dark-gray">
                    {badge.title}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </MotionItem>

        {/* ── Redeem Points CTA ── */}
        <MotionItem>
          <div className="mt-7 flex items-center gap-4 rounded-[var(--r-xl)] bg-white p-4 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-[var(--r-md)] bg-[#FFF3E0]">
              <Gift size={22} className="text-s-orange" />
            </div>
            <div className="flex-1">
              <p className="text-[15px] font-semibold text-s-dark-gray">Redeem Points</p>
              <p className="text-sm text-gray-500">Exchange for discounts &amp; rewards</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </MotionItem>
      </div>
    </MotionPage>
  );
}
