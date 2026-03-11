import { BadgeCard } from "@/components/rewards/badge-card";
import { seedUser } from "@/lib/seed-data";
import { Flame, Trophy } from "lucide-react";

// ── Mock data ──────────────────────────────────────────────────────────────

const LEVEL_XP: Record<number, number> = { 1: 500, 2: 1000, 3: 2000, 4: 3500, 5: 5000 };
const BEST_STREAK = 12;

const lockedBadges = [
  {
    id: "lb1",
    title: "Sugar Slayer",
    iconEmoji: "SS",
    unlockCriteria: "Avoid 5 high-sugar items",
    progress: 40,
  },
  {
    id: "lb2",
    title: "Scan 100",
    iconEmoji: "S1",
    unlockCriteria: "Scan 100 products",
    progress: Math.round((seedUser.totalScans / 100) * 100),
  },
  {
    id: "lb3",
    title: "Omega Hero",
    iconEmoji: "OH",
    unlockCriteria: "Log 10 omega-3 foods",
    progress: 20,
  },
  {
    id: "lb4",
    title: "Month Streak",
    iconEmoji: "MS",
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
      <header className="rounded-[var(--r-lg)] border border-j-stone bg-j-warm-white p-6">
        <p className="text-sm font-medium text-j-navy-soft">Your Points</p>
        <p className="font-[var(--font-heading)] text-4xl font-semibold text-j-navy">
          {seedUser.jellyPoints.toLocaleString()}
        </p>
        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-between text-xs font-medium text-j-navy-soft">
            <span>Level {level}</span>
            <span>
              {current.toLocaleString()} / {target.toLocaleString()} XP
            </span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-j-stone">
            <div
              className="h-full rounded-full bg-j-teal transition-all"
              style={{ width: `${levelProgress}%` }}
            />
          </div>
          <p className="text-right text-xs text-j-navy-soft">
            {target - current} XP to Level {level + 1}
          </p>
        </div>
      </header>

      {/* ── Streak tracker ── */}
      <section>
        <h2 className="mb-3 font-[var(--font-heading)] text-lg font-semibold text-j-navy">Streaks</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-[var(--r-lg)] border border-j-stone bg-j-warm-white p-4 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Flame size={20} className="text-v-caution" />
              <p className="font-[var(--font-heading)] text-3xl font-semibold text-j-navy">
                {seedUser.streakDays}
              </p>
            </div>
            <p className="mt-1 text-xs text-j-navy-soft">Current Streak</p>
          </div>
          <div className="rounded-[var(--r-lg)] border border-j-stone bg-j-warm-white p-4 text-center">
            <div className="flex items-center justify-center gap-1.5">
              <Trophy size={20} className="text-j-teal" />
              <p className="font-[var(--font-heading)] text-3xl font-semibold text-j-navy">
                {BEST_STREAK}
              </p>
            </div>
            <p className="mt-1 text-xs text-j-navy-soft">Best Streak</p>
          </div>
        </div>
      </section>

      {/* ── Badges grid ── */}
      <section>
        <h2 className="mb-3 font-[var(--font-heading)] text-lg font-semibold text-j-navy">Badges</h2>
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
        <h2 className="mb-3 font-[var(--font-heading)] text-lg font-semibold text-j-navy">Challenges</h2>
        <div className="space-y-3">
          {seedUser.activeChallenges.map((challenge) => (
            <div
              key={challenge.id}
              className="rounded-[var(--r-lg)] border border-j-stone bg-j-warm-white p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-[var(--r-sm)] bg-j-teal-soft text-j-teal">
                  <Trophy size={18} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-j-navy">{challenge.title}</p>
                  <p className="text-sm text-j-navy-soft">
                    {challenge.progress}/{challenge.goal} — {challenge.description}
                  </p>
                </div>
                <span className="rounded-[var(--r-sm)] bg-j-teal-soft px-3 py-1 text-xs font-semibold text-j-teal">
                  +{challenge.reward} pts
                </span>
              </div>
              <div className="mt-3 h-1 overflow-hidden rounded-full bg-j-stone">
                <div
                  className="h-full rounded-full bg-j-teal transition-all"
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
        <h2 className="mb-3 font-[var(--font-heading)] text-lg font-semibold text-j-navy">Recent Achievements</h2>
        <div className="space-y-2">
          {recentAchievements.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-[var(--r-lg)] border border-j-stone bg-j-warm-white p-3"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-[var(--r-sm)] bg-j-teal-soft text-j-teal">
                <Trophy size={14} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-j-navy">{item.title}</p>
                <p className="text-xs text-j-navy-soft">{item.earnedAt}</p>
              </div>
              <span className="text-sm font-semibold text-j-teal">+{item.points}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
