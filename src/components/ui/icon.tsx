"use client";

import React from "react";
import { IconType } from "react-icons";
import { IconContext } from "react-icons";
import { cn } from "@/lib/utils";

export interface IconProps extends React.SVGAttributes<SVGElement> {
  icon: IconType;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | number;
  className?: string;
  color?: "foreground" | "teal" | "coral" | "amber" | "navy" | "navy-soft" | "good" | "caution" | "avoid" | (string & {});
}

/**
 * Standardized Icon component to ensure consistent sizing and coloration across the app.
 * Uses `react-icons` as the standard backing.
 */
export function Icon({
  icon: IconComponent,
  size = "md",
  className,
  color = "foreground",
  ...props
}: IconProps) {
  // Map our semantic sizes to pixel values
  const sizeMap: Record<string, number> = {
    sm: 16,
    md: 24,
    lg: 32,
    xl: 40,
    "2xl": 48,
  };

  const pxSize = typeof size === "number" ? size : sizeMap[size] || sizeMap.md;

  // Map semantic colors to Tailwind color classes
  const colorMap: Record<string, string> = {
    foreground: "text-s-dark-gray",
    teal: "text-s-orange",
    coral: "text-error",
    amber: "text-error",
    navy: "text-s-dark-gray",
    "navy-soft": "text-s-dark-gray",
    good: "text-v-good",
    caution: "text-v-caution",
    avoid: "text-v-avoid",
  };

  const resolvedColorClass = colorMap[color] || "";

  return (
    <IconContext.Provider value={{ size: pxSize.toString() }}>
      <IconComponent
        className={cn(
          "transition-colors duration-200", 
          resolvedColorClass, 
          className
        )}
        {...props}
      />
    </IconContext.Provider>
  );
}
