"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  /** Stagger step (0–3) → transition-delay of 0/90/180/270ms */
  delay?: 0 | 1 | 2 | 3;
  className?: string;
}

/**
 * Scroll-reveal wrapper: fades content up on first viewport entry.
 * Failure mode is always "no animation", never "no content":
 * - absent/failed JS → no pending marker, so server content stays visible
 * - reduced motion → shown instantly
 * - already in view at mount → revealed on the next frame
 * - IntersectionObserver broken/indefinitely delayed (the spec's mandatory
 *   initial callback doesn't arrive within 1.2s) → force-shown
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const show = () => {
      node.classList.remove("is-pending");
      node.classList.add("is-visible");
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      show();
      return;
    }

    // Already within (or above) the viewport: animate in immediately.
    if (node.getBoundingClientRect().top < window.innerHeight * 0.92) {
      node.classList.add("is-pending");
      const frame = requestAnimationFrame(show);
      return () => {
        cancelAnimationFrame(frame);
        node.classList.remove("is-pending");
      };
    }

    if (!("IntersectionObserver" in window)) {
      show();
      return;
    }

    // Hide only after enhancement is running; failed script delivery cannot hide SSR content.
    node.classList.add("is-pending");
    let sawInitialCallback = false;
    let observer: IntersectionObserver;
    try {
      observer = new IntersectionObserver(
      (entries) => {
        sawInitialCallback = true;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show();
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.1 }
    );
      observer.observe(node);
    } catch {
      show();
      return;
    }

    // A healthy IntersectionObserver always delivers an initial callback
    // within a frame or two. If it hasn't after 1.2s, it is broken in this
    // environment — sacrifice the animation, guarantee the content.
    const guard = window.setTimeout(() => {
      if (!sawInitialCallback) show();
    }, 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(guard);
      node.classList.remove("is-pending");
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("reveal", delay > 0 && `reveal-d${delay}`, className)}
    >
      {children}
    </div>
  );
}
