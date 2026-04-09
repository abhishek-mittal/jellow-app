import React from "react";
import { cn } from "@/lib/utils";

interface DonutProgressProps {
  progress: number; // 0 to 100
  size?: number;
  strokeWidth?: number;
  color?: string;
  trackColor?: string;
  className?: string;
}

export function DonutProgress({
  progress,
  size = 140,
  strokeWidth = 10,
  color = "var(--s-orange)",
  trackColor = "var(--surface-divider)",
  className,
}: DonutProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  // Create an intentional gap at the bottom (like a gauge/semi-circle but larger).
  // The mockup shows an almost complete circle. 
  // Let's create an opening of about 30 degrees at the top.
  const gapAngle = 30; // degrees
  const angleToUse = 360 - gapAngle;
  const lengthToUse = (angleToUse / 360) * circumference;
  
  // calculate offset so the arc length is max `lengthToUse`
  // mapping progress (0-100) to actual filled length out of `lengthToUse`
  const fillLength = (progress / 100) * lengthToUse;
  
  const offset = circumference - fillLength;
  
  // Rotate to position the gap at the very top (-90 degrees is top natively).
  // we need to rotate an extra `gapAngle / 2` starting from -90.
  // Wait, if it starts at 0, goes to 360:
  // We want it symmetrical around the top.
  // The SVG `stroke-dashoffset` starts drawing from the "top" if SVG is rotated -90deg.
  // But we want it to start from top+gapAngle/2.
  const rotationDeg = -90 + (gapAngle / 2);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)} style={{ width: size, height: size }}>
      <svg 
        width={size} 
        height={size} 
        viewBox={`0 0 ${size} ${size}`} 
        style={{ transform: `rotate(${rotationDeg}deg)` }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={trackColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${lengthToUse} ${circumference}`}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
        />
      </svg>
    </div>
  );
}