"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export function NavProgress() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const prevPathname = useRef(pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (pathname !== prevPathname.current) {
      // Navigation completed — snap to 100% then hide
      setWidth(100);
      timerRef.current = setTimeout(() => {
        setVisible(false);
        setWidth(0);
      }, 300);
      prevPathname.current = pathname;
    }
  }, [pathname]);

  // This effect is never triggered by pathname change — it's for starting the bar
  // We start it via the Sidebar's button click using a custom event
  useEffect(() => {
    function start() {
      if (timerRef.current) clearTimeout(timerRef.current);
      setVisible(true);
      setWidth(30);
      timerRef.current = setTimeout(() => setWidth(70), 200);
    }

    window.addEventListener("nav-start", start);
    return () => window.removeEventListener("nav-start", start);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 z-50 h-0.5 bg-green transition-all duration-300 ease-out"
      style={{ width: `${width}%` }}
    />
  );
}
