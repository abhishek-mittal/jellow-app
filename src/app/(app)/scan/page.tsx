"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ScanGuide } from "@/components/scanner/scan-guide";
import { BottomNav } from "@/components/layout/bottom-nav";
import { Button } from "@/components/ui/button";

type PermissionStatus = "prompt" | "granted" | "denied" | "unsupported";

/** Mock scan delay in milliseconds (simulates barcode detection). */
const MOCK_SCAN_DELAY_MS = 2500;

/**
 * Demo verdict path used until real barcode lookup is implemented.
 * Replace with `/verdict/${detectedBarcode}` once the scanner is wired up.
 */
const DEMO_VERDICT_PATH = "/verdict/p1";

export default function ScanPage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [permission, setPermission] = useState<PermissionStatus>("prompt");
  const [isScanning, setIsScanning] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);
  const [processingError, setProcessingError] = useState<string | null>(null);

  /** Attach a stream to the video element once both exist. */
  const attachStream = useCallback((stream: MediaStream) => {
    streamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, []);

  /** Request camera permission and start the live preview. */
  const requestCamera = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setPermission("unsupported");
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      attachStream(stream);
      setPermission("granted");
    } catch (err) {
      if (err instanceof Error && err.name === "NotAllowedError") {
        setPermission("denied");
      } else {
        setProcessingError("Could not access the camera. Please try again.");
      }
    }
  }, [attachStream]);

  /** Start mock barcode scan and navigate to verdict on success. */
  const startScan = useCallback(() => {
    if (isScanning) return;
    setIsScanning(true);
    setProcessingError(null);

    // Mock detection — replace with real BarcodeDetector / library integration.
    scanTimerRef.current = setTimeout(() => {
      setIsScanning(false);
      router.push(DEMO_VERDICT_PATH);
    }, MOCK_SCAN_DELAY_MS);
  }, [isScanning, router]);

  /** Toggle torch/flash via MediaStreamTrack capabilities when available. */
  const handleFlashToggle = useCallback(() => {
    setFlashEnabled((prev) => {
      const next = !prev;
      const track = streamRef.current?.getVideoTracks()[0];
      if (track && "applyConstraints" in track) {
        // Best-effort torch toggle. The `torch` constraint is non-standard
        // (Chrome/Android only) so we cast and swallow any rejection.
        track
          .applyConstraints({ advanced: [{ torch: next } as MediaTrackConstraintSet] })
          .catch(() => undefined);
      }
      return next;
    });
  }, []);

  const handleManualEntry = useCallback(() => {
    router.push(DEMO_VERDICT_PATH);
  }, [router]);

  /** Stop camera tracks when unmounting. */
  useEffect(() => {
    return () => {
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (scanTimerRef.current) clearTimeout(scanTimerRef.current);
    };
  }, []);

  // ── Permission: prompt ────────────────────────────────────────────────────
  if (permission === "prompt") {
    return (
      <>
        <div className="flex min-h-[80vh] flex-col items-center justify-center gap-6 p-6 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-[var(--jellow-yellow)]/20 text-5xl">
            📷
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Scan a Product</h1>
            <p className="mt-2 text-sm text-gray-500">
              Allow camera access to scan barcodes and check nutrition scores.
            </p>
          </div>

          {processingError && (
            <p role="alert" className="text-sm text-red-500">
              {processingError}
            </p>
          )}

          <div className="flex w-full max-w-xs flex-col gap-3">
            <Button size="lg" className="w-full" onClick={requestCamera}>
              Allow Camera Access
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={handleManualEntry}
            >
              Enter Barcode Manually
            </Button>
          </div>
        </div>
        <BottomNav />
      </>
    );
  }

  // ── Permission: denied ────────────────────────────────────────────────────
  if (permission === "denied") {
    return (
      <>
        <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 p-6 text-center">
          <span className="text-5xl">🚫</span>
          <h1 className="text-xl font-bold text-gray-900">Camera Access Denied</h1>
          <p className="text-sm text-gray-500">
            Please enable camera permission in your browser settings and reload the
            page.
          </p>
          <Button variant="secondary" size="md" onClick={() => setPermission("prompt")}>
            Try Again
          </Button>
        </div>
        <BottomNav />
      </>
    );
  }

  // ── Permission: unsupported ───────────────────────────────────────────────
  if (permission === "unsupported") {
    return (
      <>
        <div className="flex min-h-[80vh] flex-col items-center justify-center gap-4 p-6 text-center">
          <span className="text-5xl">😕</span>
          <h1 className="text-xl font-bold text-gray-900">Camera Not Supported</h1>
          <p className="text-sm text-gray-500">
            Your browser does not support camera access. Try entering the barcode
            manually.
          </p>
          <Button size="md" onClick={handleManualEntry}>
            Enter Manually
          </Button>
        </div>
        <BottomNav />
      </>
    );
  }

  // ── Camera granted: live viewfinder ──────────────────────────────────────
  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-black">
      {/* Live camera feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="h-full w-full object-cover"
        aria-label="Camera viewfinder"
      />

      {/* ScanGuide overlay */}
      <ScanGuide
        isScanning={isScanning}
        flashEnabled={flashEnabled}
        onFlashToggle={handleFlashToggle}
        onManualEntry={handleManualEntry}
      />

      {/* Scan / loading button */}
      <div className="absolute bottom-24 left-0 right-0 z-20 flex flex-col items-center gap-3 px-6">
        {processingError && (
          <p
            role="alert"
            className="rounded-xl bg-red-500/90 px-4 py-2 text-center text-sm text-white"
          >
            {processingError}
          </p>
        )}

        {!isScanning ? (
          <Button size="lg" onClick={startScan} className="w-full max-w-xs">
            Scan Barcode
          </Button>
        ) : (
          <div className="flex items-center gap-2 rounded-full bg-black/50 px-5 py-2.5 text-sm text-white backdrop-blur-sm">
            <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Processing…
          </div>
        )}
      </div>

      {/* BottomNav with Scan tab active */}
      <div className="relative z-20">
        <BottomNav />
      </div>
    </div>
  );
}
