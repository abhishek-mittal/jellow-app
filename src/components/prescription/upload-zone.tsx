"use client";

import { useRef, type ChangeEvent, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { Upload, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";

export type UploadStatus =
  | "idle"
  | "uploading"
  | "processing"
  | "done"
  | "error";

export interface UploadZoneProps {
  onFileSelect: (file: File) => void;
  onSizeError?: (fileSizeMB: number, maxSizeMB: number) => void;
  accept?: string;
  maxSizeMB?: number;
  preview?: string;
  status?: UploadStatus;
  onRemove?: () => void;
}

export function UploadZone({
  onFileSelect,
  onSizeError,
  accept = "image/*",
  maxSizeMB = 10,
  preview,
  status = "idle",
  onRemove,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const isInteractive = status !== "uploading" && status !== "processing";

  const handleTrigger = () => {
    if (!isInteractive) return;
    inputRef.current?.click();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (maxSizeMB && file.size > maxSizeMB * 1024 * 1024) {
      e.target.value = "";
      onSizeError?.(
        Math.round((file.size / (1024 * 1024)) * 10) / 10,
        maxSizeMB
      );
      return;
    }
    onFileSelect(file);
    e.target.value = "";
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTrigger();
    }
  };

  return (
    <div
      role="button"
      tabIndex={isInteractive ? 0 : -1}
      aria-label="Upload prescription image"
      onClick={handleTrigger}
      onKeyDown={handleKeyDown}
      className={cn(
        "relative flex aspect-video w-full flex-col items-center justify-center rounded-[var(--r-lg)] border border-dashed transition-colors duration-200 select-none",
        {
          "border-gray-300 bg-s-gray cursor-pointer hover:border-s-orange hover:bg-s-orange/20/30":
            status === "idle",
          "border-s-orange bg-s-orange/20/20 cursor-not-allowed":
            status === "uploading" || status === "processing",
          "border-v-good bg-v-good-bg cursor-pointer":
            status === "done",
          "border-v-avoid bg-v-avoid-bg cursor-pointer":
            status === "error",
        }
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        capture="environment"
        className="sr-only"
        onChange={handleChange}
        aria-hidden="true"
        tabIndex={-1}
      />

      {preview && status !== "error" ? (
        <div className="relative h-full w-full p-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Prescription preview"
            className="h-full w-full rounded-[var(--r-sm)] object-contain"
          />
          {onRemove && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-[var(--r-sm)] bg-s-dark-gray/60 text-white hover:bg-s-dark-gray/80 transition-colors"
              aria-label="Remove image"
            >
              ✕
            </button>
          )}
        </div>
      ) : (
        <>
          {status === "idle" && (
            <div className="flex flex-col items-center gap-2 px-4 text-center">
              <Upload size={32} className="text-s-dark-gray" />
              <p className="text-sm font-medium text-s-dark-gray">Tap to upload</p>
              <p className="text-xs text-s-dark-gray">
                JPEG or PNG · max {maxSizeMB} MB
              </p>
            </div>
          )}

          {status === "uploading" && (
            <div className="flex flex-col items-center gap-3 px-4 text-center">
              <Loader2 size={32} className="animate-spin text-s-orange" />
              <p className="text-sm font-medium text-s-orange">
                Uploading…
              </p>
              <div className="h-1 w-32 overflow-hidden rounded-full bg-gray-200">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-s-orange" />
              </div>
            </div>
          )}

          {status === "processing" && (
            <div className="flex flex-col items-center gap-3 px-4 text-center">
              <Loader2 size={32} className="animate-spin text-s-orange" />
              <p className="text-sm font-medium text-s-orange">
                Analyzing prescription…
              </p>
            </div>
          )}

          {status === "done" && (
            <div className="flex flex-col items-center gap-1 px-4 text-center">
              <CheckCircle2 size={32} className="text-v-good" />
              <p className="text-sm font-medium text-v-good">
                Upload complete
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-1 px-4 text-center">
              <AlertTriangle size={32} className="text-v-avoid" />
              <p className="text-sm font-medium text-v-avoid">
                Upload failed
              </p>
              <p className="text-xs text-v-avoid">Tap to retry</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
