"use client";

import { extendVariants } from "@heroui/system";
import { Button as HeroUIButton } from "@heroui/button";

export const Button = extendVariants(HeroUIButton, {
  variants: {
    variant: {
      primary:
        "bg-primary text-primary-foreground hover:bg-primary-600 font-semibold",
      secondary:
        "bg-transparent text-secondary border border-default-300 hover:bg-default-100 font-semibold",
      ghost: "text-default-500 hover:bg-default-200/50 font-semibold",
    },
    size: {
      sm: "h-9 min-w-[4rem] px-4 text-sm",
      md: "h-11 min-w-[6rem] px-6 text-base",
      lg: "h-12 min-w-[8rem] px-8 text-base",
      icon: "h-11 w-11 min-w-0 px-0",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
  },
});
