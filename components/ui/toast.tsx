"use client";

import * as ToastPrimitive from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export const ToastProvider = ToastPrimitive.Provider;
export const ToastViewport = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Viewport>) => (
  <ToastPrimitive.Viewport
    className={cn("fixed bottom-0 right-0 z-[100] flex max-h-screen w-full flex-col-reverse gap-2 p-4 sm:max-w-sm", className)}
    {...props}
  />
);

export const Toast = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Root>) => (
  <ToastPrimitive.Root
    className={cn(
      "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-xl border border-line bg-canvas p-4 pr-8 shadow-float transition-all",
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out",
      "data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full",
      "data-[state=open]:slide-in-from-bottom-full",
      "dark:bg-neutral-900 dark:border-neutral-700",
      className
    )}
    {...props}
  />
);

export const ToastClose = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Close>) => (
  <ToastPrimitive.Close
    className={cn("absolute right-2 top-2 rounded-md p-1 text-ink/50 opacity-0 transition-opacity hover:text-ink focus:opacity-100 focus:outline-none focus:ring-1 group-hover:opacity-100", className)}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitive.Close>
);

export const ToastTitle = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Title>) => (
  <ToastPrimitive.Title className={cn("text-sm font-semibold text-ink dark:text-neutral-100", className)} {...props} />
);

export const ToastDescription = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Description>) => (
  <ToastPrimitive.Description className={cn("text-sm text-ink/60 dark:text-neutral-400", className)} {...props} />
);

export const ToastAction = ({ className, ...props }: React.ComponentPropsWithoutRef<typeof ToastPrimitive.Action>) => (
  <ToastPrimitive.Action
    className={cn("inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-line bg-transparent px-3 text-sm font-medium transition-colors hover:bg-surface focus:outline-none focus:ring-1 focus:ring-accent/30 disabled:pointer-events-none disabled:opacity-50", className)}
    {...props}
  />
);

export type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;
export type ToastActionElement = React.ReactElement<typeof ToastAction>;
