import { McpStatusPill } from "./McpStatusPill";
import type { McpClient } from "./mcpContent";

const monogram: Record<McpClient["id"], string> = {
  chatgpt: "GPT",
  claude_code: "C",
  grok: "xAI",
  gemini: "G",
};

/**
 * Neutral text/monogram client chip — no third-party logo assets are
 * bundled in this repository, so we use tasteful name treatments instead
 * of approximating or redrawing official marks (blueprint D4/OD-8).
 */
export function McpClientCard({ client }: { client: McpClient }) {
  return (
    <div className="surface-card surface-card-hover flex h-full flex-col gap-3 p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-xs font-bold text-brand-primary"
            aria-hidden="true"
          >
            {monogram[client.id]}
          </span>
          <span className="text-base font-semibold text-text-primary">{client.name}</span>
        </div>
        <McpStatusPill status={client.status} />
      </div>
      <p className="text-sm font-medium text-text-primary">{client.headline}</p>
      <p className="text-body-sm">{client.detail}</p>
    </div>
  );
}
