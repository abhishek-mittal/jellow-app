"use client";

import Link from "next/link";
import { MotionItem } from "@/components/motion";

const actions = [
  {
    href: "/scan",
    label: "Scan",
    emoji: "📷",
    gradient: "from-sky-100 to-sky-200",
  },
  {
    href: "/home",
    label: "History",
    emoji: "🍎",
    gradient: "from-rose-100 to-rose-200",
  },
  {
    href: "/prescription",
    label: "Meds",
    emoji: "💊",
    gradient: "from-amber-100 to-orange-200",
  },
  {
    href: "/home",
    label: "Favorites",
    emoji: "💝",
    gradient: "from-pink-100 to-pink-200",
  },
] as const;

/** Quick action circles for the home dashboard. */
export function QuickActions() {
  return (
    <section>
      <h2 className="text-[15px] font-semibold text-gray-800 mb-3">
        Quick Actions
      </h2>
      <div className="flex items-center justify-between gap-2">
        {actions.map((action) => (
          <MotionItem key={action.label}>
            <Link
              href={action.href as never}
              className="flex flex-col items-center gap-2"
            >
              <div
                className={`flex h-[64px] w-[64px] items-center justify-center rounded-full bg-gradient-to-br ${action.gradient} shadow-sm`}
              >
                <span className="text-[28px]">{action.emoji}</span>
              </div>
              <span className="text-[12px] font-medium text-gray-600">
                {action.label}
              </span>
            </Link>
          </MotionItem>
        ))}
      </div>
    </section>
  );
}
