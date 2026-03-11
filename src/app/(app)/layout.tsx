import { BottomNav } from "@/components/layout/bottom-nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-screen max-w-md bg-j-cream">
      <main className="px-6 pt-6 pb-24">{children}</main>
      <BottomNav />
    </div>
  );
}
