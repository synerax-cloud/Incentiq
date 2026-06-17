"use client";

import { useEffect, useRef, useState } from "react";

type CountUpStatProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  plusSign?: boolean;
  decimals?: number;
  duration?: number;
  delay?: number; // ms to wait after IO fires before starting count-up
};

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export function CountUpStat({
  value,
  prefix = "",
  suffix = "",
  plusSign = false,
  decimals = 0,
  duration = 1800,
  delay = 0,
}: CountUpStatProps) {
  // SSR / pre-hydration: always show final value + plus sign — never blank.
  const [display, setDisplay] = useState(value);
  const [done, setDone] = useState(true);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      setDone(true);
      return;
    }

    let timer: ReturnType<typeof setTimeout> | undefined;
    let rafId: number | undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();

        // Wait for `delay` ms (= Reveal animation duration for this item) so
        // the element is fully visible before the count-up resets to 0.
        timer = setTimeout(() => {
          let startTime: number | null = null;
          setDisplay(0);
          setDone(false);

          const tick = (now: number) => {
            if (startTime === null) startTime = now;
            const p = Math.min((now - startTime) / duration, 1);
            setDisplay(value * easeOutCubic(p));
            if (p < 1) {
              rafId = requestAnimationFrame(tick);
            } else {
              setDisplay(value);
              setDone(true);
            }
          };

          rafId = requestAnimationFrame(tick);
        }, delay);
      },
      { threshold: 0.1 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (timer !== undefined) clearTimeout(timer);
      if (rafId !== undefined) cancelAnimationFrame(rafId);
    };
  }, [value, duration, delay]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
      {plusSign && done ? "+" : null}
    </span>
  );
}
