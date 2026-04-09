import { cn } from "@/lib/utils";

export interface DistributionRowProps {
  label: string;
  value: string;
  color: string;
  percentage: number; // 0 to 100
  className?: string;
}

export function DistributionRow({ label, value, color, percentage, className }: DistributionRowProps) {
  return (
    <div className={cn("flex items-center justify-between py-2 text-[15px]", className)}>
      <span className="w-16 font-semibold text-s-dark-gray shrink-0">{label}</span>
      <div className="flex-1 mx-4 relative h-[7px] bg-transparent rounded-full flex items-center">
        <div 
          className="absolute left-0 h-full rounded-full transition-all duration-500 ease-out" 
          style={{ width: `${Math.max(10, percentage)}%`, backgroundColor: color }}
        />
      </div>
      <span className="w-14 text-right font-medium text-nav-inactive shrink-0">{value}</span>
    </div>
  );
}