import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OnboardingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <span className="mb-6 text-7xl">🍏</span>
      <h1 className="mb-2 text-3xl font-bold text-gray-900">Welcome to Jellow</h1>
      <p className="mb-8 max-w-xs text-gray-500">
        Your playful health companion. Scan products, learn what&apos;s inside, and earn rewards for healthy choices.
      </p>
      <div className="flex w-full max-w-xs flex-col gap-3">
        <Link href="/home">
          <Button size="lg" className="w-full">
            Get Started
          </Button>
        </Link>
      </div>
    </div>
  );
}
