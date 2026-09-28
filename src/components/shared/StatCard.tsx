import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconBadge } from "./IconBadge";

interface StatCardProps {
  value: string;
  label: string;
  icon?: LucideIcon;
  /** Small sub-line under the label, e.g. "vs 42% for email" */
  caption?: string;
  className?: string;
}

/**
 * Metric tile for stats bands and hero side panels.
 * Use inside `grid grid-cols-2 lg:grid-cols-4 gap-4`.
 * Only present verifiable numbers — never invent metrics.
 */
export function StatCard({ value, label, icon: Icon, caption, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "surface-card surface-card-hover p-5 sm:p-6 flex flex-col items-center text-center gap-1.5",
        className
      )}
    >
      {Icon && <IconBadge icon={Icon} size="lg" className="mb-1" />}
      <div className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
        {value}
      </div>
      <div className="text-body-sm">{label}</div>
      {caption && <div className="text-caption">{caption}</div>}
    </div>
  );
}
