import { FoodCard } from "@/components/ui/food-card";
import { seedHistory, seedUser } from "@/lib/seed-data";
import { verdictLevelToVerdict } from "@/lib/verdict";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-6 p-4">
      {/* Header */}
      <header className="flex items-center justify-between pt-2">
        <div>
          <p className="text-sm text-gray-500">Good morning,</p>
          <h1 className="text-2xl font-bold text-gray-900">{seedUser.name} 👋</h1>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-jellow-yellow/20 px-3 py-1.5">
          <span className="text-sm">🍬</span>
          <span className="text-sm font-bold text-gray-900">
            {seedUser.jellyPoints.toLocaleString()}
          </span>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-white p-3 text-center shadow-card">
          <p className="text-2xl font-bold text-candy-mint">{seedUser.totalScans}</p>
          <p className="text-xs text-gray-500">Scans</p>
        </div>
        <div className="rounded-2xl bg-white p-3 text-center shadow-card">
          <p className="text-2xl font-bold text-candy-orange">🔥 {seedUser.streakDays}</p>
          <p className="text-xs text-gray-500">Day Streak</p>
        </div>
        <div className="rounded-2xl bg-white p-3 text-center shadow-card">
          <p className="text-2xl font-bold text-candy-purple">{seedUser.badges.length}</p>
          <p className="text-xs text-gray-500">Badges</p>
        </div>
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
                  style={{ width: `${(challenge.progress / challenge.goal) * 100}%` }}
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
