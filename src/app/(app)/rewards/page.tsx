import { BadgeCard } from "@/components/rewards/badge-card";
import { VerdictBadge } from "@/components/ui/verdict-badge";
import { seedUser } from "@/lib/seed-data";

// ── Mock data ──────────────────────────────────────────────────────────────

const LEVEL_XP: Record<number, number> = { 1: 500, 2: 1000, 3: 2000, 4: 3500, 5: 5000 };
const BEST_STREAK = 12;

const lockedBadges = [
  {
    id: "lb1",
    title: "Sugar Slayer",
    iconEmoji: "🚫🍭",
    unlockCriteria: "Avoid 5 high-sugar items",
    progress: 40,
  },
  {
    id: "lb2",
    title: "Scan 100",
    iconEmoji: "📷",
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
  { id: "ra1", icon: "🎯", title: "7-Day Streak", points: 200, earnedAt: "2 days ago" },
  { id: "ra2", icon: "🥗", title: "Veggie Lover badge", points: 50, earnedAt: "5 days ago" },
  { id: "ra3", icon: "💪", title: "Protein Pro badge", points: 50, earnedAt: "1 week ago" },
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
  const prevXp = LEVEL_XP[cappedLevel - 1] ?? 0;
  const nextXp = LEVEL_XP[cappedLevel] ?? LEVEL_XP[maxLevel];
  const current = points - prevXp;
  const target = nextXp - prevXp;
  return { level: cappedLevel, current, target };
}

// ── Page ───────────────────────────────────────────────────────────────────

export default function RewardsPage() {
  const { level, current, target } = getUserLevel(seedUser.jellyPoints);
  const levelProgress = Math.min(100, Math.round((current / target) * 100));

  return (
    <div className="space-y-6 p-4">
      {/* ── Points dashboard ── */}
      <header className="rounded-2xl bg-jellow-yellow p-6 text-center">
        <p className="text-sm font-medium text-gray-700">Your Jelly Points</p>
        <p className="text-4xl font-bold text-gray-900">
          🍬 {seedUser.jellyPoints.toLocaleString()}
        </p>
        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-between text-xs font-medium text-gray-700">
            <span>Level {level}</span>
            <span>
              {current.toLocaleString()} / {target.toLocaleString()} XP
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-yellow-200">
            <div
              className="h-full rounded-full bg-gray-900/30 transition-all"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
          <p className="text-right text-xs text-gray-700">
            {target - current} XP to Level {level + 1}
          </p>
        </div>
      </header>

      {/* ── Streak tracker ── */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Streaks</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white p-4 text-center shadow-[var(--shadow-soft)]">
            <p className="text-3xl font-bold text-candy-orange">
              🔥 {seedUser.streakDays}
            </p>
            <p className="mt-1 text-xs text-gray-500">Current Streak</p>
          </div>
          <div className="rounded-2xl bg-white p-4 text-center shadow-[var(--shadow-soft)]">
            <p className="text-3xl font-bold text-candy-purple">
              🏅 {BEST_STREAK}
            </p>
            <p className="mt-1 text-xs text-gray-500">Best Streak</p>
          </div>
        </div>
      </section>

      {/* ── Badges grid ── */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Badges</h2>
        <div className="grid grid-cols-3 gap-3">
          {seedUser.badges.map((badge) => (
            <BadgeCard
              key={badge.id}
              name={badge.title}
              icon={badge.iconEmoji}
              earned
              earnedDate={badge.earnedAt}
            />
          ))}
          {lockedBadges.map((badge) => (
            <BadgeCard
              key={badge.id}
              name={badge.title}
              icon={badge.iconEmoji}
              earned={false}
              unlockCriteria={badge.unlockCriteria}
              progress={badge.progress}
            />
          ))}
        </div>
      </section>

      {/* ── Active challenges ── */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Challenges</h2>
        <div className="space-y-3">
          {seedUser.activeChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="rounded-2xl bg-white p-4 shadow-[var(--shadow-soft)]"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{challenge.iconEmoji}</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{challenge.title}</p>
                  <p className="text-sm text-gray-500">
                    {challenge.progress}/{challenge.goal} — {challenge.description}
                  </p>
                </div>
                <VerdictBadge level="good" label={`+${challenge.reward}`} />
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

      {/* ── Recent achievements ── */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Recent Achievements</h2>
        <div className="space-y-2">
          {recentAchievements.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-[var(--shadow-soft)]"
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-400">{item.earnedAt}</p>
              </div>
              <span className="text-sm font-bold text-candy-mint">+{item.points}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Redeem points (placeholder) ── */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Redeem Points</h2>
        <div className="rounded-2xl border-2 border-dashed border-gray-200 p-6 text-center">
          <p className="text-3xl">🎁</p>
          <p className="mt-2 font-semibold text-gray-700">Rewards Store</p>
          <p className="mt-1 text-sm text-gray-400">
            Coming soon — redeem your Jelly Points for real rewards!
          </p>
        </div>
      </section>
    </div>
  );
}
