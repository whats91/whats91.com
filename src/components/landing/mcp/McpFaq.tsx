"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { mcpFaqItems } from "./mcpContent";

/**
 * FAQ accordion — visible copy sourced from mcpContent so it can never
 * drift from the FAQPage JSON-LD generated from the same array in
 * src/app/mcp/page.tsx.
 */
export function McpFaq() {
  const [openId, setOpenId] = useState<string | null>(mcpFaqItems[0]?.id ?? null);

  return (
    <div className="space-y-3">
      {mcpFaqItems.map((faq) => {
        const isOpen = openId === faq.id;
        return (
          <div key={faq.id} className="overflow-hidden rounded-xl border border-border/60 bg-background">
            <h3>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                aria-expanded={isOpen}
                aria-controls={`mcp-faq-panel-${faq.id}`}
                className="flex w-full items-center justify-between gap-4 p-4 text-left sm:p-5"
              >
                <span className="text-sm font-medium text-text-primary sm:text-base">{faq.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-text-muted transition-transform duration-200 motion-reduce:transition-none ${
                    isOpen ? "rotate-180 text-brand-primary" : ""
                  }`}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div id={`mcp-faq-panel-${faq.id}`} role="region" hidden={!isOpen} className="px-4 pb-4 sm:px-5 sm:pb-5">
              <p className="text-body-sm">{faq.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
