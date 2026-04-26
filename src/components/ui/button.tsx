"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#060E1D] disabled:pointer-events-none disabled:opacity-40 active:scale-[0.97]",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 hover:shadow-blue-500/30 hover:shadow-xl",
        outline:
          "border border-blue-400/30 text-blue-300 bg-blue-500/8 hover:bg-blue-500/15 hover:border-blue-400/50",
        ghost:
          "text-slate-300 hover:text-white hover:bg-white/8",
        secondary:
          "bg-white/6 text-slate-200 border border-white/8 hover:bg-white/10",
        gold:
          "bg-gradient-to-r from-yellow-600 to-amber-500 text-white shadow-lg shadow-amber-600/20 hover:from-yellow-500 hover:to-amber-400",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-sm",
        sm:      "h-9  px-4 py-2   text-xs",
        lg:      "h-13 px-8 py-3   text-base",
        icon:    "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
