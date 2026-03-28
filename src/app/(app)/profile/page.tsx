"use client";

import { useRouter } from "next/navigation";
import { seedUser } from "@/lib/seed-data";
import { Button } from "@/components/ui/button";
import {
  Camera,
  Bell,
  Shield,
  Info,
  ChevronRight,
  LogOut,
  Heart,
  Utensils,
  Target,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  MotionPage,
  MotionItem,
  MotionPress,
  spring,
  staggerContainer,
  fadeInUp,
} from "@/components/motion";

/* ─── Helper rows ─────────────────────────────────────────────────── */

function PreferenceRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <MotionPress className="block w-full">
      <div className="flex items-center gap-3 rounded-[var(--r-xl)] bg-white p-3 shadow-md">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--r-lg)] bg-s-orange/20 text-s-orange">
          {icon}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-s-dark-gray">{label}</p>
          <p className="text-sm font-bold text-s-dark-gray">{value}</p>
        </div>
        <ChevronRight size={16} className="shrink-0 text-s-dark-gray" />
      </div>
    </MotionPress>
  );
}

function SettingsRow({
  icon,
  label,
  isLast,
}: {
  icon: React.ReactNode;
  label: string;
  isLast?: boolean;
}) {
  return (
    <MotionPress className="block w-full">
      <div
        className={`flex w-full items-center gap-3 p-4${
          isLast ? "" : " border-b border-black/[0.04]"
        }`}
      >
        <span className="text-s-dark-gray">{icon}</span>
        <span className="flex-1 text-sm font-medium text-s-dark-gray">{label}</span>
        <ChevronRight size={16} className="text-s-dark-gray" />
      </div>
    </MotionPress>
  );
}

/* ─── Page ────────────────────────────────────────────────────────── */

export default function ProfilePage() {
  const router = useRouter();

  /** Calls the sign-out API, then redirects to the sign-in page.
   * We redirect regardless of API errors: if the server-side cookie clear
   * fails the middleware will redirect the user back to sign-in anyway. */
  async function handleSignOut() {
    try {
      await fetch("/api/v1/auth/sign-out", { method: "POST" });
    } catch {
      // Continue regardless — middleware enforces the guard
    }
    router.push("/auth/sign-in");
  }

  return (
    <MotionPage className="min-h-screen">
      {/* ── Gradient Hero with Avatar ── */}
      <MotionItem>
        <div className="gradient-hero relative overflow-hidden rounded-b-[var(--r-2xl)] px-5 pb-10 pt-12">
          <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
          <div className="pointer-events-none absolute -left-4 bottom-4 h-20 w-20 rounded-full bg-white/5" />

          <div className="relative flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={spring.bouncy}
              className="relative"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/30 bg-white/20 font-[var(--font-heading)] text-3xl font-bold text-white">
                {seedUser.name.charAt(0)}
              </div>
              <button
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/30 bg-white text-s-dark-gray shadow-sm"
                aria-label="Change photo"
              >
                <Camera size={14} />
              </button>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, ...spring.gentle }}
              className="mt-4 font-[var(--font-heading)] text-xl font-bold text-white"
            >
              {seedUser.name}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-sm text-white/60"
            >
              Member since 2026
            </motion.p>
          </div>
        </div>
      </MotionItem>

      <div className="space-y-5 px-5 pt-5 pb-6">
        {/* ── Points + Stats card ── */}
        <MotionItem>
          <div className="rounded-[var(--r-xl)] bg-white p-4 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-s-orange" />
                  <p className="text-xs font-medium text-s-dark-gray">Jelly Points</p>
                </div>
                <p className="font-[var(--font-heading)] text-2xl font-bold text-s-orange">
                  {seedUser.jellyPoints.toLocaleString()}
                </p>
              </div>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex gap-6 text-center"
              >
                {[
                  { value: seedUser.totalScans, label: "Scans" },
                  { value: seedUser.streakDays, label: "Streak" },
                  { value: seedUser.badges.length, label: "Badges" },
                ].map((stat) => (
                  <motion.div key={stat.label} variants={fadeInUp} transition={spring.gentle}>
                    <p className="font-[var(--font-heading)] text-lg font-bold text-s-dark-gray">
                      {stat.value}
                    </p>
                    <p className="text-xs font-medium text-s-dark-gray">{stat.label}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </MotionItem>

        {/* ── Dietary Preferences ── */}
        <MotionItem>
          <section>
            <h2 className="mb-3 font-[var(--font-heading)] text-base font-bold text-s-dark-gray">
              My Preferences
            </h2>
            <div className="space-y-2">
              <PreferenceRow icon={<Utensils size={16} />} label="Diet" value="Omnivore" />
              <PreferenceRow icon={<Heart size={16} />} label="Allergies" value="None set" />
              <PreferenceRow icon={<Target size={16} />} label="Goals" value="General Wellness" />
            </div>
          </section>
        </MotionItem>

        {/* ── Settings ── */}
        <MotionItem>
          <section>
            <h2 className="mb-3 font-[var(--font-heading)] text-base font-bold text-s-dark-gray">
              Settings
            </h2>
            <div className="overflow-hidden rounded-[var(--r-xl)] bg-white shadow-md">
              <SettingsRow icon={<Bell size={16} />} label="Notifications" />
              <SettingsRow icon={<Shield size={16} />} label="Privacy" />
              <SettingsRow icon={<Info size={16} />} label="About Jellow" isLast />
            </div>
          </section>
        </MotionItem>

        {/* ── Sign Out ── */}
        <MotionItem>
          <MotionPress>
            <Button
              variant="ghost"
              size="md"
              className="w-full text-v-avoid"
              onClick={handleSignOut}
            >
              <LogOut size={16} className="mr-2" />
              Sign Out
            </Button>
          </MotionPress>
        </MotionItem>

        {/* ── Version ── */}
        <MotionItem>
          <p className="text-center text-xs text-s-dark-gray/60">Jellow v0.1.0 (alpha)</p>
        </MotionItem>
      </div>
    </MotionPage>
  );
}
