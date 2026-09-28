import { cn } from "@/lib/utils";
import { statusLabel, type McpStatus } from "./mcpContent";

const toneClasses: Record<McpStatus, string> = {
  available: "bg-brand-600 text-white border-brand-600",
};

interface McpStatusPillProps {
  status: McpStatus;
  className?: string;
}

/** Availability pill used across clients, capabilities, and prompts. */
export function McpStatusPill({ status, className }: McpStatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold whitespace-nowrap",
        toneClasses[status],
        className
      )}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white" aria-hidden="true" />
      {statusLabel[status]}
    </span>
  );
}
