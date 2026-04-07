"use client";

import { HomeHeader } from "@/components/home/home-header";
import { QuickActions } from "@/components/home/quick-actions";
import { ActiveChallenge } from "@/components/home/active-challenge";
import { RecentScans } from "@/components/home/recent-scans";
import { MotionPage } from "@/components/motion";

export default function HomePage() {
  return (
    <MotionPage className="min-h-screen bg-[#F8F9FA] pb-24">
      <HomeHeader />
      <main className="px-4 mt-5 flex flex-col gap-6">
        <QuickActions />
        <ActiveChallenge />
        <RecentScans />
      </main>
    </MotionPage>
  );
}
