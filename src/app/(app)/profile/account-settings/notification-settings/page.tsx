"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MotionPage, MotionItem, spring } from "@/components/motion";
import {
  Bell,
  ChevronLeft,
  Download,
  BarChart3,
  AlertCircle,
} from "lucide-react";

export default function NotificationSettingsPage() {
  const router = useRouter();
  const [pushNotifications, setPushNotifications] = useState(true);
  const [aiCoachNotification, setAiCoachNotification] = useState(false);
  const [metricsNotification, setMetricsNotification] = useState(true);
  const [vibrations, setVibrations] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [offers, setOffers] = useState(false);
  const [appUpdate, setAppUpdate] = useState(true);
  const [resources, setResources] = useState(false);

  const handleSaveSettings = () => {
    // TODO: Save notification settings to backend
    router.back();
  };

  return (
    <MotionPage className="min-h-screen bg-s-cream pb-24">
      {/* ─── Header ─── */}
      <MotionItem>
        <div className="flex items-center gap-3 px-5 pb-4 pt-12">
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-s-gray/20 text-s-black active:bg-s-gray/30"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-[22px] font-extrabold text-s-black">
            Notification Settings
          </h1>
        </div>
      </MotionItem>

      {/* ─── Content ─── */}
      <main className="flex flex-col gap-5 px-4 pt-6">
        {/* General Section */}
        <MotionItem>
          <div className="rounded-3xl bg-white p-5">
            <h2 className="mb-4 flex items-center justify-between text-[16px] font-bold text-s-black">
              General
              <span className="text-s-gray">⋮</span>
            </h2>
            <div className="flex flex-col gap-3">
              {/* Push Notifications Toggle */}
              <div className="flex items-center justify-between rounded-2xl bg-s-gray/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-s-black">
                    <Bell size={18} className="text-white" />
                  </div>
                  <span className="font-semibold text-s-black">
                    Push Notifications
                  </span>
                </div>
                <button
                  onClick={() => setPushNotifications(!pushNotifications)}
                  className={`relative h-8 w-14 rounded-full transition-colors ${
                    pushNotifications ? "bg-s-orange" : "bg-s-gray/50"
                  }`}
                  aria-label="Toggle push notifications"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      x: pushNotifications ? 24 : 4,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 h-6 w-6 rounded-full bg-white"
                  />
                </button>
              </div>

              {/* AI Coach Notification Toggle */}
              <div className="flex items-center justify-between rounded-2xl bg-s-gray/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-s-black">
                    <AlertCircle size={18} className="text-white" />
                  </div>
                  <span className="font-semibold text-s-black">
                    AI Coach Notification
                  </span>
                </div>
                <button
                  onClick={() => setAiCoachNotification(!aiCoachNotification)}
                  className={`relative h-8 w-14 rounded-full transition-colors ${
                    aiCoachNotification ? "bg-s-orange" : "bg-s-gray/50"
                  }`}
                  aria-label="Toggle AI coach notification"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      x: aiCoachNotification ? 24 : 4,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 h-6 w-6 rounded-full bg-white"
                  />
                </button>
              </div>

              {/* Metrics Notification Toggle */}
              <div className="flex items-center justify-between rounded-2xl bg-s-gray/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-s-black">
                    <BarChart3 size={18} className="text-white" />
                  </div>
                  <span className="font-semibold text-s-black">
                    Metrics Notification
                  </span>
                </div>
                <button
                  onClick={() => setMetricsNotification(!metricsNotification)}
                  className={`relative h-8 w-14 rounded-full transition-colors ${
                    metricsNotification ? "bg-s-orange" : "bg-s-gray/50"
                  }`}
                  aria-label="Toggle metrics notification"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      x: metricsNotification ? 24 : 4,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 h-6 w-6 rounded-full bg-white"
                  />
                </button>
              </div>
            </div>
          </div>
        </MotionItem>

        {/* Sound Section */}
        <MotionItem>
          <div className="rounded-3xl bg-white p-5">
            <h2 className="mb-4 flex items-center justify-between text-[16px] font-bold text-s-black">
              Sound
              <span className="text-s-gray">⋮</span>
            </h2>
            <div className="flex flex-col gap-3">
              {/* Vibrations Toggle */}
              <div className="rounded-2xl bg-s-gray/30 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-s-black">Vibrations</span>
                  <button
                    onClick={() => setVibrations(!vibrations)}
                    className={`relative h-8 w-14 rounded-full transition-colors ${
                      vibrations ? "bg-s-orange" : "bg-s-gray/50"
                    }`}
                    aria-label="Toggle vibrations"
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        x: vibrations ? 24 : 4,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-1 h-6 w-6 rounded-full bg-white"
                    />
                  </button>
                </div>
                <p className="text-xs text-s-gray">
                  When Vibrate Notifications are on, your phone will vibrate.
                </p>
              </div>

              {/* Sound Toggle */}
              <div className="rounded-2xl bg-s-gray/30 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-s-black">Sound</span>
                  <button
                    onClick={() => setSoundEnabled(!soundEnabled)}
                    className={`relative h-8 w-14 rounded-full transition-colors ${
                      soundEnabled ? "bg-s-orange" : "bg-s-gray/50"
                    }`}
                    aria-label="Toggle sound"
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        x: soundEnabled ? 24 : 4,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-1 h-6 w-6 rounded-full bg-white"
                    />
                  </button>
                </div>
                <p className="text-xs text-s-gray">
                  When Sound Notifications are on, your phone will always check for sounds.
                </p>
              </div>
            </div>
          </div>
        </MotionItem>

        {/* Misc Section */}
        <MotionItem>
          <div className="rounded-3xl bg-white p-5">
            <h2 className="mb-4 flex items-center justify-between text-[16px] font-bold text-s-black">
              Misc
              <span className="text-s-gray">⋮</span>
            </h2>
            <div className="flex flex-col gap-3">
              {/* Offers */}
              <div className="flex items-center justify-between rounded-2xl bg-s-gray/30 p-4">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-s-black">Offers</span>
                </div>
                <span className="text-xs font-medium text-s-gray">iPhone 14 Pro →</span>
              </div>

              {/* App Update Toggle */}
              <div className="flex items-center justify-between rounded-2xl bg-s-gray/30 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-s-black">
                    <Download size={18} className="text-white" />
                  </div>
                  <span className="font-semibold text-s-black">App Update</span>
                </div>
                <button
                  onClick={() => setAppUpdate(!appUpdate)}
                  className={`relative h-8 w-14 rounded-full transition-colors ${
                    appUpdate ? "bg-s-orange" : "bg-s-gray/50"
                  }`}
                  aria-label="Toggle app update"
                >
                  <motion.div
                    initial={false}
                    animate={{
                      x: appUpdate ? 24 : 4,
                    }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 h-6 w-6 rounded-full bg-white"
                  />
                </button>
              </div>

              {/* Resources Toggle */}
              <div className="rounded-2xl bg-s-gray/30 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-s-black">Resources</span>
                  <button
                    onClick={() => setResources(!resources)}
                    className={`relative h-8 w-14 rounded-full transition-colors ${
                      resources ? "bg-s-orange" : "bg-s-gray/50"
                    }`}
                    aria-label="Toggle resources"
                  >
                    <motion.div
                      initial={false}
                      animate={{
                        x: resources ? 24 : 4,
                      }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-1 h-6 w-6 rounded-full bg-white"
                    />
                  </button>
                </div>
                <p className="text-xs text-s-gray">
                  Enable resource notification when there&apos;s a new resources.
                </p>
              </div>
            </div>
          </div>
        </MotionItem>

        {/* Save Button */}
        <MotionItem>
          <motion.button
            onClick={handleSaveSettings}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-full bg-s-black py-4 font-bold text-white transition-colors active:bg-s-black/90"
          >
            Save Settings ✓
          </motion.button>
        </MotionItem>
      </main>
    </MotionPage>
  );
}
