import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const sizeClasses = {
  sm: "h-8 w-8 rounded-lg [&_svg]:h-4 [&_svg]:w-4",
  md: "h-10 w-10 rounded-xl [&_svg]:h-5 [&_svg]:w-5",
  lg: "h-12 w-12 rounded-xl [&_svg]:h-6 [&_svg]:w-6",
} as const;

const toneClasses = {
  brand: "bg-brand-primary/10 text-brand-primary",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  error: "bg-error-soft text-error",
  info: "bg-info-soft text-info",
  ink: "bg-ink text-brand-accent",
} as const;

interface IconBadgeProps {
  icon: LucideIcon;
  size?: keyof typeof sizeClasses;
  tone?: keyof typeof toneClasses;
  className?: string;
}

/**
 * Square icon tile used at the top of feature cards and beside list rows.
 * Brand tone by default; status tones only for genuine status meaning.
 */
export function IconBadge({
  icon: Icon,
  size = "md",
  tone = "brand",
  className,
}: IconBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center shrink-0",
        sizeClasses[size],
        toneClasses[tone],
        className
      )}
    >
      <Icon aria-hidden="true" />
    </span>
  );
}
