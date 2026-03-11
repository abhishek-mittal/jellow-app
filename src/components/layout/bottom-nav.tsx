"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, ScanBarcode, Trophy, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const navItems = [
  { href: "/home" as const, label: "Home", Icon: Home },
  { href: "/scan" as const, label: "Scan", Icon: ScanBarcode },
  { href: "/rewards" as const, label: "Rewards", Icon: Trophy },
  { href: "/profile" as const, label: "Profile", Icon: User },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-j-stone bg-j-warm-white/95 backdrop-blur-sm safe-area-pb">
      <div className="mx-auto flex max-w-md items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname?.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-0.5 px-3 py-1 transition-colors",
                isActive
                  ? "text-j-teal"
                  : "text-j-navy-soft hover:text-j-navy"
              )}
            >
              <item.Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              {isActive && (
                <>
                  <span className="text-[10px] font-semibold">{item.label}</span>
                  <span className="absolute -bottom-2 h-0.5 w-5 rounded-full bg-j-teal animate-tab-underline" />
                </>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
