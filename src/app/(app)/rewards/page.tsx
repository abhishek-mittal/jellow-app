import { seedUser } from "@/lib/seed-data";

export default function RewardsPage() {
  return (
    <div className="space-y-6 p-4">
      {/* Points Header */}
      <header className="rounded-2xl bg-jellow-yellow p-6 text-center">
        <p className="text-sm font-medium text-gray-700">Your Jelly Points</p>
        <p className="text-4xl font-bold text-gray-900">
          🍬 {seedUser.jellyPoints.toLocaleString()}
        </p>
      </header>

      {/* Badges */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Badges Earned</h2>
        <div className="grid grid-cols-4 gap-3">
          {seedUser.badges.map((badge) => (
            <div
              key={badge.id}
              className="flex flex-col items-center rounded-2xl bg-white p-3 shadow-card"
            >
              <span className="text-3xl">{badge.iconEmoji}</span>
              <p className="mt-1 text-center text-xs font-medium text-gray-700">
                {badge.title}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Active Challenges */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Challenges</h2>
        <div className="space-y-3">
          {seedUser.activeChallenges.map((challenge) => (
            <div key={challenge.id} className="rounded-2xl bg-white p-4 shadow-card">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{challenge.iconEmoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{challenge.title}</p>
                  <p className="text-sm text-gray-500">
                    {challenge.progress}/{challenge.goal} — {challenge.description}
                  </p>
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
    </div>
  );
}
