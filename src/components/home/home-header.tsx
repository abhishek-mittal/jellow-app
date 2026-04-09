"use client";

import { Bell } from "lucide-react";
import { authClient } from "@/lib/auth-client";

/** Header with avatar, greeting, and notification bell. */
export function HomeHeader() {
  const { data: session } = authClient.useSession();
  const firstName = session?.user?.name?.split(" ")[0] ?? "there";

  return (
    <div className="bg-s-gray pt-[calc(env(safe-area-inset-top,24px)+12px)] pb-3 px-4">
      <div className="flex items-center justify-between">
        {/* Avatar */}
        <div className="h-10 w-10 overflow-hidden rounded-full bg-nav-inactive flex items-center justify-center text-[16px] font-bold text-white shrink-0">
          {firstName.charAt(0)}
        </div>
        {/* Greeting */}
        <h1 className="text-[17px] font-semibold text-s-dark-gray">
          Hello, {firstName}!
        </h1>
        {/* Notification bell */}
        <button className="relative h-10 w-10 flex items-center justify-center rounded-full hover:bg-surface-divider transition-colors">
          <Bell size={22} className="text-s-dark-gray" />
          <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 rounded-full bg-s-orange border-2 border-s-gray" />
        </button>
      </div>
    </div>
  );
}