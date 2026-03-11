import { seedUser } from "@/lib/seed-data";

export default function ProfilePage() {
  return (
    <div className="space-y-6 p-4">
      {/* Avatar + Name */}
      <header className="flex flex-col items-center pt-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-candy-purple/20 text-3xl">
          👤
        </div>
        <h1 className="mt-3 text-xl font-bold text-gray-900">{seedUser.name}</h1>
        <p className="text-sm text-gray-500">Member since 2026</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-2xl bg-white p-3 text-center shadow-card">
          <p className="text-xl font-bold text-gray-900">{seedUser.totalScans}</p>
          <p className="text-xs text-gray-500">Total Scans</p>
        </div>
        <div className="rounded-2xl bg-white p-3 text-center shadow-card">
          <p className="text-xl font-bold text-gray-900">{seedUser.streakDays}</p>
          <p className="text-xs text-gray-500">Day Streak</p>
        </div>
        <div className="rounded-2xl bg-white p-3 text-center shadow-card">
          <p className="text-xl font-bold text-gray-900">{seedUser.badges.length}</p>
          <p className="text-xs text-gray-500">Badges</p>
        </div>
      </div>

      {/* Settings placeholder */}
      <section>
        <h2 className="mb-3 text-lg font-bold text-gray-900">Settings</h2>
        <div className="space-y-2">
          {["Dietary Preferences", "Notifications", "Privacy", "About Jellow"].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-card"
            >
              <span className="text-gray-700">{item}</span>
              <span className="text-gray-400">→</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
