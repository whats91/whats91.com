import { ArrowRight, Check, X } from "lucide-react";

const rows = [
  { without: "Open the dashboard, filter, export", with: 'Ask: "How did today\'s messages perform?"' },
  { without: "Manual reports & screenshots", with: "Natural-language answers, in seconds" },
  { without: "Copy-paste between tools", with: "Live business context, right in your AI" },
  { without: "Build against raw APIs", with: "AI-ready, permission-scoped tools" },
  { without: "Hope you're reading the right number", with: "Answers from your account, scoped to you" },
];

/**
 * Before/After comparison — the emotional turn from friction to flow.
 * Two-column table on desktop, stacked cards from `md` down.
 */
export function McpComparison() {
  return (
    <div className="relative grid gap-5 md:grid-cols-2 md:items-stretch">
      <div className="rounded-2xl border border-border/60 bg-surface/60 p-5 sm:p-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">Without Whats91 MCP</p>
        <ul className="space-y-3">
          {rows.map((row) => (
            <li key={row.without} className="flex items-start gap-2.5 text-sm text-text-secondary">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-text-muted" aria-hidden="true" />
              {row.without}
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-brand-primary/25 bg-brand-primary/[0.04] p-5 shadow-sm sm:p-6">
        <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-brand-primary">With Whats91 MCP</p>
        <ul className="space-y-3">
          {rows.map((row) => (
            <li key={row.with} className="flex items-start gap-2.5 text-sm font-medium text-text-primary">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" aria-hidden="true" />
              {row.with}
            </li>
          ))}
        </ul>
      </div>

      <div className="pointer-events-none absolute inset-x-0 hidden items-center justify-center md:flex" aria-hidden="true">
        <span className="rounded-full bg-background p-2 shadow-md ring-1 ring-border/60">
          <ArrowRight className="h-4 w-4 text-brand-primary" />
        </span>
      </div>
    </div>
  );
}
