"use client";

import { useEffect, useRef } from "react";

interface AnimatedNumberProps {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Count-up duration in ms */
  duration?: number;
  className?: string;
}

function format(v: number, decimals: number) {
  return v.toLocaleString("en-IN", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Counts up to `value` when first scrolled into view.
 * The final value is server-rendered as static text, so with no JS,
 * reduced motion, or a broken IntersectionObserver the correct number
 * is always visible — the count-up is pure enhancement.
 */
export function AnimatedNumber({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  duration = 1400,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let started = false;

    const run = () => {
      if (started) return;
      started = true;
      const t0 = performance.now();
      const step = (t: number) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        node.textContent = `${prefix}${format(value * eased, decimals)}${suffix}`;
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };

    if (node.getBoundingClientRect().top < window.innerHeight) {
      run();
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            run();
            observer.disconnect();
          }
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    // If IO is broken in this environment the static value simply stays.
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, decimals, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {format(value, decimals)}
      {suffix}
    </span>
  );
}
