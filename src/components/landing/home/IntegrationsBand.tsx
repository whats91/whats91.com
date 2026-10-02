import Link from "next/link";
import {
  Bot,
  Calculator,
  Database,
  type LucideIcon,
  PlugZap,
  ShoppingCart,
  Sparkles,
  Table2,
  Terminal,
  Webhook,
  Zap,
} from "lucide-react";
import { Container, Section, SectionHeader, Reveal, BrandLogo } from "@/components/shared";

/* ------------------------------------------------------------------ *
 * Data model. Each side is a list of nodes; adding a future
 * integration is a single entry — geometry, connector, comet, and
 * card layout are all derived from the list index.
 * ------------------------------------------------------------------ */
interface IntegrationNode {
  id: string;
  name: string;
  detail: string;
  icon: LucideIcon;
  /** Internal page for the integration, when one exists. */
  href?: string;
}

const businessSystems: IntegrationNode[] = [
  { id: "busy-erp", name: "Busy ERP", detail: "Invoices, ledger & reports", icon: Database, href: "/solutions/busy-erp" },
  { id: "miracle", name: "Miracle Accounting", detail: "Documents & statements", icon: Calculator, href: "/solutions/miracle-whatsapp-api" },
  { id: "sheets", name: "Google Sheets", detail: "Confirm sync requirements", icon: Table2, href: "/google-sheets-integration" },
  { id: "ecommerce", name: "E-commerce & Orders", detail: "Storefront + order management", icon: ShoppingCart, href: "/solutions/busy-ecommerce" },
  { id: "api", name: "REST API & Webhooks", detail: "Custom workflows", icon: Webhook, href: "/solutions/busy-api" },
];

const aiAgents: IntegrationNode[] = [
  { id: "mcp", name: "MCP Server", detail: "Confirm product access", icon: PlugZap },
  { id: "claude-code", name: "Claude Code", detail: "Confirm MCP support", icon: Terminal },
  { id: "chatgpt", name: "ChatGPT", detail: "Confirm MCP support", icon: Bot },
  { id: "gemini", name: "Gemini", detail: "Agent-readable APIs", icon: Sparkles },
  { id: "groq", name: "Groq", detail: "Agent-readable APIs", icon: Zap },
];

/* ------------------------------------------------------------------ *
 * Connector geometry. One design coordinate space (1120 × 600) drives
 * both the SVG paths and the percentage-positioned HTML cards, so they
 * stay locked together at any width. The container's aspect-ratio
 * matches the viewBox, so the scene scales uniformly (no distortion).
 * ------------------------------------------------------------------ */
const VB = { w: 1120, h: 600 };
const HUB = { x: 560, y: 300 };
const HUB_HALF = 66; // hub card half-width; paths meet its edges
const EDGE_L = 270; // x where left cards end / paths begin
const EDGE_R = VB.w - EDGE_L; // 850, mirror on the right
const ROWS = businessSystems.length; // rows per side
const pct = (v: number, of: number) => `${(v / of) * 100}%`;
const rowY = (i: number) => 66 + (i * (VB.h - 132)) / (ROWS - 1); // 66 → 534

/** Smooth S-curve from a side card edge into the matching hub edge. */
function connectorPath(side: "left" | "right", y: number) {
  const startX = side === "left" ? EDGE_L : EDGE_R;
  const hubEdge = side === "left" ? HUB.x - HUB_HALF : HUB.x + HUB_HALF;
  const bend = side === "left" ? 122 : -122;
  return `M ${startX} ${y} C ${startX + bend} ${y} ${hubEdge - bend} ${HUB.y} ${hubEdge} ${HUB.y}`;
}

function ConnectorLayer() {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="none"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      {(["left", "right"] as const).flatMap((side) =>
        Array.from({ length: ROWS }, (_, i) => {
          const y = rowY(i);
          const d = connectorPath(side, y);
          const startX = side === "left" ? EDGE_L : EDGE_R;
          return (
            <g key={`${side}-${i}`}>
              <path d={d} className="conn-base" vectorEffect="non-scaling-stroke" pathLength={100} />
              <path
                d={d}
                className="conn-comet"
                vectorEffect="non-scaling-stroke"
                pathLength={100}
                style={{ animationDelay: `${(side === "left" ? i : i + 0.5) * 0.34}s` }}
              />
              {/* port dot where the connector meets the card */}
              <circle cx={startX} cy={y} r={3.2} fill="#45BC96" />
            </g>
          );
        })
      )}
    </svg>
  );
}

