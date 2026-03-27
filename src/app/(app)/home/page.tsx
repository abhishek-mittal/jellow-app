"use client";

import { HomeHeader } from "@/components/home/home-header";
import { NutritionPanel } from "@/components/home/nutrition-panel";
import { SleepPanel } from "@/components/home/sleep-panel";
import { FitnessMetricsPanel } from "@/components/home/fitness-metrics-panel";
import { SupportBanner } from "@/components/home/support-banner";
import { MotionPage } from "@/components/motion";

export default function HomePage() {
  return (
    <MotionPage className="min-h-screen bg-[#F8F9FA] pb-24">
      <HomeHeader />
      <main className="px-4 mt-2 flex flex-col gap-4">
        <NutritionPanel />
        <FitnessMetricsPanel />
        <SleepPanel />
        <SupportBanner />
      </main>
    </MotionPage>
  );
}
