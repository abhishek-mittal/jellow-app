"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ReactNode } from "react";

interface NavHeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: ReactNode;
}

export function NavHeader({ title, onBack, rightAction }: NavHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 relative">
      <button
        onClick={handleBack}
        className="flex items-center justify-center w-10 h-10 -ml-2 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors z-10"
        aria-label="Go back"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" strokeWidth={2.5} />
      </button>
      
      <h1 className="text-[17px] font-semibold text-gray-900 absolute left-1/2 -translate-x-1/2">
        {title}
      </h1>

      <div className="w-10 h-10 flex items-center justify-end z-10">
        {rightAction}
      </div>
    </header>
  );
}
