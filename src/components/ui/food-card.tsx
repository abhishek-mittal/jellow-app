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
        "bg-white shadow-md transition-all duration-200",
        onTap && "hover:shadow-lift active:scale-[0.98]",
        className
      )}
    >
      <CardBody className="flex-row items-center gap-3 p-4">
        {/* Image thumbnail */}
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[var(--r-lg)] bg-gray-200/30"
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
            <span className="text-2xl text-s-dark-gray">🥗</span>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <p className="truncate font-[var(--font-heading)] font-bold text-s-dark-gray">{food.name}</p>
          <p className="truncate text-sm text-s-dark-gray">{food.brand}</p>
        </div>

        {/* Verdict badge */}
        <div className="shrink-0">
          <VerdictBadge verdict={food.verdict} size="sm" showLabel={false} />
        </div>
      </CardBody>
    </Card>
  );
}
