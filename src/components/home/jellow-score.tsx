import { ChevronRight, Heart, Sparkles } from "lucide-react";
import type { ReactNode } from "react";

interface JellowScoreProps {
  score: number;
  levelText: string;
  tierText: string;
}

export function JellowScore({ score, levelText, tierText }: JellowScoreProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Score block */}
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E87A3E] text-2xl font-bold text-white shadow-sm">
          {score}
        </div>
        {/* Text Details */}
        <div className="flex flex-col justify-center">
          <h2 className="text-base font-bold text-white">Jellow Score</h2>
          <div className="mt-1 flex items-center gap-2 text-xs font-medium text-white/60">
            <span className="flex items-center gap-1">
              <Heart size={12} className="text-white/60" /> {levelText}
            </span>
            <span className="h-1 w-1 rounded-full bg-white/30" />
            <span className="flex items-center gap-1">
              <Sparkles size={12} className="text-white/60" /> {tierText}
            </span>
          </div>
        </div>
      </div>
      <ChevronRight size={20} className="text-white/50" />
    </div>
  );
}
