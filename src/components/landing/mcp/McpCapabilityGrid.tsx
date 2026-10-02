import { McpStatusPill } from "./McpStatusPill";
import { mcpCapabilities, type McpCapability } from "./mcpContent";

function CapabilityCard({ capability }: { capability: McpCapability }) {
  const Icon = capability.icon;
  return (
    <div className="flex h-full flex-col gap-3 rounded-2xl border border-brand-primary/20 bg-brand-primary/[0.03] p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <McpStatusPill status={capability.status} />
      </div>
      <div>
        <h3 className="text-base font-semibold text-text-primary">{capability.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-text-secondary">{capability.line}</p>
      </div>
    </div>
  );
}

/** Source-reported capability areas; current enabled tools require confirmation. */
export function McpCapabilityGrid() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mcpCapabilities.map((c) => (
          <CapabilityCard key={c.id} capability={c} />
        ))}
      </div>

      <p className="rounded-xl border border-border/60 bg-surface/60 px-4 py-3 text-center text-sm text-text-secondary">
        These are source-reported capability areas; confirm the currently enabled tools and account permissions.
        Accounting, sales, orders and payment data are outside this page’s documented MCP scope.
      </p>
    </div>
  );
}
