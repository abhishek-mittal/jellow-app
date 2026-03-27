import { ChevronRight, Clock, Flame, Heart, Plus } from "lucide-react";
import type { ReactNode } from "react";

interface ActivityItemProps {
  icon: ReactNode;
  title: string;
  timeRange: string;
  duration: string;
  calories: string;
  avgBpm: string;
  score: string;
}

export function ActivityItem({
  icon,
  title,
  timeRange,
  duration,
  calories,
  avgBpm,
  score,
}: ActivityItemProps) {
  return (
    <div className="flex flex-col gap-3 pb-5 border-b border-gray-100 last:border-0 last:pb-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
            {icon}
          </div>
          <div className="flex flex-col">
            <h3 className="text-sm font-bold text-gray-900">{title}</h3>
            <p className="mt-0.5 text-xs font-medium text-gray-500">{timeRange}</p>
          </div>
        </div>
        <ChevronRight size={18} className="text-gray-400" />
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-y-2 ml-[60px]">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
          <Clock size={14} className="text-gray-400" /> {duration}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
          <Flame size={14} className="text-orange-500" /> {calories}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
          <Heart size={14} className="text-pink-500" /> {avgBpm}
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500">
          <Plus size={14} className="text-purple-500" /> {score}
        </div>
      </div>
    </div>
  );
}
