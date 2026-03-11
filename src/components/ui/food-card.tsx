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
        "flex items-center gap-3 rounded-[var(--radius-lg)] bg-[var(--panel)] p-4 shadow-[var(--shadow-soft)]",
        onTap && "cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]",
        className
      )}
    >
      {/* Image thumbnail */}
      <div
        className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-[var(--radius-md)] bg-[var(--gray-100)]"
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
          <span className="text-3xl">🥗</span>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="truncate font-bold text-[var(--gray-900)]">{food.name}</p>
        <p className="truncate text-sm text-[var(--gray-500)]">{food.brand}</p>
      </div>

      {/* Verdict badge */}
      <div className="shrink-0">
        <VerdictBadge verdict={food.verdict} size="sm" />
      </div>
    </div>
  );
}
