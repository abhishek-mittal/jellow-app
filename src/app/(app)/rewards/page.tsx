"use client";

import { seedUser } from "@/lib/seed-data";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { MotionPage, MotionItem } from "@/components/motion";

// ── Challenge accent colors ────────────────────────────────────────────────

const challengeColors: Record<string, { bg: string; bar: string }> = {
  c1: { bg: "bg-emerald-100", bar: "bg-[#00B4D8]" },
  c2: { bg: "bg-orange-100", bar: "bg-s-orange" },
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function RewardsPage() {
  return (
    <MotionPage className="min-h-screen bg-gradient-to-b from-[#FFF0F5] via-[#FFF5F0] to-[#F8F9FA]">
      <div className="px-5 pt-12 pb-6">
        {/* ── Page Title ── */}
        <MotionItem>
          <h1 className="font-[var(--font-heading)] text-3xl font-bold text-s-dark-gray">
            Rewards
          </h1>
        </MotionItem>

        {/* ── Jelly Points Oval ── */}
        <MotionItem>
          <div className="mt-6 flex justify-center">
            <div className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#A855F7] via-[#C084FC] to-[#E879A8] px-10 py-4 shadow-lg">
              <span className="text-3xl">🏆</span>
              <div>
                <p className="font-[var(--font-heading)] text-4xl font-bold text-white">
                  {seedUser.jellyPoints.toLocaleString()}
                </p>
                <p className="text-sm font-medium text-white/80">Jelly Points</p>
              </div>
            </div>
          </div>
        </MotionItem>

        {/* ── Active Challenges ── */}
        <MotionItem>
          <section className="mt-8">
            <h2 className="mb-3 font-[var(--font-heading)] text-lg font-bold text-s-dark-gray">
              Active Challenges
            </h2>
            <div className="space-y-3">
              {seedUser.activeChallenges.map((challenge) => {
                const pct = Math.round((challenge.progress / challenge.goal) * 100);
                const colors = challengeColors[challenge.id] ?? { bg: "bg-gray-100", bar: "bg-s-orange" };
                return (
                  <div
                    key={challenge.id}
                    className="rounded-[var(--r-xl)] bg-white p-4 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full ${colors.bg} text-2xl`}
                      >
                        {challenge.iconEmoji}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-s-dark-gray">{challenge.title}</p>
                        <p className="text-sm text-gray-500">{challenge.description}</p>
                      </div>
                      <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-600">
                        +{challenge.reward}
                      </span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                        className={`h-full rounded-full ${colors.bar}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </MotionItem>

        {/* ── Your Badges ── */}
        <MotionItem>
          <section className="mt-8">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-[var(--font-heading)] text-lg font-bold text-s-dark-gray">
                Your Badges
              </h2>
              <button className="text-sm font-medium text-[#00B4D8]">See all →</button>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-2">
              {seedUser.badges.map((badge) => (
                <div key={badge.id} className="flex flex-col items-center gap-1.5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-orange-100 text-3xl shadow-sm">
                    {badge.iconEmoji}
                  </div>
                  <p className="w-16 text-center text-xs font-medium text-s-dark-gray">
                    {badge.title}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </MotionItem>

        {/* ── Redeem Points CTA ── */}
        <MotionItem>
          <div className="mt-8 flex items-center gap-4 rounded-[var(--r-xl)] bg-[#FDDCE4] p-5 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#FBC4D4] text-2xl">
              🎁
            </div>
            <div className="flex-1">
              <p className="font-semibold text-s-dark-gray">Redeem Points</p>
              <p className="text-sm text-gray-500">Exchange for discounts &amp; rewards</p>
            </div>
            <ArrowRight size={20} className="text-s-dark-gray" />
          </div>
        </MotionItem>
      </div>
    </MotionPage>
  );
}
