import { seedUser } from "@/lib/seed-data";
import { Card, CardBody } from "@/components/ui/card";

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
        <Card shadow="none" radius="lg" className="border border-j-stone bg-j-warm-white">
          <CardBody className="p-3 text-center">
            <p className="font-[var(--font-heading)] text-xl font-semibold text-j-navy">{seedUser.totalScans}</p>
            <p className="text-xs text-j-navy-soft">Total Scans</p>
          </CardBody>
        </Card>
        <Card shadow="none" radius="lg" className="border border-j-stone bg-j-warm-white">
          <CardBody className="p-3 text-center">
            <p className="font-[var(--font-heading)] text-xl font-semibold text-j-navy">{seedUser.streakDays}</p>
            <p className="text-xs text-j-navy-soft">Day Streak</p>
          </CardBody>
        </Card>
        <Card shadow="none" radius="lg" className="border border-j-stone bg-j-warm-white">
          <CardBody className="p-3 text-center">
            <p className="font-[var(--font-heading)] text-xl font-semibold text-j-navy">{seedUser.badges.length}</p>
            <p className="text-xs text-j-navy-soft">Badges</p>
          </CardBody>
        </Card>
      </div>

      {/* Settings placeholder */}
      <section>
        <h2 className="mb-3 font-[var(--font-heading)] text-lg font-semibold text-j-navy">Settings</h2>
        <div className="space-y-2">
          {["Dietary Preferences", "Notifications", "Privacy", "About Jellow"].map((item) => (
            <Card key={item} shadow="none" radius="lg" className="border border-j-stone bg-j-warm-white">
              <CardBody className="flex-row items-center justify-between p-4">
                <span className="text-j-navy">{item}</span>
                <span className="text-j-navy-soft">→</span>
              </CardBody>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
