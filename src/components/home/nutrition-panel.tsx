import React from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { DonutProgress } from "@/components/ui/donut-progress";
import { MacroBar } from "@/components/ui/macro-bar";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function NutritionPanel() {
  // Hardcoded for demo/matching mockup
  const consumed = 648;
  const totalList = 2181;
  const target = 2500;
  // This seems slightly mismatch. Usually total is target. But the image says: "648 consumed", center: "2,181 kcal total" (maybe total means target left or total accumulated?) Wait, target is 2500. So 2181 is probably "kcal left". Let's match the image text exactly: "kcal total".
  // Actually, wait, progress ring seems to be for 2181 / 2500? No, 648 consumed is likely progress. 
  const progressPercent = (totalList / target) * 100; // Let's use 87% like the image.

  return (
    <section className="w-full flex flex-col gap-3">
      <SectionHeader title="Nutrition" />
      
      <DashboardCard className="p-6">
        {/* Top: Donut Chart & Calories */}
        <div className="flex items-center justify-between mt-2 mb-8 px-2">
          
          <div className="flex flex-col items-center">
            <span className="text-[20px] font-bold text-[#111]">648</span>
            <span className="text-[13px] font-medium text-[#7D7D7D]">consumed</span>
          </div>

          <div className="relative flex items-center justify-center">
            <DonutProgress progress={progressPercent} color="#EE7F46" size={130} strokeWidth={8} />
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-[28px] font-extrabold text-[#111] tracking-tight leading-none">2,181</span>
              <span className="text-[14px] font-medium text-[#7D7D7D] mt-1">kcal total</span>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[20px] font-bold text-[#111]">2,500</span>
            <span className="text-[13px] font-medium text-[#7D7D7D]">target</span>
          </div>

        </div>

        {/* Macros */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <MacroBar label="Protein" consumed={23} total={72} color="#EE7F46" className="flex-1" />
          <MacroBar label="Fat" consumed={15} total={20} color="#4B8BF5" className="flex-1" />
          <MacroBar label="Carbs" consumed={125} total={220} color="#F5BE4B" className="flex-1" />
        </div>

        <p className="text-center text-[15px] font-medium text-[#7D7D7D] mb-6 px-4">
          You're on track for your calorie goal today! Keep it up, okay!
        </p>

        <div className="h-[1px] w-full bg-[#F0F0F0] mb-5" />

        <Link href={"/nutrition-goal" as any} className="flex items-center justify-center gap-2 text-[#EE7F46] font-semibold text-[15px] hover:opacity-80 transition-opacity pb-1">
          See Nutrition Dashboard
          <ArrowRight size={18} strokeWidth={2} className="mt-[1px]" />
        </Link>
      </DashboardCard>
    </section>
  );
}