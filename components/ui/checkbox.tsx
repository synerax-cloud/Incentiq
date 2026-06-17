"use client";

import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Checkbox({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      className={cn(
        "peer h-4 w-4 shrink-0 rounded-sm border border-light-gray transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green/30",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-[state=checked]:bg-green data-[state=checked]:border-green data-[state=checked]:text-white",
        "dark:border-neutral-600",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <Check className="h-3 w-3" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}
