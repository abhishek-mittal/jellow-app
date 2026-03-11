import { seedUser } from "@/lib/seed-data";

export default function ProfilePage() {
  return (
    <div className="space-y-6 p-4">
      {/* Avatar + Name */}
      <header className="flex flex-col items-center pt-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-j-teal-soft font-[var(--font-heading)] text-2xl font-semibold text-j-teal">
          {seedUser.name.charAt(0)}
        </div>
        <h1 className="mt-3 font-[var(--font-heading)] text-xl font-semibold text-j-navy">{seedUser.name}</h1>
        <p className="text-sm text-j-navy-soft">Member since 2026</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-[var(--r-lg)] border border-j-stone bg-j-warm-white p-3 text-center">
          <p className="font-[var(--font-heading)] text-xl font-semibold text-j-navy">{seedUser.totalScans}</p>
          <p className="text-xs text-j-navy-soft">Total Scans</p>
        </div>
        <div className="rounded-[var(--r-lg)] border border-j-stone bg-j-warm-white p-3 text-center">
          <p className="font-[var(--font-heading)] text-xl font-semibold text-j-navy">{seedUser.streakDays}</p>
          <p className="text-xs text-j-navy-soft">Day Streak</p>
        </div>
        <div className="rounded-[var(--r-lg)] border border-j-stone bg-j-warm-white p-3 text-center">
          <p className="font-[var(--font-heading)] text-xl font-semibold text-j-navy">{seedUser.badges.length}</p>
          <p className="text-xs text-j-navy-soft">Badges</p>
        </div>
      </div>

      {/* Settings placeholder */}
      <section>
        <h2 className="mb-3 font-[var(--font-heading)] text-lg font-semibold text-j-navy">Settings</h2>
        <div className="space-y-2">
          {["Dietary Preferences", "Notifications", "Privacy", "About Jellow"].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-[var(--r-lg)] border border-j-stone bg-j-warm-white p-4"
            >
              <span className="text-j-navy">{item}</span>
              <span className="text-j-navy-soft">→</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
