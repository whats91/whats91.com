import { mcpTrustItems } from "./mcpContent";

/**
 * Icon-led trust grid — the verified security model (Part D2 of the
 * blueprint) translated into plain reassurance. Deliberately no "bank-grade
 * / military-grade / certified" language: controls are code-reviewed, not
 * pen-tested or certified.
 */
export function McpTrustGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {mcpTrustItems.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.id} className="surface-card p-5">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mb-1 text-sm font-semibold text-text-primary">{item.title}</h3>
            <p className="text-body-sm">{item.line}</p>
          </div>
        );
      })}
    </div>
  );
}
