import React from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { DistributionRow } from "@/components/ui/distribution-row";
import { InfoBlock } from "@/components/ui/info-block";
import { CheckCircle2, Moon, Sun } from "lucide-react";

export function SleepPanel() {
  return (
    <section className="w-full flex flex-col gap-3">
      <SectionHeader title="Sleep" actionText="See All" actionHref="/sleep" />
      
      <DashboardCard className="p-6">
        {/* Top Section - Headline & Hero Stats */}
        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[38px] font-bold text-s-black leading-none tracking-tight">5</span>
            <span className="text-[17px] font-bold text-nav-inactive">hr</span>
            <span className="text-[38px] font-bold text-s-black leading-none tracking-tight ml-1">25</span>
            <span className="text-[17px] font-bold text-nav-inactive">min</span>
          </div>
          
          <div className="flex items-center gap-1.5 mt-1">
            <CheckCircle2 className="text-white" size={20} fill="var(--accent-green)" />
            <span className="text-[15px] font-semibold text-s-dark-gray">84 sleep score</span>
          </div>
          
          <p className="text-[15px] font-medium text-nav-inactive mt-1.5">
            You had a positive sleep last night.
          </p>
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-surface-divider my-6" />

        {/* Middle Section - Time Blocks */}
        <div className="flex items-center justify-between mb-6 pr-6">
          <InfoBlock 
            icon={<Moon size={22} strokeWidth={2.5} />} 
            value="02:22" 
            label="Bedtime" 
          />
          <InfoBlock 
            icon={<Sun size={24} strokeWidth={2.5} />} 
            value="08:22" 
            label="Wake Up" 
          />
        </div>

        {/* Divider */}
        <div className="h-[1px] w-full bg-surface-divider my-6" />

        {/* Bottom Section - Distribution */}
        <div className="flex flex-col gap-3">
          <DistributionRow label="Awake" value="41m" color="var(--s-orange)" percentage={55} />
          <DistributionRow label="REM" value="1h 55m" color="var(--accent-blue)" percentage={50} />
          <DistributionRow label="Deep" value="59m" color="var(--accent-green)" percentage={30} />
          <DistributionRow label="Wake" value="1h 44m" color="var(--nav-inactive)" percentage={10} />
        </div>
      </DashboardCard>
    </section>
  );
}