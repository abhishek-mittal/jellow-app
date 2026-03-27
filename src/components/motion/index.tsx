"use client";

import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

/* ─── Spring Presets ─── */
export const spring = {
  bouncy: { type: "spring" as const, damping: 20, stiffness: 300 },
  gentle: { type: "spring" as const, damping: 25, stiffness: 200 },
  snappy: { type: "spring" as const, damping: 30, stiffness: 400 },
  slow: { type: "spring" as const, damping: 20, stiffness: 100 },
};

/* ─── Variant Presets ─── */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.05 },
  },
};

/* ─── Reusable Components ─── */

interface MotionPageProps {
  children: ReactNode;
  className?: string;
}

/** Page-level fade-in-up wrapper */
export function MotionPage({ children, className }: MotionPageProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Individual animated item within a MotionPage */
export function MotionItem({
  children,
  className,
  ...props
}: HTMLMotionProps<"div"> & { children: ReactNode }) {
  return (
    <motion.div
      variants={fadeInUp}
      transition={spring.gentle}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Scale-in animated item (for cards, badges) */
export function MotionScale({
  children,
  className,
  ...props
}: HTMLMotionProps<"div"> & { children: ReactNode }) {
  return (
    <motion.div
      variants={scaleIn}
      transition={spring.bouncy}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Press-scale interaction wrapper */
export function MotionPress({
  children,
  className,
  ...props
}: HTMLMotionProps<"div"> & { children: ReactNode }) {
  return (
    <motion.div
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: 1.01 }}
      transition={spring.snappy}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
