"use client";

import { useState } from "react";

const developerExample = `curl -X POST "https://graph.facebook.com/v21.0/YOUR_PHONE_ID/messages" \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "messaging_product": "whatsapp",
    "to": "919876543210",
    "type": "template",
    "template": {
      "name": "order_confirmation",
      "language": { "code": "en" },
      "components": [
        {
          "type": "body",
          "parameters": [
            { "type": "text", "text": "ORD-12345" },
            { "type": "text", "text": "₹1,499" },
            { "type": "text", "text": "March 15, 2026" }
          ]
        }
      ]
    }
  }'`;

export function UtilityCodeSandbox() {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="rounded-xl bg-ink-elevated border border-ink-border overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 border-b border-ink-border">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
          <span className="text-xs text-ink-text-muted ml-2 font-mono">utility-template.sh</span>
        </div>
        <button
          onClick={() => setShowCode(!showCode)}
          className="text-xs text-ink-text-muted hover:text-ink-text transition-colors"
        >
          {showCode ? "Collapse" : "Expand"}
        </button>
      </div>
      <pre
        className={`p-4 text-xs sm:text-sm text-ink-text overflow-x-auto font-mono leading-relaxed ${showCode ? "" : "max-h-32"}`}
      >
        {developerExample}
      </pre>
    </div>
  );
}
