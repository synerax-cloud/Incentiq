"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-dark-green text-white",
        secondary: "bg-light-gray text-dark-green border border-light-gray",
        success: "bg-light-green text-dark-green",
        warning: "bg-amber/10 text-amber",
        destructive: "bg-red/10 text-red",
        outline: "border border-light-gray text-dark-green",
        accent: "bg-green/10 text-green border border-green/20",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
