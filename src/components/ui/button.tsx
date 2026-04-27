"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5865F2] focus-visible:ring-offset-2 focus-visible:ring-offset-[#07080F] disabled:pointer-events-none disabled:opacity-40 active:scale-[0.97] cursor-pointer select-none",
  {
    variants: {
      variant: {
        default:
          "bg-[#5865F2] text-white hover:bg-[#4752D4] shadow-[0_0_28px_rgba(88,101,242,0.28)] hover:shadow-[0_0_36px_rgba(88,101,242,0.38)]",
        outline:
          "border border-white/15 text-[#EFEDE8] bg-transparent hover:bg-white/5 hover:border-white/28",
        ghost:
          "text-[rgba(239,237,232,0.55)] hover:text-[#EFEDE8] hover:bg-white/6",
        secondary:
          "bg-white/6 border border-white/8 text-[#EFEDE8] hover:bg-white/10",
        gold:
          "bg-gradient-to-r from-[#B8963E] to-[#D4AF5A] text-[#07080F] font-bold hover:opacity-90 shadow-[0_0_24px_rgba(184,150,62,0.22)]",
      },
      size: {
        default: "h-11 px-6 py-2.5 text-sm",
        sm:      "h-9  px-4 py-2   text-xs",
        lg:      "h-12 px-8 py-3   text-base",
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
