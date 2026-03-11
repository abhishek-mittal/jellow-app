"use client";

import { useRef, type ChangeEvent, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

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
        "relative flex aspect-video w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-colors select-none",
        {
          "border-gray-300 bg-gray-50 cursor-pointer hover:border-[var(--jellow-yellow)] hover:bg-yellow-50":
            status === "idle",
          "border-[var(--candy-blue)] bg-blue-50 cursor-not-allowed":
            status === "uploading",
          "border-[var(--candy-purple)] bg-purple-50 cursor-not-allowed":
            status === "processing",
          "border-[var(--candy-mint)] bg-green-50 cursor-pointer":
            status === "done",
          "border-[var(--candy-pink)] bg-red-50 cursor-pointer":
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
          <img
            src={preview}
            alt="Prescription preview"
            className="h-full w-full rounded-xl object-contain"
          />
          {onRemove && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-gray-900/60 text-white hover:bg-gray-900/80 transition-colors"
              aria-label="Remove image"
            >
              ✕
            </button>
          )}
        </div>
      ) : (
        <>
          {status === "idle" && (
            <div className="flex flex-col items-center gap-1 px-4 text-center">
              <span className="text-4xl" aria-hidden="true">
                📷
              </span>
              <p className="text-sm font-medium text-gray-600">Tap to upload</p>
              <p className="text-xs text-gray-400">
                JPEG or PNG · max {maxSizeMB} MB
              </p>
            </div>
          )}

          {status === "uploading" && (
            <div className="flex flex-col items-center gap-3 px-4 text-center">
              <div
                className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--candy-blue)] border-t-transparent"
                aria-hidden="true"
              />
              <p className="text-sm font-medium text-[var(--candy-blue)]">
                Uploading…
              </p>
              <div className="h-1.5 w-32 overflow-hidden rounded-full bg-blue-100">
                <div className="h-full w-1/2 animate-pulse rounded-full bg-[var(--candy-blue)]" />
              </div>
            </div>
          )}

          {status === "processing" && (
            <div className="flex flex-col items-center gap-3 px-4 text-center">
              <div
                className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--candy-purple)] border-t-transparent"
                aria-hidden="true"
              />
              <p className="text-sm font-medium text-[var(--candy-purple)]">
                Analyzing prescription…
              </p>
            </div>
          )}

          {status === "done" && (
            <div className="flex flex-col items-center gap-1 px-4 text-center">
              <span className="text-4xl" aria-hidden="true">
                ✅
              </span>
              <p className="text-sm font-medium text-[var(--candy-mint)]">
                Upload complete
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-1 px-4 text-center">
              <span className="text-4xl" aria-hidden="true">
                ⚠️
              </span>
              <p className="text-sm font-medium text-[var(--candy-pink)]">
                Upload failed
              </p>
              <p className="text-xs text-[var(--candy-pink)]">Tap to retry</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
