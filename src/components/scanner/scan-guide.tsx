"use client";

import { cn } from "@/lib/utils";
import { Flashlight, FlashlightOff } from "lucide-react";

export interface ScanGuideProps {
  isScanning: boolean;
  onFlashToggle: () => void;
  onManualEntry: () => void;
  flashEnabled: boolean;
}

const SCAN_SIZE = "14rem";

export function ScanGuide({
  isScanning,
  onFlashToggle,
  onManualEntry,
  flashEnabled,
}: ScanGuideProps) {
  return (
    <div className="absolute inset-0 z-10">
      {/* Dark overlay */}
      <div className="absolute inset-0 flex flex-col">
        <div className="w-full flex-1 bg-black/65" />
        <div className="flex" style={{ height: SCAN_SIZE }}>
          <div className="flex-1 bg-black/65" />
          <div style={{ width: SCAN_SIZE }} />
          <div className="flex-1 bg-black/65" />
        </div>
        <div className="w-full flex-1 bg-black/65" />
      </div>

      {/* Flash toggle */}
      <button
        onClick={onFlashToggle}
        aria-label={flashEnabled ? "Turn off flash" : "Turn on flash"}
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-[var(--r-sm)] bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
      >
        {flashEnabled ? <Flashlight size={20} /> : <FlashlightOff size={20} />}
      </button>

      {/* Content centred over scan window */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p
          aria-live="polite"
          className="mb-3 text-sm font-semibold text-white drop-shadow-md"
        >
          {isScanning ? "Scanning…" : "Point camera at barcode"}
        </p>

        {/* Scan window with corner lines */}
        <div
          className="relative"
          style={{ width: SCAN_SIZE, height: SCAN_SIZE }}
        >
          {/* Top-left */}
          <div
            className={cn(
              "absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-j-teal",
              isScanning && "animate-pulse"
            )}
          />
          {/* Top-right */}
          <div
            className={cn(
              "absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-j-teal",
              isScanning && "animate-pulse"
            )}
          />
          {/* Bottom-left */}
          <div
            className={cn(
              "absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-j-teal",
              isScanning && "animate-pulse"
            )}
          />
          {/* Bottom-right */}
          <div
            className={cn(
              "absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-j-teal",
              isScanning && "animate-pulse"
            )}
          />

          {/* Scan line animation */}
          {isScanning && (
            <div className="absolute left-2 right-2 top-1/2 h-0.5 bg-j-teal/60 animate-scan-line" />
          )}
        </div>

        <button
          onClick={onManualEntry}
          className="mt-4 text-sm text-white/80 underline underline-offset-2 transition-colors hover:text-white"
        >
          Can&#39;t scan? Enter manually
        </button>
      </div>
    </div>
  );
}
