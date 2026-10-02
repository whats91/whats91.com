import { ArrowRight, Bot, CheckCircle2, KeySquare, ServerCog, ShieldCheck, Wrench } from "lucide-react";

const nodes = [
  { icon: Bot, label: "AI client", sub: "ChatGPT · Claude · Grok · Gemini" },
  { icon: KeySquare, label: "Secure MCP connection", sub: "OAuth 2.1 · Streamable HTTP" },
  { icon: ServerCog, label: "Whats91 MCP Gateway", sub: "separate product service" },
  { icon: ShieldCheck, label: "Permission & scope check", sub: "per-request" },
  { icon: Wrench, label: "Approved tool", sub: "schema-validated" },
  { icon: CheckCircle2, label: "Scoped result", sub: "bound to your account" },
];

// Stagger step between adjacent nodes/arrows — tuned against the 3.2s glow
// and 2.6s arrow-pulse durations in globals.css so the sequence reads as
// one continuous wave crossing the pipeline, not six things blinking at once.
const STEP = 0.4;

/**
 * The one developer moment (dark `ink` band, B11). A single clean pipeline
 * diagram — deeper protocol detail (PKCE, DCR, JSON-RPC, token rotation)
 * intentionally stays out of the page copy and lives in the developer docs.
 * Each node glows and each connecting arrow pulses in left-to-right
 * sequence, plus a slow light sweep crosses the panel, so the diagram
 * reads as live data moving through the connection.
 */
export function McpArchitectureDiagram() {
  return (
    <div
      aria-label="Illustrative documented architecture: AI client, authorised connection, product gateway, permission check, approved tool and account-scoped result. Current operation requires verification."
      className="relative overflow-hidden rounded-2xl border border-ink-border bg-ink-elevated p-5 sm:p-7"
    >
      <span
        aria-hidden="true"
        className="mcp-scan-line pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent"
      />

      <div className="relative flex flex-col items-stretch gap-3 lg:flex-row lg:items-center lg:gap-2">
        {nodes.map((node, i) => {
          const Icon = node.icon;
          return (
            <div key={node.label} className="flex items-center gap-2 lg:flex-1 lg:flex-col lg:gap-0">
              <div className="flex w-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-3 transition-colors duration-300 hover:border-brand-accent/30 hover:bg-white/[0.06] lg:flex-col lg:items-center lg:gap-1.5 lg:px-2.5 lg:py-4 lg:text-center">
                <span
                  className="mcp-node-badge flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-accent/15 text-brand-accent"
                  style={{ animationDelay: `${i * STEP}s` }}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold leading-tight text-white">{node.label}</p>
                  <p className="mt-0.5 text-[10px] leading-tight text-ink-text-muted">{node.sub}</p>
                </div>
              </div>
              {i < nodes.length - 1 && (
                <ArrowRight
                  className="mcp-arrow-flow mx-auto h-4 w-4 shrink-0 rotate-90 text-brand-accent lg:rotate-0"
                  style={{ animationDelay: `${i * STEP + STEP / 2}s` }}
                  aria-hidden="true"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