function Hub({ withLabel = false }: { withLabel?: boolean }) {
  return (
    <div className="relative aspect-square w-full">
      <span aria-hidden="true" className="absolute -inset-[18%] rounded-full bg-[#45BC96]/12 blur-2xl" />
      <span aria-hidden="true" className="hub-ring absolute inset-0 rounded-[26%] border-2 border-[#45BC96]/45" />
      <span aria-hidden="true" className="hub-ring hub-ring-late absolute inset-0 rounded-[26%] border-2 border-[#45BC96]/45" />
      <div className="absolute inset-0 flex items-center justify-center rounded-[26%] bg-white shadow-xl ring-1 ring-black/5">
        <BrandLogo className="h-[58%] w-[58%]" />
      </div>
      {withLabel && (
        <span className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap text-sm font-semibold text-text-primary">
          Whats91
        </span>
      )}
    </div>
  );
}

function NodeCard({ node, side }: { node: IntegrationNode; side: "left" | "right" }) {
  const Icon = node.icon;
  const alignRight = side === "left";
  const body = (
    <>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      </span>
      <span className={`min-w-0 ${alignRight ? "text-right" : "text-left"}`}>
        <span className="block truncate text-sm font-semibold text-text-primary">{node.name}</span>
        <span className="block truncate text-xs text-text-secondary">{node.detail}</span>
      </span>
    </>
  );
  const base =
    "flex items-center gap-3 rounded-xl border border-border/60 bg-background px-3.5 py-2.5 shadow-sm transition-all duration-200 w-full";
  const order = alignRight ? "flex-row-reverse" : "flex-row";

  if (node.href) {
    return (
      <Link href={node.href} className={`${base} ${order} hover:-translate-y-0.5 hover:border-brand-primary/40 hover:shadow-md`}>
        {body}
      </Link>
    );
  }
  return <div className={`${base} ${order}`}>{body}</div>;
}

/**
 * Integrations band. Business systems on one side, AI assistants and agents
 * on the other, all connecting into the central Whats91 hub. Desktop renders
 * an SVG connector scene with comets flowing toward the hub; below `lg` it
 * collapses to a hub + responsive card grid.
 */
export function IntegrationsBand() {
  return (
    <Section id="integrations" tone="surface" aria-labelledby="integrations-heading">
      <Container>
        <SectionHeader
          eyebrow="Integrations"
          id="integrations-heading"
          title="Plug Whats91 into the tools you already run"
          description="Explore ERP, commerce and spreadsheet integrations alongside AI assistant paths. Confirm product support and account eligibility for the integration you need."
        />

        {/* Desktop: SVG connector scene ------------------------------------ */}
        <Reveal className="hidden lg:block">
          <div
            className="relative mx-auto w-full max-w-[1120px]"
            style={{ aspectRatio: `${VB.w} / ${VB.h}` }}
          >
            <ConnectorLayer />

            <div className="pointer-events-none absolute left-6 top-0 text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Business systems
            </div>
            <div className="pointer-events-none absolute right-6 top-0 text-right text-xs font-semibold uppercase tracking-wider text-text-secondary">
              AI assistants &amp; agents
            </div>

            {businessSystems.map((node, i) => (
              <div
                key={node.id}
                className="absolute flex justify-end"
                style={{ left: 0, width: pct(EDGE_L, VB.w), top: pct(rowY(i), VB.h), transform: "translateY(-50%)" }}
              >
                <NodeCard node={node} side="left" />
              </div>
            ))}

            {aiAgents.map((node, i) => (
              <div
                key={node.id}
                className="absolute flex justify-start"
                style={{ right: 0, width: pct(EDGE_L, VB.w), top: pct(rowY(i), VB.h), transform: "translateY(-50%)" }}
              >
                <NodeCard node={node} side="right" />
              </div>
            ))}

            <div
              className="absolute"
              style={{ left: "50%", top: "50%", width: pct(HUB_HALF * 2, VB.w), transform: "translate(-50%, -50%)" }}
            >
              <Hub />
            </div>
          </div>
        </Reveal>

        {/* Mobile / tablet: hub above a responsive card grid --------------- */}
        <Reveal className="lg:hidden">
          <div className="flex flex-col items-center">
            <div className="w-24">
              <Hub withLabel />
            </div>
            <span aria-hidden="true" className="conn-spine my-6 mt-10" />
            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
              {[...businessSystems, ...aiAgents].map((node) => (
                <NodeCard key={node.id} node={node} side="right" />
              ))}
            </div>
          </div>
        </Reveal>

        <p className="mt-10 text-center text-sm text-text-secondary">
          Explore product MCP access on the MCP page. Public website content is available through{" "}
          <code className="rounded bg-surface-subtle px-1.5 py-0.5 text-xs">whats91.com/api/mcp</code> — a read-only content catalogue, not an executable tool gateway.
        </p>
      </Container>
    </Section>
  );
}
