"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ScanBarcode, Trophy, User } from "lucide-react";
import { spring } from "@/components/motion";

const navItems = [
  { href: "/home" as const, label: "Home", Icon: Home },
  { href: "/scan" as const, label: "Scan", Icon: ScanBarcode, isScan: true },
  { href: "/rewards" as const, label: "Rewards", Icon: Trophy },
  { href: "/profile" as const, label: "Profile", Icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-md bg-white/95 backdrop-blur-xl border-t border-black/[0.04] shadow-nav pb-[env(safe-area-inset-bottom,24px)]">
        <div className="flex items-center justify-around px-1 pb-1 pt-2">
          {navItems.map((item) => {
            const isActive = pathname?.startsWith(item.href);

            if (item.isScan) {
              return (
                <Link key={item.href} href={item.href} className="relative -mt-5 flex flex-col items-center">
                  <motion.div
                    whileTap={{ scale: 0.92 }}
                    whileHover={{ scale: 1.05 }}
                    transition={spring.bouncy}
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-full shadow-teal",
                      "gradient-scan-cta"
                    )}
                  >
                    <ScanBarcode size={24} className="text-white" strokeWidth={2} />
                  </motion.div>
                  <span className={cn(
                    "mt-1 block text-center text-[10px] font-semibold",
                    isActive ? "text-j-teal" : "text-j-navy-soft"
                  )}>
                    {item.label}
                  </span>
                </Link>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="relative flex min-w-[56px] flex-col items-center gap-0.5 py-1.5"
              >
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  transition={spring.snappy}
                >
                  <item.Icon
                    size={22}
                    strokeWidth={isActive ? 2.5 : 1.5}
                    className={cn(
                      "transition-colors duration-200",
                      isActive ? "text-j-teal" : "text-j-navy-soft"
                    )}
                  />
                </motion.div>
                <span
                  className={cn(
                    "text-[10px] leading-none transition-colors duration-200",
                    isActive ? "font-semibold text-j-teal" : "font-medium text-j-navy-soft"
                  )}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute -bottom-0.5 h-1 w-5 rounded-full bg-j-teal"
                    transition={spring.bouncy}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
