import Link from "next/link";
import { cn } from "@/lib/utils";

export interface SectionHeaderProps {
  title: string;
  actionText?: string;
  actionHref?: any;
  className?: string;
}

export function SectionHeader({ title, actionText, actionHref, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between py-2", className)}>
      <h2 className="text-xl font-bold text-s-dark-gray">{title}</h2>
      {actionText && actionHref && (
        <Link href={actionHref} className="text-sm font-semibold text-s-orange hover:opacity-80 transition-opacity">
          {actionText}
        </Link>
      )}
    </div>
  );
}