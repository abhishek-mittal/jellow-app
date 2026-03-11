"use client";

import { cn } from "@/lib/utils";
import { Card, CardBody } from "@heroui/card";
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
  return (
    <Card
      isPressable={!!onTap}
      onPress={() => onTap?.(food.id)}
      aria-label={onTap ? `View details for ${food.name}` : undefined}
      shadow="none"
      radius="lg"
      className={cn(
        "border border-j-stone bg-j-warm-white transition-colors duration-200",
        onTap && "hover:border-j-teal",
        className
      )}
    >
      <CardBody className="flex-row items-center gap-3 p-4">
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
      </CardBody>
    </Card>
  );
}
