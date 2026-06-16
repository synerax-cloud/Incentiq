"use client";

import * as LabelPrimitive from "@radix-ui/react-label";
import { cn } from "@/lib/utils";

export function Label({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "text-sm font-medium text-ink leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-neutral-200",
        className
      )}
      {...props}
    />
  );
}
