"use client";

import { Flame } from "lucide-react";
import { MotionItem } from "@/components/motion";

/** Active challenge card shown on the home dashboard. */
export function ActiveChallenge() {
  return (
    <section>
      <h2 className="text-[15px] font-semibold text-gray-800 mb-3 flex items-center gap-1.5">
        Active Challenge <Flame size={16} className="text-orange-500" />
      </h2>
      <MotionItem>
        <div className="flex items-center gap-4 rounded-[20px] bg-gradient-to-r from-[#2D6A4F] to-[#40916C] p-4 shadow-sm">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20 text-2xl">
            🥗
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[14px] font-bold text-white">
              7-Day Healthy Scan Streak
            </p>
            <p className="text-[12px] text-white/70 mt-0.5">
              5 / 7 days completed
            </p>
            <div className="mt-2 h-[6px] w-full rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-white transition-all"
                style={{ width: "71%" }}
              />
            </div>
          </div>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-900 text-[11px] font-bold text-white">
            +50
          </div>
        </div>
      </MotionItem>
    </section>
  );
}
