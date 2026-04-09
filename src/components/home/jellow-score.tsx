import { ChevronRight, Heart, Sparkles } from "lucide-react";

interface JellowScoreProps {
  score: number;
  levelText: string;
  tierText: string;
}

export function JellowScore({ score, levelText, tierText }: JellowScoreProps) {
  return (
    <div className="flex items-center justify-between bg-s-dark-gray rounded-[var(--r-lg)] px-5 py-4">
      <div className="flex items-center gap-4">
        {/* Green filled circle with score */}
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-green text-[22px] font-bold text-white shadow-sm">
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
