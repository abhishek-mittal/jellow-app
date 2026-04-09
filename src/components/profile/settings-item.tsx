"use client";

import { ChevronRight, MoreVertical } from "lucide-react";
import { Switch } from "@/components/ui/checkbox";
import { MotionPress } from "@/components/motion";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { PropsWithChildren, ReactNode } from "react";

/* ─── Section Header ─── */

export interface SettingsSectionProps {
  title: string;
  badge?: ReactNode;
  className?: string;
}

export function SettingsSection({ title, badge, children, className }: PropsWithChildren<SettingsSectionProps>) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-bold text-s-dark-gray">{title}</h2>
          {badge}
        </div>
        <button
          aria-label={`${title} options`}
          className="flex h-7 w-7 items-center justify-center rounded-full text-nav-inactive active:bg-black/5"
        >
          <MoreVertical size={16} />
        </button>
      </div>
      <div className="flex flex-col gap-2">{children}</div>
    </div>
  );
}

/* ─── Setting Row ─── */

interface SettingsItemBase {
  icon: LucideIcon;
  label: string;
  className?: string;
}

interface NavigateItem extends SettingsItemBase {
  type?: "navigate";
  value?: string;
  onPress?: () => void;
}

interface ToggleItem extends SettingsItemBase {
  type: "toggle";
  checked: boolean;
  onToggle: (checked: boolean) => void;
}

interface DangerItem extends SettingsItemBase {
  type: "danger";
  onPress?: () => void;
}

export type SettingsItemProps = NavigateItem | ToggleItem | DangerItem;

export function SettingsItem(props: SettingsItemProps) {
  const { icon: Icon, label, className } = props;
  const isDanger = props.type === "danger";
  const isToggle = props.type === "toggle";

  const content = (
    <div
      className={cn(
        "flex w-full items-center gap-3 rounded-2xl px-4 py-3.5",
        isDanger
          ? "bg-danger/10"
          : "bg-surface-card shadow-[0_1px_3px_rgba(0,0,0,0.04)]",
        className,
      )}
    >
      {/* Icon circle */}
      <div
        className={cn(
          "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
          isDanger ? "bg-danger/20" : "bg-s-gray",
        )}
      >
        <Icon
          size={18}
          className={isDanger ? "text-danger" : "text-s-dark-gray"}
        />
      </div>

      {/* Label */}
      <span
        className={cn(
          "flex-1 text-[15px] font-semibold",
          isDanger ? "text-danger" : "text-s-dark-gray",
        )}
      >
        {label}
      </span>

      {/* Right side */}
      {isToggle ? (
        <Switch
          size="sm"
          isSelected={props.checked}
          onValueChange={props.onToggle}
          aria-label={label}
          classNames={{
            wrapper: cn(
              "group-data-[selected=true]:bg-s-orange",
            ),
          }}
        />
      ) : (
        <div className="flex items-center gap-1.5">
          {!isDanger && (props as NavigateItem).value && (
            <span className="text-sm font-medium text-nav-inactive">
              {(props as NavigateItem).value}
            </span>
          )}
          <ChevronRight
            size={18}
            className={isDanger ? "text-danger" : "text-nav-inactive"}
          />
        </div>
      )}
    </div>
  );

  if (isToggle) return content;

  return (
    <MotionPress className="block w-full">
      <button
        type="button"
        onClick={isDanger ? (props as DangerItem).onPress : (props as NavigateItem).onPress}
        className="w-full text-left"
      >
        {content}
      </button>
    </MotionPress>
  );
}

/* ─── Badges ─── */

export function SettingsBadge({ children, variant = "default" }: PropsWithChildren<{ variant?: "default" | "warning" }>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-bold",
        variant === "warning"
          ? "bg-danger/15 text-danger"
          : "bg-s-blue/15 text-s-blue",
      )}
    >
      {children}
    </span>
  );
}
