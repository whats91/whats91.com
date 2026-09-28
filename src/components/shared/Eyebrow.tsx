import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon?: LucideIcon;
  /** Show the animated "live" dot instead of an icon */
  live?: boolean;
}

/**
 * Small brand pill placed above a section title or hero headline.
 */
export function Eyebrow({
  icon: Icon,
  live = false,
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-brand-primary-light border border-brand-primary/15 px-4 py-1.5 text-xs sm:text-sm font-medium text-brand-primary",
        className
      )}
      {...props}
    >
      {live && (
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary" />
        </span>
      )}
      {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
      {children}
    </span>
  );
}
