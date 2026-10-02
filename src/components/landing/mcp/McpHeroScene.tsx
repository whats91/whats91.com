import { Lock } from "lucide-react";
import { BrandLogo } from "@/components/shared";
import { mcpClients, statusLabel } from "./mcpContent";

/* ------------------------------------------------------------------ *
 * Desktop connector geometry. One coordinate space (VB) drives both
 * the SVG paths and the percentage-positioned client chips, so they
 * stay locked together at any width — the same technique used by the
 * homepage IntegrationsBand scene, reimplemented here (not imported)
 * since this hero tells a different, single-sided story: four clients
 * flowing into one consent-gated hub, with one approved tool and one
 * result card, never an open pipe.
 * ------------------------------------------------------------------ */
const VB = { w: 900, h: 520 };
const HUB = { x: 610, y: 260 };
const HUB_HALF = 60;
const EDGE_L = 250;
const ROWS = mcpClients.length;
const pct = (v: number, of: number) => `${(v / of) * 100}%`;
const rowY = (i: number) => 60 + (i * (VB.h - 120)) / (ROWS - 1);

function connectorPath(y: number) {
  const bend = 110;
  const hubEdge = HUB.x - HUB_HALF;
  return `M ${EDGE_L} ${y} C ${EDGE_L + bend} ${y} ${hubEdge - bend} ${HUB.y} ${hubEdge} ${HUB.y}`;
}

function ConnectorLayer() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {mcpClients.map((client, i) => {
        const y = rowY(i);
        const d = connectorPath(y);
        const active = client.status !== "confirm";
        return (
          <g key={client.id}>
            <path d={d} className="conn-base" vectorEffect="non-scaling-stroke" pathLength={100} />
            {active && (
              <path
                d={d}
                className="conn-comet"
                vectorEffect="non-scaling-stroke"
                pathLength={100}
              />
            )}
            <circle cx={EDGE_L} cy={y} r={3.2} fill={active ? "#45BC96" : "#94A3B8"} />
          </g>
        );
      })}
    </svg>
  );
}

function HeroClientChip({ client }: { client: (typeof mcpClients)[number] }) {
  const dim = client.status === "confirm";
  return (
    <div
      className={`flex items-center gap-2.5 rounded-xl border bg-background px-3 py-2 shadow-sm transition-colors ${
        dim ? "border-border/60 opacity-70" : "border-brand-primary/30"
      }`}
    >
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold ${
          dim ? "bg-surface-subtle text-text-muted" : "bg-brand-primary/10 text-brand-primary"
        }`}
      >
        {client.name.slice(0, 2).toUpperCase()}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-xs font-semibold text-text-primary">{client.name}</span>
        <span className="block truncate text-[10px] text-text-muted">
          {statusLabel[client.status]}
        </span>
      </span>
    </div>
  );
}

function Hub() {
  return (
    <div className="relative aspect-square w-full">
      <span aria-hidden="true" className="absolute -inset-[18%] rounded-full bg-[#45BC96]/12 blur-2xl" />
      <span aria-hidden="true" className="hub-ring absolute inset-0 rounded-[26%] border-2 border-[#45BC96]/45" />
      <span aria-hidden="true" className="hub-ring hub-ring-late absolute inset-0 rounded-[26%] border-2 border-[#45BC96]/45" />
      <div className="absolute inset-0 flex items-center justify-center rounded-[26%] bg-white shadow-xl ring-1 ring-black/5">
        <BrandLogo className="h-[56%] w-[56%]" />
      </div>
    </div>
  );
}

function LockBadge() {
  return (
    <span className="mcp-pulse inline-flex items-center gap-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 px-2.5 py-1 text-[10px] font-semibold text-brand-primary">
      <Lock className="h-3 w-3" aria-hidden="true" />
      Illustrative flow
    </span>
  );
}

function ResultCard() {
  return (
    <div className="w-[168px] rounded-xl border border-border/70 bg-background p-3 shadow-md">
      <p className="text-[10px] font-medium uppercase tracking-wide text-text-muted">Example report</p>
      <p className="mt-1 text-sm font-bold tabular-nums text-text-primary">9,540 delivered</p>
      <p className="text-[11px] tabular-nums text-brand-primary">7,890 read · 82%</p>
    </div>
  );
}

/**
 * Hero visual — four AI-client chips flow into the Whats91 hub through a
 * consent-gated connection; an approved tool returns a scoped result card.
 * Purely decorative (aria-hidden): the 5-5-5 message lives in the adjacent
 * hero text. Desktop renders the orbital connector scene; below `lg` it
 * collapses to a legible vertical flow.
 */
export function McpHeroScene() {
  return (
    <div className="select-none">
      <p className="mb-4 text-center text-caption">Illustrative example · sample numbers, no account connection</p>
      <div aria-hidden="true">
      {/* Desktop: connector scene */}
      <div
        className="relative mx-auto hidden w-full max-w-[560px] lg:block"
        style={{ aspectRatio: `${VB.w} / ${VB.h}` }}
      >
        <ConnectorLayer />

        {mcpClients.map((client, i) => (
          <div
            key={client.id}
            className="absolute flex justify-start"
            style={{ left: 0, width: pct(EDGE_L, VB.w), top: pct(rowY(i), VB.h), transform: "translateY(-50%)" }}
          >
            <HeroClientChip client={client} />
          </div>
        ))}

        <div
          className="absolute flex flex-col items-center gap-2"
          style={{ left: pct(HUB.x, VB.w), top: pct(HUB.y, VB.h), width: pct(HUB_HALF * 2, VB.w), transform: "translate(-50%, -50%)" }}
        >
          <Hub />
          <LockBadge />
        </div>

        <div
          className="absolute"
          style={{ right: 0, top: pct(HUB.y + 118, VB.h) }}
        >
          <ResultCard />
        </div>
      </div>

      {/* Mobile / tablet: vertical mini-flow */}
      <div className="mx-auto flex max-w-[280px] flex-col items-center gap-3 lg:hidden">
        <HeroClientChip client={mcpClients[0]} />
        <span className="conn-spine" />
        <LockBadge />
        <span className="conn-spine" />
        <div className="w-20">
          <Hub />
        </div>
        <span className="conn-spine" />
        <ResultCard />
      </div>
      </div>
    </div>
  );
}
