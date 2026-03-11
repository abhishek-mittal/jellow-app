"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ScanPage() {
  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center p-4 text-center">
      <div className="mb-8 flex h-48 w-48 items-center justify-center rounded-3xl bg-gray-100">
        <span className="text-6xl">📷</span>
      </div>
      <h1 className="mb-2 text-2xl font-bold text-gray-900">Scan a Product</h1>
      <p className="mb-8 text-gray-500">
        Point your camera at a barcode to check the health score
      </p>
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Button size="lg" className="w-full">
          Open Camera
        </Button>
        <Button variant="secondary" size="lg" className="w-full">
          Enter Barcode
        </Button>
      </div>
      <Link href="/verdict/p1" className="mt-6 text-sm text-candy-blue underline">
        Try demo verdict →
      </Link>
    </div>
  );
}
