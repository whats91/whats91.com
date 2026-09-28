import type { LucideIcon } from "lucide-react";
import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface TrustPillProps {
  icon?: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

/**
 * Small proof chip shown in wrapping rows under hero CTAs
 * (e.g. "Meta-hosted Cloud API", "Local INR Billing").
 */
export function TrustPill({ icon: Icon = CheckCircle2, children, className }: TrustPillProps) {
  return (
    <span className={cn("trust-pill", className)}>
      <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-brand-primary" aria-hidden="true" />
      <span>{children}</span>
    </span>
  );
}
