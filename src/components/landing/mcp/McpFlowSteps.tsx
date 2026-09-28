import { mcpSteps } from "./mcpContent";

/**
 * Four-step "connect in minutes" flow. Business-framed; the technical
 * version of this same journey lives in McpArchitectureDiagram.
 */
export function McpFlowSteps() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {mcpSteps.map((step) => (
        <div key={step.n} className="surface-card relative p-5">
          <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white shadow-md shadow-brand-primary/20">
            {step.n}
          </div>
          <h3 className="mb-1.5 text-base font-semibold text-text-primary">{step.title}</h3>
          <p className="text-body-sm">{step.body}</p>
        </div>
      ))}
    </div>
  );
}
