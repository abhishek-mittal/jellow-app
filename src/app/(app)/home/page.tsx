import { FoodCard } from "@/components/ui/food-card";
<<<<<<< HEAD
=======
import { StatsCard } from "@/components/ui/stats-card";
import { HealthScoreRing } from "@/components/ui/health-score-ring";
import type { HealthVerdict } from "@/components/ui/health-score-ring";
import { Button } from "@/components/ui/button";
import { VerdictBadge } from "@/components/ui/verdict-badge";
>>>>>>> origin/copilot/jellow-7-home-dashboard-stats-card
import { seedHistory, seedUser } from "@/lib/seed-data";
import { verdictLevelToVerdict } from "@/lib/verdict";
import Link from "next/link";

// Compute mock dashboard stats from seed data
const weeklyScans = seedUser.totalScans;
const healthyCount = seedHistory.filter(
  (e) => e.product.level === "excellent" || e.product.level === "good"
).length;
const healthyPercent = Math.round((healthyCount / seedHistory.length) * 100);
const avgScore100 =
  seedHistory.reduce((sum, e) => sum + e.product.score, 0) / seedHistory.length;
const healthScore = Math.round(avgScore100 / 10);
const healthVerdict: HealthVerdict =
  healthScore >= 7 ? "good" : healthScore >= 4 ? "moderate" : "bad";

export default function HomePage() {
  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <header className="flex items-center justify-between pt-2">
        <div>
          <p className="text-sm text-gray-500">Good morning,</p>
          <h1 className="text-2xl font-bold text-gray-900">
            {seedUser.name} 👋
          </h1>
          <div className="mt-1 flex items-center gap-1.5">
            <span className="text-sm">🔥</span>
            <span className="text-sm font-semibold text-gray-700">
              {seedUser.streakDays}-day streak
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <HealthScoreRing
            score={healthScore}
            verdict={healthVerdict}
            size="sm"
            showLabel={false}
          />
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-jellow-yellow text-base font-bold text-gray-900">
            {seedUser.name.charAt(0)}
          </div>
        </div>
      </header>

      {/* Jelly Points */}
      <div className="flex items-center justify-between rounded-2xl bg-jellow-yellow/20 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">🍬</span>
          <span className="font-bold text-gray-900">
            {seedUser.jellyPoints.toLocaleString()} Jelly Points
          </span>
        </div>
        <VerdictBadge level="excellent" label="Level 3" />
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <StatsCard
          label="Weekly Scans"
          value={weeklyScans}
          icon={<span className="text-base">📷</span>}
          trend="up"
          trendValue="+5"
        />
        <StatsCard
          label="Healthy Choices"
          value={`${healthyPercent}%`}
          icon={<span className="text-base">💚</span>}
          trend="flat"
          trendValue="this week"
        />
        <StatsCard
          label="Day Streak"
          value={seedUser.streakDays}
          icon={<span className="text-base">🔥</span>}
          trend="up"
          trendValue="+2 days"
        />
      </div>

      {/* Scan CTA */}
      <Link
        href="/scan"
        className="flex items-center gap-4 rounded-2xl bg-jellow-yellow p-5 shadow-card transition-transform active:scale-[0.98]"
      >
        <span className="text-4xl">📷</span>
        <div>
          <p className="text-lg font-bold text-gray-900">Scan a Product</p>
          <p className="text-sm text-gray-700">Check if your food is healthy</p>
        </div>
      </Link>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/history">
          <Button variant="secondary" size="sm" className="w-full">
            📋 View History
          </Button>
        </Link>
        <Link href="/rewards">
          <Button variant="secondary" size="sm" className="w-full">
            🏆 Rewards
          </Button>
        </Link>
      </div>

      {/* Active Challenges */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Active Challenges</h2>
        <div className="space-y-3">
          {seedUser.activeChallenges.map((challenge) => (
            <div key={challenge.id} className="rounded-2xl bg-white p-4 shadow-card">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{challenge.iconEmoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{challenge.title}</p>
                  <p className="text-sm text-gray-500">{challenge.description}</p>
                </div>
                <span className="rounded-full bg-[var(--candy-mint)]/15 px-3 py-1 text-xs font-semibold text-[var(--candy-mint)]">
                  +{challenge.reward} pts
                </span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-candy-mint transition-all"
                  style={{
                    width: `${(challenge.progress / challenge.goal) * 100}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Scans */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Recent Scans</h2>
        <div className="space-y-3">
          {seedHistory.map((entry) => (
            <FoodCard
              key={entry.id}
              food={{
                id: entry.product.id,
                name: entry.product.name,
                brand: entry.product.brand,
                verdict: verdictLevelToVerdict(entry.product.level),
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
