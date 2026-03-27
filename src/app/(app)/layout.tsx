import { BottomNav } from "@/components/layout/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto min-h-screen max-w-md bg-s-gray">
      <main className="pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
