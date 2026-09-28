import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CTAProps {
  href: string;
  children: React.ReactNode;
  /** Hide the trailing arrow on the primary CTA */
  noArrow?: boolean;
  className?: string;
}

/**
 * Primary conversion button — one per hero / final CTA.
 * Renders an anchor so it works in server components and is crawlable.
 */
export function PrimaryCTA({ href, children, noArrow = false, className }: CTAProps) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl",
        "h-11 sm:h-12 px-6 sm:px-7 text-sm sm:text-base font-semibold",
        // brand-600/700, not brand-primary: white text on brand-primary
        // (#448C74) measures 4.0:1 and fails WCAG AA for normal text;
        // brand-600 (#3A7A64) measures 5.06:1. See WHATS91_DESIGN_SYSTEM.md §2.2/§5.3.
        "bg-brand-600 text-brand-primary-foreground hover:bg-brand-700",
        "shadow-lg shadow-brand-primary/25 hover:shadow-xl hover:shadow-brand-primary/30",
        "transition-all duration-300 w-full sm:w-auto",
        className
      )}
    >
      {children}
      {!noArrow && (
        <ArrowRight
          className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
          aria-hidden="true"
        />
      )}
    </Link>
  );
}

/**
 * Secondary CTA — outline style, pairs with PrimaryCTA.
 */
export function SecondaryCTA({ href, children, className }: Omit<CTAProps, "noArrow">) {
  const external = href.startsWith("http");
  return (
    <Link
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl",
        "h-11 sm:h-12 px-6 sm:px-7 text-sm sm:text-base font-semibold",
        "border border-border/80 bg-background text-text-primary",
        "hover:bg-surface hover:border-border",
        "transition-all duration-200 w-full sm:w-auto",
        className
      )}
    >
      {children}
    </Link>
  );
}

interface CTAGroupProps {
  align?: "center" | "left" | "responsive-hero";
  className?: string;
  children: React.ReactNode;
}

/**
 * Lays out one primary + optional secondary CTA.
 * Stacks full-width on phones, sits in a row from `sm`.
 * `responsive-hero` centers on phones and left-aligns at `lg`
 * (matches the two-column hero pattern).
 */
export function CTAGroup({ align = "center", className, children }: CTAGroupProps) {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto",
        align === "center" && "justify-center",
        align === "left" && "justify-start",
        align === "responsive-hero" && "justify-center lg:justify-start",
        className
      )}
    >
      {children}
    </div>
  );
}
