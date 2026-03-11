import { cn } from "@/lib/utils";
import type { ProductSummary } from "@/lib/types";
import { VerdictBadge } from "@/components/ui/verdict-badge";

interface FoodCardProps {
  product: ProductSummary;
  timestamp?: string;
  className?: string;
}

export function FoodCard({ product, timestamp, className }: FoodCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-jellow-yellow/20 text-2xl">
        🥗
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-gray-900 truncate">{product.name}</p>
        <p className="text-sm text-gray-500">{product.brand}</p>
      </div>
      <div className="flex flex-col items-end gap-1">
        <VerdictBadge level={product.level} label={`${product.score}/100`} />
        {timestamp && (
          <span className="text-xs text-gray-400">{timestamp}</span>
        )}
      </div>
    </div>
  );
}
