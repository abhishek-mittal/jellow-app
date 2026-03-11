"use client";

import { cn } from "@/lib/utils";
import { VerdictBadge, type Verdict } from "@/components/ui/verdict-badge";

export interface FoodItem {
  id: string;
  name: string;
  brand: string;
  imageUrl?: string;
  verdict: Verdict;
}

interface FoodCardProps {
  food: FoodItem;
  onTap?: (id: string) => void;
  className?: string;
}

export function FoodCard({ food, onTap, className }: FoodCardProps) {
  const handleClick = () => {
    onTap?.(food.id);
  };

  return (
    <div
      role={onTap ? "button" : undefined}
      tabIndex={onTap ? 0 : undefined}
      aria-label={onTap ? `View details for ${food.name}` : undefined}
      onClick={onTap ? handleClick : undefined}
      onKeyDown={
        onTap
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            }
          : undefined
      }
      className={cn(
        "flex items-center gap-3 rounded-[var(--r-lg)] border border-j-stone bg-j-warm-white p-4 transition-colors duration-200",
        onTap && "cursor-pointer hover:border-j-teal",
        className
      )}
    >
      {/* Image thumbnail */}
      <div
        className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-[var(--r-sm)] bg-j-stone/30"
        aria-hidden="true"
      >
        {food.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={food.imageUrl}
            alt={food.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-2xl text-j-navy-soft">🥗</span>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-j-navy">{food.name}</p>
        <p className="truncate text-sm text-j-navy-soft">{food.brand}</p>
      </div>

      {/* Verdict badge */}
      <div className="shrink-0">
        <VerdictBadge verdict={food.verdict} size="sm" showLabel={false} />
      </div>
    </div>
  );
}
