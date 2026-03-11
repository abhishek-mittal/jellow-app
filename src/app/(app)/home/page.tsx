import { FoodCard } from "@/components/ui/food-card";
import { StatsCard } from "@/components/ui/stats-card";
import { HealthScoreRing } from "@/components/ui/health-score-ring";
import type { HealthVerdict } from "@/components/ui/health-score-ring";
import { Button } from "@/components/ui/button";
import { seedHistory, seedUser } from "@/lib/seed-data";
import { verdictLevelToVerdict } from "@/lib/verdict";
import { ScanBarcode, Heart, Flame } from "lucide-react";
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
          <p className="text-sm text-j-navy-soft">Good morning,</p>
          <h1 className="font-[var(--font-heading)] text-2xl font-semibold text-j-navy">
            {seedUser.name}
          </h1>
          <div className="mt-1 flex items-center gap-1.5">
            <Flame size={14} className="text-v-caution" />
            <span className="text-sm font-medium text-j-navy-soft">
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
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-j-teal font-[var(--font-heading)] text-sm font-semibold text-white">
            {seedUser.name.charAt(0)}
          </div>
        </div>
      </header>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3">
        <StatsCard
          label="Weekly Scans"
          value={weeklyScans}
          icon={<ScanBarcode size={18} />}
          trend="up"
          trendValue="+5"
        />
        <StatsCard
          label="Healthy Choices"
          value={`${healthyPercent}%`}
          icon={<Heart size={18} />}
          trend="flat"
          trendValue="this week"
        />
        <StatsCard
          label="Day Streak"
          value={seedUser.streakDays}
          icon={<Flame size={18} />}
          trend="up"
          trendValue="+2 days"
        />
      </div>

      {/* Scan CTA */}
      <Link
        href="/scan"
        className="flex items-center gap-4 rounded-[var(--r-lg)] bg-j-teal p-5 transition-colors hover:bg-j-teal-deep"
      >
        <ScanBarcode size={32} className="text-white" />
        <div>
          <p className="font-[var(--font-heading)] text-lg font-semibold text-white">Scan a Product</p>
          <p className="text-sm text-white/70">Check if your food is healthy</p>
        </div>
      </Link>

      {/* Recent Scans */}
      <section>
        <h2 className="mb-3 font-[var(--font-heading)] text-lg font-semibold text-j-navy">Recent Scans</h2>
        <div className="space-y-3">
          {seedHistory.slice(0, 3).map((entry) => (
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
