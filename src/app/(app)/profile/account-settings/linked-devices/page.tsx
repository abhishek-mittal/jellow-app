"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { MotionPage, MotionItem, spring } from "@/components/motion";
import { ChevronLeft, Settings, Zap, Camera } from "lucide-react";

export default function LinkedDevicesPage() {
  const router = useRouter();
  const [devices] = useState([
    {
      id: 1,
      name: "Xiaomi Watch 8",
      connected: true,
      battery: 98,
      icon: "⌚",
    },
  ]);

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
            Linked Devices
          </h1>
        </div>
      </MotionItem>

      {/* ─── Content ─── */}
      <main className="flex flex-col gap-5 px-4 pt-6">
        {/* Devices List */}
        {devices.map((device, index) => (
          <MotionItem key={device.id}>
            <div className="rounded-3xl bg-white p-6">
              {/* Device Image/Icon Area */}
              <div className="mb-6 flex justify-center">
                <div className="text-6xl">{device.icon}</div>
              </div>

              {/* Device Name & Status */}
              <h2 className="mb-2 text-center text-[20px] font-bold text-s-black">
                {device.name}
              </h2>
              <div className="mb-6 flex items-center justify-center gap-2">
                <span className="flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-s-orange" />
                  <span className="text-sm font-semibold text-s-black">
                    Connected
                  </span>
                </span>
                <span className="text-sm text-s-gray">
                  ◆ {device.battery}%
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-s-black text-white"
                  aria-label="Stats"
                >
                  <Zap size={24} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-s-black text-white"
                  aria-label="Settings"
                >
                  <Settings size={24} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-s-black text-white"
                  aria-label="Camera"
                >
                  <Camera size={24} />
                </motion.button>
              </div>
            </div>
          </MotionItem>
        ))}

        {/* Add Device Button */}
        <MotionItem>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full rounded-full border-2 border-s-black py-4 font-bold text-s-black transition-colors active:bg-s-black/5"
          >
            + Add New Device
          </motion.button>
        </MotionItem>
      </main>
    </MotionPage>
  );
}
