"use client";

import { useId, useState } from "react";

import { utilityExample } from "@/lib/utility-example";

export function UtilityCodeSandbox() {
  const id = useId();
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="rounded-xl bg-ink-elevated border border-ink-border overflow-hidden shadow-2xl">
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-ink-border">
        <div className="flex min-w-0 items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          <span id={`${id}-label`} className="min-w-0 break-all text-xs text-ink-text-muted ml-2 font-mono">utility-template.sh</span>
        </div>
        <button
          type="button"
          aria-expanded={showCode}
          aria-controls={`${id}-code`}
          aria-label={showCode ? "Collapse utility template code" : "Expand utility template code"}
          onClick={() => setShowCode(!showCode)}
          className="min-h-11 px-3 rounded-lg border border-ink-text-muted text-xs text-ink-text-muted hover:text-ink-text transition-colors"
        >
          {showCode ? "Collapse" : "Expand"}
        </button>
      </div>
      <p id={`${id}-hint`} className="px-4 pt-3 text-xs text-ink-text-muted">Scroll the code panel to read the full example.</p>
      <pre id={`${id}-code`} role="region" aria-labelledby={`${id}-label`} aria-describedby={`${id}-hint`} tabIndex={0}
        className={`p-4 text-xs sm:text-sm text-ink-text overflow-auto font-mono leading-relaxed ${showCode ? "" : "max-h-32"}`}
      >
        {utilityExample}
      </pre>
    </div>
  );
}
