"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { McpStatusPill } from "./McpStatusPill";
import type { McpPrompt } from "./mcpContent";

/**
 * One chat-style example prompt with a copy button. Client island — the
 * only interaction here is clipboard writing, so the rest of the page can
 * stay server-rendered.
 */
export function McpExamplePrompt({ prompt }: { prompt: McpPrompt }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(prompt.text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard API unavailable — the prompt text is still selectable.
    }
  }

  return (
    <div className="surface-card p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between gap-3">
        <McpStatusPill status={prompt.status} />
      </div>

      <div className="flex items-start justify-between gap-3 rounded-xl bg-brand-primary/[0.06] px-3.5 py-2.5">
        <p className="text-sm text-text-primary">&ldquo;{prompt.text}&rdquo;</p>
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-border/60 bg-background px-2.5 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:border-brand-primary/40 hover:text-brand-primary"
          aria-label={`Copy prompt: ${prompt.text}`}
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-brand-primary" aria-hidden="true" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              Copy
            </>
          )}
        </button>
      </div>

      {prompt.answer && (
        <div className="mt-2.5 rounded-xl bg-surface px-3.5 py-2.5">
          <p className="text-sm text-text-secondary">{prompt.answer}</p>
        </div>
      )}
    </div>
  );
}
