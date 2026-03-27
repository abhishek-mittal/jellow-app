"use client";

import { NavHeader } from "@/components/layout/nav-header";
import { MacroTarget } from "@/components/ui/macro-target";
import { CircleHelp, Flame, Droplet, Bone, Pencil, Sparkles } from "lucide-react";

export default function NutritionGoalPage() {
  return (
    <div className="min-h-screen bg-white pb-10 flex flex-col">
      <NavHeader 
        title="Nutrition Goal" 
        rightAction={<CircleHelp className="w-6 h-6 text-gray-800" strokeWidth={2} />} 
      />

      <main className="flex-1 flex flex-col items-center px-6 pt-16">
        {/* Main Goal Section */}
        <div className="text-center mb-16">
          <h2 className="text-[64px] font-bold text-[#2D2D2D] leading-none mb-3 tracking-tight">
            2,125
          </h2>
          <p className="text-2xl font-semibold text-[#2D2D2D] mb-4">
            total kcal daily
          </p>
          <p className="text-[15px] text-gray-500 font-medium">
            You need to consume 2,125 daily calorie.
          </p>
        </div>

        {/* Macro Targets */}
        <div className="flex w-full justify-between items-end mb-auto px-6">
          <MacroTarget
            icon={<Flame className="w-8 h-8 text-[#EE7F46]" strokeWidth={2} />}
            value="400"
            label="kcal"
            progress={40}
            colorClass="bg-[#EE7F46]"
            trackClass="bg-[#EE7F46]/20"
          />
          <MacroTarget
            icon={<Droplet className="w-8 h-8 text-[#3B82F6]" strokeWidth={2} />}
            value="123g"
            label="fat"
            progress={65}
            colorClass="bg-[#3B82F6]"
            trackClass="bg-[#3B82F6]/20"
          />
          <MacroTarget
            icon={<Bone className="w-8 h-8 text-gray-600" strokeWidth={2} />}
            value="30g"
            label="protein"
            progress={45}
            colorClass="bg-gray-600"
            trackClass="bg-gray-200"
          />
        </div>

        {/* Action Buttons */}
        <div className="w-full space-y-4 mt-20">
          <button className="w-full h-14 bg-[#EE7F46] text-white rounded-2xl font-semibold text-[17px] flex items-center justify-center gap-2 transition-transform active:scale-[0.98]">
            Edit Goal
            <Pencil className="w-[18px] h-[18px]" strokeWidth={2.5} />
          </button>
          
          <button className="w-full h-14 bg-white border border-[#EE7F46] text-[#EE7F46] rounded-2xl font-semibold text-[17px] flex items-center justify-center gap-2 transition-transform active:scale-[0.98] shadow-sm">
            <Sparkles className="w-[18px] h-[18px]" strokeWidth={2.5} />
            Autodetect with AI
          </button>
        </div>
      </main>
    </div>
  );
}
