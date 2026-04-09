"use client";

import { HomeHeader } from "@/components/home/home-header";
import { JellowScore } from "@/components/home/jellow-score";
import { FitnessMetricsPanel } from "@/components/home/fitness-metrics-panel";
import { NutritionPanel } from "@/components/home/nutrition-panel";
import { SleepPanel } from "@/components/home/sleep-panel";
import { ActivitySection } from "@/components/home/activity-section";
import { SupportBanner } from "@/components/home/support-banner";
import { SearchBar } from "@/components/home/search-bar";
import { MotionPage } from "@/components/motion";

export default function HomePage() {
  return (
    <MotionPage className="min-h-screen bg-[#F8F9FA] pb-24">
      <HomeHeader />
      <main className="px-4 mt-2 flex flex-col gap-6">
        <JellowScore score={61} levelText="Average Fitness" tierText="plus" />
        <SearchBar />
        <FitnessMetricsPanel />
        <ActivitySection />
        <NutritionPanel />
        <SleepPanel />
        <SupportBanner />
      </main>
    </MotionPage>
  );
}
