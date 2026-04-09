import { Plus } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { DashboardCard } from "@/components/ui/dashboard-card";
import { ActivityItem } from "./activity-item";

export function ActivitySection() {
  return (
    <section className="flex flex-col gap-3">
      <SectionHeader title="Activity" actionText="See All" actionHref="/activity" />

      <DashboardCard className="p-6">
        {/* Summary Row */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex flex-col">
            <span className="text-[28px] font-bold text-[#111] leading-none tracking-tight">
              2 out of 5
            </span>
            <span className="text-[14px] font-medium text-[#7D7D7D] mt-1.5">
              3 activities left for this week.
            </span>
          </div>
          <button className="flex h-12 w-12 items-center justify-center rounded-full bg-[#2D2D2D] text-white shadow-sm hover:bg-[#3D3D3D] transition-colors">
            <Plus size={22} />
          </button>
        </div>

        <div className="h-[1px] w-full bg-[#F0F0F0] mb-4" />

        {/* Activity Items */}
        <div className="flex flex-col gap-1">
          <ActivityItem
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M13 4C13 3.44772 13.4477 3 14 3C14.5523 3 15 3.44772 15 4V8L17.5 10.5L16 12L13 9V4Z" fill="#7D7D7D" />
                <path d="M10 12L7 20H9L10.5 16H13.5L15 20H17L14 12H10Z" fill="#7D7D7D" />
              </svg>
            }
            title="Walking"
            timeRange="Jun 25, 10:00 AM - 10:30 AM"
            duration="30 min"
            calories="128 kcal"
            avgBpm="108 avg bpm"
            score="+3 score"
          />
          <ActivityItem
            icon={
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M12 3C12.5523 3 13 3.44772 13 4V7L16 10V14L13 17V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V17L8 14V10L11 7V4C11 3.44772 11.4477 3 12 3Z" fill="#7D7D7D" />
              </svg>
            }
            title="Yoga"
            timeRange="Jun 25, 10:00 AM - 10:30 AM"
            duration="30 min"
            calories="128 kcal"
            avgBpm="108 avg bpm"
            score="+3 score"
          />
        </div>
      </DashboardCard>
    </section>
  );
}
