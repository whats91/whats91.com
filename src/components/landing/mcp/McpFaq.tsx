import { ChevronDown } from "lucide-react";
import { mcpFaqItems } from "./mcpContent";

/** Native disclosures work before hydration and share the schema/alternate contract. */
export function McpFaq() {
  return <div className="space-y-3">{mcpFaqItems.map((faq, index) => (
    <details key={faq.id} open={index === 0} className="group overflow-hidden rounded-xl border border-border/60 bg-background">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-left focus-visible:outline-2 focus-visible:outline-brand-primary sm:p-5">
        <span className="text-sm font-medium text-text-primary sm:text-base">{faq.q}</span>
        <ChevronDown className="h-5 w-5 shrink-0 text-text-muted transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
      </summary>
      <div id={`mcp-faq-panel-${faq.id}`} className="px-4 pb-4 sm:px-5 sm:pb-5"><p className="text-body-sm">{faq.a}</p></div>
    </details>
  ))}</div>;
}
