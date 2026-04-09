"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { spring } from "@/components/motion";
import { IconHome, IconTrophy, IconPill, IconUser } from "@/components/icons/nav-icons";

const navItems = [
  { href: "/home" as const, label: "Home", Icon: IconHome },
  { href: "/rewards" as const, label: "Rewards", Icon: IconTrophy },
  { href: "/scan" as const, label: "", Icon: Plus, isAction: true },
  { href: "/prescription" as const, label: "Meds", Icon: IconPill },
  { href: "/profile" as const, label: "Profile", Icon: IconUser },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="mx-auto max-w-md bg-surface-card border border-black/[0.04] shadow-[0_-8px_30px_rgba(0,0,0,0.04)] pb-[env(safe-area-inset-bottom,24px)] rounded-[var(--r-2xl)]">
        <div className="flex items-center justify-around px-2 pb-2 pt-4">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);

            if (item.isAction) {
              return (
                <Link key={item.href} href={item.href as any} className="relative z-10 flex flex-col items-center justify-center -mt-[18px]">
                  <motion.div
                    whileTap={{ scale: 0.92 }}
                    whileHover={{ scale: 1.05 }}
                    transition={spring.bouncy}
                    className="flex h-[56px] w-[56px] items-center justify-center rounded-full bg-s-orange shadow-[0_8px_16px_rgba(255,107,0,0.3)]"
                  >
                    <Plus size={30} strokeWidth={2.5} className="text-white" />
                  </motion.div>
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href as any}
                className="relative flex w-[64px] flex-col items-center gap-[5px]"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  transition={spring.snappy}
                >
                  <item.Icon
                    size={26}
                    strokeWidth={isActive ? 2.5 : 2}
                    className={cn(
                      "transition-colors duration-200",
                      isActive ? "text-s-orange" : "text-nav-inactive"
                    )}
                  />
                </motion.div>
                <span
                  className={cn(
                    "text-[10px] leading-none transition-colors duration-200 whitespace-nowrap",
                    isActive ? "font-medium text-s-orange" : "font-normal text-nav-inactive"
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
