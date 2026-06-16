"use client";

import { useState, useCallback } from "react";

type ToastVariant = "default" | "destructive" | "success";

interface ToastData {
  id: string;
  title?: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
}

let toastId = 0;

let listeners: Array<(toasts: ToastData[]) => void> = [];
let toasts: ToastData[] = [];

function dispatch(toast: ToastData) {
  toasts = [...toasts, toast];
  listeners.forEach((l) => l(toasts));

  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== toast.id);
    listeners.forEach((l) => l(toasts));
  }, toast.duration ?? 4000);
}

export function toast(data: Omit<ToastData, "id">) {
  dispatch({ ...data, id: String(++toastId) });
}

export function useToast() {
  const [toastList, setToastList] = useState<ToastData[]>(toasts);

  const subscribe = useCallback((listener: (t: ToastData[]) => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  useState(() => {
    const unsubscribe = subscribe(setToastList);
    return unsubscribe;
  });

  return { toasts: toastList, toast };
}
