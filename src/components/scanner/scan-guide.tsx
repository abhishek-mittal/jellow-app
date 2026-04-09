"use client";

import { cn } from "@/lib/utils";
import { Flashlight, FlashlightOff, ChevronLeft, ImagePlus } from "lucide-react";
import { useState } from "react";

export interface ScanGuideProps {
  isScanning: boolean;
  onFlashToggle: () => void;
  onManualEntry: () => void;
  flashEnabled: boolean;
}

const SCAN_SIZE = "16rem";

type ScanMode = "food" | "medicine";

/** Camera overlay with golden scan frame, mode toggle, and gallery CTA. */
export function ScanGuide({
  isScanning,
  onFlashToggle,
  onManualEntry,
  flashEnabled,
}: ScanGuideProps) {
  const [mode, setMode] = useState<ScanMode>("food");

  return (
    <div className="absolute inset-0 z-10">
      {/* Dark overlay */}
      <div className="absolute inset-0 flex flex-col">
        <div className="w-full flex-1 bg-s-black/80" />
        <div className="flex" style={{ height: SCAN_SIZE }}>
          <div className="flex-1 bg-s-black/80" />
          <div style={{ width: SCAN_SIZE }} />
          <div className="flex-1 bg-s-black/80" />
        </div>
        <div className="w-full flex-1 bg-s-black/80" />
      </div>

      {/* Top bar: back + title + flash */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 pt-[calc(env(safe-area-inset-top,24px)+12px)]">
        <button
          onClick={onManualEntry}
          aria-label="Go back"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
        >
          <ChevronLeft size={22} />
        </button>
        <h1 className="text-[17px] font-bold text-white">Scan Product</h1>
        <button
          onClick={onFlashToggle}
          aria-label={flashEnabled ? "Turn off flash" : "Turn on flash"}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm"
        >
          {flashEnabled ? <Flashlight size={20} /> : <FlashlightOff size={20} />}
        </button>
      </div>

      {/* Content centred over scan window */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Food / Medicine toggle */}
        <div className="mb-5 flex items-center gap-1 rounded-full bg-white/10 p-1 backdrop-blur-sm">
          <button
            onClick={() => setMode("food")}
            className={cn(
              "rounded-full px-5 py-1.5 text-[13px] font-semibold transition-colors",
              mode === "food"
                ? "bg-white text-s-black"
                : "text-white/70 hover:text-white"
            )}
          >
            Food
          </button>
          <button
            onClick={() => setMode("medicine")}
            className={cn(
              "rounded-full px-5 py-1.5 text-[13px] font-semibold transition-colors",
              mode === "medicine"
                ? "bg-white text-s-black"
                : "text-white/70 hover:text-white"
            )}
          >
            Medicine
          </button>
        </div>

        {/* Scan window with golden border and corner dots */}
        <div
          className="relative rounded-[20px] border-2 border-s-orange/60"
          style={{ width: SCAN_SIZE, height: SCAN_SIZE }}
        >
          {/* Corner dots — glowing gold */}
          {[
            "top-[-5px] left-[-5px]",
            "top-[-5px] right-[-5px]",
            "bottom-[-5px] left-[-5px]",
            "bottom-[-5px] right-[-5px]",
          ].map((pos) => (
            <div
              key={pos}
              className={cn(
                "absolute h-[10px] w-[10px] rounded-full bg-s-orange",
                pos,
                isScanning && "shadow-[0_0_8px_2px_rgba(255,107,0,0.6)]"
              )}
            />
          ))}

          {/* Scan line animation */}
          {isScanning && (
            <div className="absolute left-3 right-3 top-1/2 h-0.5 rounded-full bg-s-orange/70 animate-scan-line" />
          )}
        </div>

        <p
          aria-live="polite"
          className="mt-4 text-[13px] font-medium text-white/70"
        >
          {isScanning ? "Scanning…" : "Position barcode within frame"}
        </p>
      </div>

      {/* Gallery upload CTA */}
      <div className="absolute bottom-28 left-0 right-0 z-20 flex justify-center">
        <button
          onClick={onManualEntry}
          className="flex items-center gap-2 text-[13px] font-medium text-white/70 transition-colors hover:text-white"
        >
          <ImagePlus size={16} />
          Or tap to upload from gallery
        </button>
      </div>
    </div>
  );
}
