"use client";

import { cn } from "@/lib/utils";

export type BottomNavTab = "home" | "scan" | "rewards" | "profile";

interface TabConfig {
  id: BottomNavTab;
  label: string;
  icon: string;
  activeIcon: string;
}

const tabs: TabConfig[] = [
  { id: "home", label: "Home", icon: "🏠", activeIcon: "🏠" },
  { id: "scan", label: "Scan", icon: "📷", activeIcon: "📷" },
  { id: "rewards", label: "Rewards", icon: "🎁", activeIcon: "🎁" },
  { id: "profile", label: "Profile", icon: "👤", activeIcon: "👤" },
];

export interface BottomNavProps {
  activeTab: BottomNavTab;
  onTabChange: (tab: BottomNavTab) => void;
  className?: string;
}

export function BottomNav({ activeTab, onTabChange, className }: BottomNavProps) {
  return (
    <nav
      aria-label="Main navigation"
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t border-[var(--gray-200)] bg-[var(--panel)] pb-[env(safe-area-inset-bottom)] shadow-[var(--shadow-medium)]",
        className
      )}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        const isScan = tab.id === "scan";

        return (
          <button
            key={tab.id}
            aria-label={tab.label}
            aria-current={isActive ? "page" : undefined}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-0.5 rounded-[var(--radius-md)] px-3 py-1 transition-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--candy-mint)] focus-visible:ring-offset-1",
              isActive
                ? "scale-[1.05] text-[var(--candy-mint)]"
                : "text-[var(--gray-500)] hover:text-[var(--gray-900)]",
              isScan && [
                "relative -mt-5 h-14 w-14 min-h-[56px] min-w-[56px] rounded-[var(--radius-full)] shadow-[var(--shadow-medium)]",
                isActive
                  ? "bg-[var(--candy-mint)] text-white"
                  : "bg-[var(--jellow-yellow)] text-[var(--gray-900)]",
              ]
            )}
          >
            <span
              className={cn("text-xl leading-none", isScan && "text-2xl")}
              aria-hidden="true"
            >
              {isActive ? tab.activeIcon : tab.icon}
            </span>
            {!isScan && (
              <span
                className={cn(
                  "text-[10px] font-semibold leading-none",
                  isActive ? "text-[var(--candy-mint)]" : "text-[var(--gray-500)]"
                )}
              >
                {tab.label}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
