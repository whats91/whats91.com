import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Check,
  CheckCircle2,
  CheckCheck,
  Database,
  Eye,
  FileSpreadsheet,
  Headset,
  Mail,
  MessageSquare,
  MousePointerClick,
  Phone,
  Send,
  ShoppingBag,
  Smartphone,
  Sparkles,
  X,
} from "lucide-react";
import {
  Container,
  Section,
  SectionHeader,
  Reveal,
  BrandLogo,
} from "@/components/shared";

/* ================================================================== */
/* Scene 1 — Campaign report (Reach). An approved Marketing broadcast   */
/* reports itself: the funnel bars fill (Delivered → Read → Clicked)    */
/* and an honest WhatsApp-vs-email read comparison lands.               */
/*                                                                       */
/* Data note: illustrative figures for one opted-in Marketing broadcast, */
/* kept internally consistent (each funnel stage ≤ the previous) and to  */
/* defensible ranges — WhatsApp read rates run several times higher than */
/* the ~21% average email open (Mailchimp all-industry benchmark),       */
/* not the blanket "98%" that only transactional utility templates near. */
/* ================================================================== */

function MetricBar({ tone, barW, delay = 0 }: { tone: string; barW: string; delay?: number }) {
  // Bar sits at its target width at all times (always legible, reduced-motion
  // safe); a soft highlight sweeps across it for continuous, non-resetting
  // motion in the spirit of the connector scene.
  return (
    <div className="h-1.5 rounded-full bg-surface-subtle overflow-hidden">
      <div
        className={`camp-bar-flow h-full rounded-full ${tone} ${barW}`}
        style={{ animationDelay: `${delay}s` }}
      />
    </div>
  );
}

function FunnelRow({
  icon: Icon,
  label,
  value,
  pct,
  barW,
  tone,
  delay = 0,
  emphasize = false,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  pct: string;
  /** Target width utility, e.g. "w-[80%]" — the always-on, reduced-motion state */
  barW: string;
  tone: string;
  delay?: number;
  emphasize?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="flex items-center gap-1.5 text-text-muted">
          <Icon className="h-3 w-3" aria-hidden="true" />
          {label}
        </span>
        <span className={`font-semibold tabular-nums ${emphasize ? "text-brand-primary" : "text-text-primary"}`}>
          {value}
          <span className="ml-1 font-normal text-text-muted">· {pct}</span>
        </span>
      </div>
      <MetricBar tone={tone} barW={barW} delay={delay} />
    </div>
  );
}

function CompareRow({
  icon: Icon,
  label,
  pct,
  barW,
  tone,
  delay = 0,
  strong = false,
}: {
  icon: React.ElementType;
  label: string;
  pct: string;
  barW: string;
  tone: string;
  delay?: number;
  strong?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="flex w-[92px] shrink-0 items-center gap-1 text-[10px] text-text-muted">
        <Icon className="h-3 w-3" aria-hidden="true" />
        {label}
      </span>
      <div className="h-1.5 flex-1 rounded-full bg-surface-subtle overflow-hidden">
        <div className={`camp-bar-flow h-full rounded-full ${tone} ${barW}`} style={{ animationDelay: `${delay}s` }} />
      </div>
      <span className={`w-8 text-right text-[10px] font-semibold tabular-nums ${strong ? "text-brand-primary" : "text-text-muted"}`}>
        {pct}
      </span>
    </div>
  );
}

function CampaignJourneyScene() {
  return (
    <div aria-hidden="true" className="relative select-none">
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand-50 via-brand-50/40 to-transparent" />
      <div className="relative surface-card p-5 shadow-lg max-w-md mx-auto">
        {/* Header: campaign + category */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
              <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold leading-tight text-text-primary">Diwali Sale</p>
              <p className="text-[11px] leading-tight text-text-muted">Broadcast · 12,480 recipients</p>
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-brand-primary/10 px-2 py-0.5 text-[10px] font-semibold text-brand-primary">
            Marketing
          </span>
        </div>

        {/* Approved status */}
        <div className="mb-3 flex items-center gap-1.5 text-[11px] font-medium text-success">
          <span className="flex h-4 w-4 items-center justify-center rounded-full border border-success-border bg-success-soft">
            <Check className="h-2.5 w-2.5" aria-hidden="true" />
          </span>
          Template approved by Meta
        </div>

        {/* Message preview */}
        <div className="mb-4 rounded-xl border border-border/50 bg-surface/60 p-3">
          <div className="max-w-[280px] rounded-2xl rounded-bl-md border border-border/60 bg-card px-3.5 py-2.5 text-xs text-text-primary shadow-sm">
            <p className="leading-relaxed">
              Hi <span className="font-mono text-brand-primary">{"{{1}}"}</span> 🪔 Diwali Sale is live — flat{" "}
              <span className="font-mono text-brand-primary">{"{{2}}"}</span> off everything. Ends tonight.
            </p>
            <div className="mt-2 border-t border-border/60 pt-2 text-center text-[11px] font-semibold text-brand-primary">
              Shop Diwali Sale
            </div>
          </div>
        </div>

        {/* Delivery funnel (of the 12,480 sent; read & tap rates are of delivered) */}
        <div className="space-y-2.5">
          <FunnelRow icon={Send} label="Delivered" value="12,240" pct="98%" barW="w-[98%]" tone="bg-brand-300" delay={0} />
          <FunnelRow icon={Eye} label="Read" value="9,790" pct="80%" barW="w-[80%]" tone="bg-brand-primary" delay={0.4} emphasize />
          <FunnelRow icon={MousePointerClick} label="Tapped ‘Shop’" value="1,840" pct="15%" barW="w-[15%]" tone="bg-brand-500" delay={0.8} />
        </div>

        {/* Honest read-rate comparison */}
        <div className="mt-4 border-t border-border/50 pt-3">
          <p className="mb-2 text-[10px] font-medium uppercase tracking-wide text-text-muted">Read rate vs email</p>
          <div className="space-y-1.5">
            <CompareRow icon={MessageSquare} label="WhatsApp" pct="80%" barW="w-[80%]" tone="bg-brand-primary" delay={1.1} strong />
            <CompareRow icon={Mail} label="Email avg" pct="21%" barW="w-[21%]" tone="bg-text-muted/40" delay={1.3} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Scene 2 — Flow execution (Automate). A message enters the canvas    */
/* and the flow runs: nodes light in sequence, the taken branch draws  */
/* itself, and the "handled by bot" badge lands.                       */
/* ================================================================== */

function FlowNode({
  icon: Icon,
  step,
  label,
  sub,
  delay = 0,
  dim = false,
}: {
  icon: React.ElementType;
  step?: string;
  label: string;
  sub?: string;
  /** Stagger for the tile's execution pulse, so the highlight steps through */
  delay?: number;
  dim?: boolean;
}) {
  return (
    <div
      className={`relative flex w-full items-center gap-2.5 rounded-xl border bg-card px-3 py-2.5 shadow-sm min-w-0 sm:w-auto sm:flex-1 ${
        dim ? "border-border/50 opacity-70" : "border-brand-primary/25"
      }`}
    >
      <span
        className={`flow-tile flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
          dim ? "bg-surface-subtle text-text-muted" : "bg-brand-primary/10 text-brand-primary"
        }`}
        style={dim ? undefined : { animationDelay: `${delay}s` }}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <div className="min-w-0">
        {step && <p className="text-[9px] font-medium uppercase tracking-wide text-text-muted leading-tight">{step}</p>}
        <p className="truncate text-[11px] font-semibold leading-tight text-text-primary">{label}</p>
        {sub && <p className="truncate text-[10px] leading-tight text-text-muted">{sub}</p>}
      </div>
    </div>
  );
}

/** Connector between two flow nodes: horizontal on desktop, vertical on mobile.
 *  Dashes flow toward the next node continuously; frozen (reduced motion) it
 *  stays a legible static dashed link. */
function FlowConnector() {
  return (
    <>
      <span aria-hidden="true" className="flow-link-h hidden h-[3px] w-10 shrink-0 self-center sm:block" />
      <span aria-hidden="true" className="flow-link-v h-5 w-[3px] self-center sm:hidden" />
    </>
  );
}

function FlowExecutionScene() {
  return (
    <div
      aria-hidden="true"
      className="relative select-none overflow-hidden rounded-2xl border border-border/60 bg-surface/40 p-5 sm:p-7"
      style={{
        backgroundImage: "radial-gradient(circle, var(--border) 1px, transparent 1px)",
        backgroundSize: "18px 18px",
      }}
    >
      {/* Main path: trigger → understand → act → reply */}
      <div className="mx-auto flex max-w-3xl flex-col items-stretch gap-3 sm:flex-row sm:gap-0">
        <FlowNode icon={MessageSquare} step="Trigger" label="New message" sub={'"Balance?"'} delay={0} />
        <FlowConnector />
        <FlowNode icon={Sparkles} step="Understand" label="AI intent" sub="ledger_inquiry" delay={0.5} />
        <FlowConnector />
        <FlowNode icon={Database} step="Act" label="Busy ERP lookup" sub="live ledger" delay={1} />
        <FlowConnector />
        <FlowNode icon={CheckCheck} step="Reply" label="Balance sent" sub="with pay link" delay={1.5} />
      </div>

      {/* Untaken branch: sentiment-aware handoff */}
      <div className="mx-auto mt-3 flex max-w-3xl items-center gap-2 pl-4 sm:pl-[26%]">
        <svg viewBox="0 0 28 26" className="h-6 w-7 shrink-0 text-border" aria-hidden="true">
          <path d="M4 0v14a8 8 0 0 0 8 8h14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
        </svg>
        <FlowNode icon={Headset} label="Human handoff" sub="if sentiment drops" dim />
      </div>

      {/* Outcome (always visible) */}
      <div className="mx-auto mt-5 flex max-w-3xl items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-success-border bg-success-soft px-3 py-1.5 text-[11px] font-semibold text-success">
          <CheckCheck className="h-3.5 w-3.5" aria-hidden="true" /> Auto-replied in ~3s — no agent needed
        </span>
        <span className="hidden font-mono text-[10px] text-text-muted sm:block">Flow Builder canvas</span>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Scene 3 — Sync pipeline (Integrate). Data pulses travel Busy ⇄      */
/* Whats91 ⇄ customer continuously; a fresh message badge pops each    */
/* cycle.                                                              */
/* ================================================================== */

/** Bidirectional sync link: an outbound lane (ERP data → customer) flows one
 *  way, a lighter inbound lane (queries → ERP) flows back. Frozen (reduced
 *  motion) it stays two legible dashed lanes. */
function SyncLink() {
  return (
    <div className="relative h-4 flex-1 min-w-4 max-w-16 self-center" aria-hidden="true">
      <span className="sync-out absolute inset-x-0 top-[3px] h-[2px]" />
      <span className="sync-in absolute inset-x-0 bottom-[3px] h-[2px]" />
    </div>
  );
}

function SyncNode({
  icon: Icon,
  label,
  sub,
  online = false,
}: {
  icon: React.ElementType;
  label: string;
  sub: string;
  online?: boolean;
}) {
  return (
    <div className="relative flex w-[92px] shrink-0 flex-col items-center gap-1.5 rounded-xl border border-border/60 bg-card px-2.5 py-3 text-center shadow-sm">
      {online && (
        <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-brand-600 shadow-sm ring-2 ring-card">
          <CheckCheck className="h-2.5 w-2.5 text-white" aria-hidden="true" />
        </span>
      )}
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary">
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <p className="text-[11px] font-semibold leading-tight text-text-primary">{label}</p>
      <p className="text-[9px] leading-tight text-text-muted">{sub}</p>
    </div>
  );
}

function SyncPipelineScene() {
  return (
    <div aria-hidden="true" className="relative select-none">
      <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-brand-50 via-brand-50/40 to-transparent" />
      <div className="relative mx-auto max-w-md rounded-2xl border border-border/60 bg-surface/40 p-5 sm:p-6">
        <div className="flex items-center justify-center gap-1.5">
          <SyncNode icon={Database} label="Busy ERP" sub="Invoices · Ledgers" />

          <SyncLink />

          {/* Whats91 sync engine — the real brand mark as the hub */}
          <div className="flex shrink-0 flex-col items-center gap-2">
            <div className="relative h-16 w-16">
              <span aria-hidden="true" className="hub-ring absolute inset-0 rounded-2xl border-2 border-brand-primary/40" />
              <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
                <BrandLogo className="h-9 w-9" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-[11px] font-semibold leading-tight text-text-primary">Whats91</p>
              <p className="text-[9px] leading-tight text-text-muted">Sync engine</p>
            </div>
          </div>

          <SyncLink />

          <SyncNode icon={Smartphone} label="Customer" sub="WhatsApp" online />
        </div>

        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-text-secondary">
          <FileSpreadsheet className="h-3.5 w-3.5 text-brand-primary" aria-hidden="true" />
          <span>Google Sheets &amp; Miracle sync included</span>
        </div>

        <p className="mt-2 text-center text-[10px] font-medium uppercase tracking-wider text-text-muted">
          Syncs every 10 minutes — no PC uptime required
        </p>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Comparison table (content preserved verbatim)                       */
/* ================================================================== */

const comparisonData = [
  { feature: "Hosting model", standard: "Depends on PC uptime", whats91: "Cloud-hosted workflow" },
  { feature: "Media Handling", standard: "15-day link expiry", whats91: "Direct secure PDF" },
  { feature: "Interactivity", standard: "Broadcast-only", whats91: "Full chatbot support" },
  { feature: "Scalability", standard: "256 contacts max", whats91: "500 msgs/second" },
];

function ComparisonBlock() {
  return (
    <Reveal>
      <div className="md:hidden space-y-3">
        <h4 className="heading-4 text-center mb-5">Standard vs Whats91 Enterprise</h4>
        {comparisonData.map((row) => (
          <div key={row.feature} className="surface-card p-4">
            <p className="text-sm font-semibold text-text-primary mb-3 pb-2.5 border-b border-border/60">
              {row.feature}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <span className="mt-0.5 h-4 w-4 rounded-full bg-error-soft flex items-center justify-center shrink-0">
                  <X className="h-2.5 w-2.5 text-error" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-caption mb-0.5">Standard</p>
                  <p className="text-body-sm">{row.standard}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="mt-0.5 h-4 w-4 rounded-full bg-success-soft flex items-center justify-center shrink-0">
                  <Check className="h-2.5 w-2.5 text-success" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-caption mb-0.5">Whats91</p>
                  <p className="text-sm text-text-primary font-medium">{row.whats91}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden md:block surface-card overflow-hidden">
        <div className="px-6 py-4 bg-surface/50 border-b border-border/60">
          <h4 className="heading-4">Standard Notifications vs. Whats91 Enterprise Cloud API</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-border/60 bg-surface/30">
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-primary">Feature</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-text-secondary">Standard Notification</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-brand-primary">Whats91 Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row) => (
                <tr key={row.feature} className="border-b border-border/40 last:border-b-0 hover:bg-surface/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-text-primary">{row.feature}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-error-soft flex items-center justify-center shrink-0">
                        <X className="h-2.5 w-2.5 text-error" aria-hidden="true" />
                      </span>
                      <span>{row.standard}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text-primary">
                    <div className="flex items-center gap-2">
                      <span className="h-4 w-4 rounded-full bg-success-soft flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 text-success" aria-hidden="true" />
                      </span>
                      <span className="font-medium">{row.whats91}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Reveal>
  );
}

/* ================================================================== */
/* Bento — the capabilities around the conversation. Every tile has    */
/* its own micro-visual; no two tiles share a layout.                  */
/* ================================================================== */

function BentoCapabilities() {
  const tile =
    "group relative surface-card surface-card-hover p-5 flex flex-col justify-between overflow-hidden";
  return (
    <div>
      <Reveal>
        <h3 className="heading-3 text-center mb-8 sm:mb-10">
          …and everything around the conversation
        </h3>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6 auto-rows-fr">
        {/* Calling — waveform */}
        <Reveal className="lg:col-span-3">
          <Link href="/whatsapp-business-calling" className={`${tile} h-full`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="heading-4 mb-1.5">WhatsApp Business Calling</p>
                <p className="text-body-sm">
                  Verified branded voice calls over the Cloud API — replace toll-free spend.
                </p>
              </div>
              <span className="icon-tile h-10 w-10 shrink-0"><Phone className="h-5 w-5" /></span>
            </div>
            <div className="mt-5 flex items-end gap-1 h-8" aria-hidden="true">
              {[0.4, 0.7, 1, 0.6, 0.85, 0.5, 0.95, 0.65, 0.8, 0.45, 0.9, 0.55].map((h, i) => (
                <span
                  key={i}
                  className="w-1.5 rounded-full bg-brand-300 origin-bottom [animation:wave-bar_1.4s_ease-in-out_infinite] motion-reduce:animate-none"
                  style={{ height: `${h * 100}%`, animationDelay: `${i * 0.09}s` }}
                />
              ))}
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary">
              Explore <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
            </span>
          </Link>
        </Reveal>

        {/* Coexistence — dual device swap */}
        <Reveal delay={1} className="lg:col-span-3">
          <Link href="/whatsapp-coexistence" className={`${tile} h-full`}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="heading-4 mb-1.5">Coexistence Mode</p>
                <p className="text-body-sm">
                  Keep the WhatsApp Business app on your phone while the API runs alongside.
                </p>
              </div>
              <span className="icon-tile h-10 w-10 shrink-0"><Smartphone className="h-5 w-5" /></span>
            </div>
            <div className="mt-5 flex items-center gap-3 text-text-muted" aria-hidden="true">
              <span className="rounded-lg border border-border/60 bg-surface/60 px-2.5 py-1.5 text-[10px] font-medium">📱 Business app</span>
              <span className="text-brand-primary [animation:swap-pulse_2.6s_ease-in-out_infinite] motion-reduce:animate-none">⇄</span>
              <span className="rounded-lg border border-brand-primary/30 bg-brand-primary/5 px-2.5 py-1.5 text-[10px] font-medium text-brand-700">☁️ Cloud API</span>
            </div>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-primary">
              Explore <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
            </span>
          </Link>
        </Reveal>

        {/* Reports — rising mini chart */}
        <Reveal className="lg:col-span-2">
          <Link href="/solutions/busy-reports" className={`${tile} h-full`}>
            <div>
              <span className="icon-tile h-9 w-9 mb-3"><BarChart3 className="h-4 w-4" /></span>
              <p className="heading-4 mb-1.5">Busy Reports</p>
              <p className="text-body-sm">Daily sales &amp; outstanding reports, delivered to owners.</p>
            </div>
            <div className="mt-4 flex items-end gap-1.5 h-10" aria-hidden="true">
              {[0.35, 0.55, 0.45, 0.7, 0.6, 0.9].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t bg-brand-200 origin-bottom [animation:mini-bar-grow_6s_ease-out_infinite] motion-reduce:animate-none"
                  style={{ height: `${h * 100}%`, animationDelay: `${i * 0.12}s` }}
                />
              ))}
            </div>
          </Link>
        </Reveal>

        {/* Reminders — ringing bell */}
        <Reveal delay={1} className="lg:col-span-2">
          <Link href="/solutions/payment-reminders" className={`${tile} h-full`}>
            <div>
              <span className="relative icon-tile h-9 w-9 mb-3">
                <Bell className="h-4 w-4 [animation:bell-ring_5s_ease-in-out_infinite] motion-reduce:animate-none" />
                <span className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full bg-brand-600 text-white text-[8px] font-bold flex items-center justify-center">3</span>
              </span>
              <p className="heading-4 mb-1.5">Payment Reminders</p>
              <p className="text-body-sm">Automated follow-ups with PDF statements and pay links.</p>
            </div>
            <p className="mt-4 text-[11px] text-text-muted" aria-hidden="true">
              Next run: <span className="font-mono text-text-secondary">daily 10:00</span>
            </p>
          </Link>
        </Reveal>

        {/* Storefront */}
        <Reveal delay={2} className="lg:col-span-2">
          <Link href="/solutions/busy-ecommerce" className={`${tile} h-full`}>
            <div>
              <span className="icon-tile h-9 w-9 mb-3"><ShoppingBag className="h-4 w-4" /></span>
              <p className="heading-4 mb-1.5">B2B/B2C Storefront</p>
              <p className="text-body-sm">White-label e-commerce synced to Busy stock and rates.</p>
            </div>
            <div className="mt-4 flex items-center gap-2" aria-hidden="true">
              <span className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-medium text-text-muted border border-border/50">Stock ✓</span>
              <span className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-medium text-text-muted border border-border/50">Rates ✓</span>
              <span className="rounded-full bg-brand-primary/10 px-2.5 py-1 text-[10px] font-medium text-brand-700">10-min sync</span>
            </div>
          </Link>
        </Reveal>

        {/* Chat shortcuts — self-typing command, full-width slim */}
        <Reveal className="sm:col-span-2 lg:col-span-6">
          <Link
            href="/features/chat-shortcuts-conversation-automation"
            className="group surface-card surface-card-hover px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4 overflow-hidden"
          >
            <div className="flex-1 min-w-0">
              <p className="heading-4 mb-1">Chat Shortcuts</p>
              <p className="text-body-sm">Slash-command canned replies — your agents answer in two keystrokes.</p>
            </div>
            <div className="flex items-center gap-3 shrink-0" aria-hidden="true">
              <span className="ink-panel px-3 py-2 font-mono text-xs text-ink-text flex items-center">
                <span className="inline-block overflow-hidden whitespace-nowrap align-bottom [animation:chip-type_5s_steps(9)_infinite] motion-reduce:animate-none motion-reduce:w-[9ch]">/invoice…</span>
                <span className="inline-block w-[2px] h-3.5 bg-brand-accent ml-0.5 [animation:caret-blink_1.1s_steps(1)_infinite] motion-reduce:animate-none" />
              </span>
              <ArrowRight className="h-4 w-4 text-brand-primary transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" />
            </div>
          </Link>
        </Reveal>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Pillar text column                                                  */
/* ================================================================== */

function PillarCopy({
  overline,
  title,
  lead,
  bullets,
  links,
}: {
  overline: string;
  title: string;
  lead: string;
  bullets: string[];
  links: { label: string; href: string }[];
}) {
  return (
    <>
      <p className="text-overline mb-3">{overline}</p>
      <h3 className="heading-2 mb-4">{title}</h3>
      <p className="text-body mb-6">{lead}</p>
      <ul className="space-y-3 mb-7">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
            <span className="text-sm sm:text-base text-text-primary">{bullet}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-700 transition-colors group"
          >
            {link.label}
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
          </Link>
        ))}
      </div>
    </>
  );
}

/* ================================================================== */

export function PlatformPillars() {
  return (
    <Section id="solutions" aria-labelledby="pillars-heading" className="overflow-x-clip">
      <Container>
        <SectionHeader
          eyebrow="The Whats91 Platform"
          eyebrowIcon={Bot}
          id="pillars-heading"
          title="One platform for every WhatsApp conversation"
          description="Marketing, automation, and ERP data working together on one official Cloud API number — not three disconnected tools."
        />

        <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
          {/* REACH — split, scene right */}
          <div className="grid gap-10 lg:gap-14 lg:grid-cols-2 items-center">
            <Reveal delay={1} className="min-w-0 order-2 lg:order-1">
              <PillarCopy
                overline="Reach"
                title="Campaigns your customers actually open"
                lead="Send approved utility and marketing templates to opted-in audiences that get read far more often than email — and recover carts, run Click-to-WhatsApp ads, and schedule broadcasts at Meta's exact rates."
                bullets={[
                  "Broadcasts read several times more than the average email open",
                  "Click-to-WhatsApp ads that route buyers straight into chat",
                  "Abandoned-cart recovery nudges 15–30 minutes after drop",
                  "Ready-made approved template library with variables",
                ]}
                links={[
                  { label: "Marketing & Engagement", href: "/solutions/marketing" },
                  { label: "Template library", href: "/whatsapp-templates" },
                ]}
              />
            </Reveal>
            <Reveal className="min-w-0 order-1 lg:order-2">
              <CampaignJourneyScene />
            </Reveal>
          </div>

          {/* AUTOMATE — full-width canvas band (deliberately different rhythm) */}
          <div>
            <div className="grid gap-8 lg:grid-cols-5 items-end mb-8">
              <Reveal className="lg:col-span-3 min-w-0">
                <p className="text-overline mb-3">Automate</p>
                <h3 className="heading-2 mb-4">Flows that work while you sleep</h3>
                <p className="text-body">
                  Design chatbots on a visual N8N-style canvas — branching, loops, agentic AI
                  with your own knowledge base, and clean human handoff when the conversation
                  needs a person.
                </p>
              </Reveal>
              <Reveal delay={1} className="lg:col-span-2 min-w-0">
                <ul className="space-y-2.5">
                  {[
                    "Multi-path branching and loops",
                    "NLU intents + knowledge base from your documents",
                    "Sentiment-aware human handoff",
                  ].map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-sm sm:text-base text-text-primary">{b}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal>
              <FlowExecutionScene />
            </Reveal>
            <Reveal delay={1}>
              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
                <Link href="/flow-builder" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-700 transition-colors group">
                  Flow Builder
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                </Link>
                <Link href="/chatbot-flows" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-primary hover:text-brand-700 transition-colors group">
                  Chatbot flow library
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* INTEGRATE — split, scene left */}
          <div id="busy-erp" className="grid gap-10 lg:gap-14 lg:grid-cols-2 items-center scroll-mt-24">
            <Reveal className="min-w-0 order-1">
              <SyncPipelineScene />
            </Reveal>
            <Reveal delay={1} className="min-w-0 order-2">
              <PillarCopy
                overline="Integrate"
                title="Your ERP, speaking WhatsApp"
                lead="The 10-minute sync engine connects Busy Accounting (and Miracle, and Google Sheets) to WhatsApp — invoices go out as PDFs the moment they're saved, and customers ask 'Balance' to get live ledger replies."
                bullets={[
                  "Invoice PDFs sent automatically when saved in Busy",
                  "Real-time ledger inquiry: type 'Balance' for outstanding + pay link",
                  "Automated payment reminders that reduce call-center load 40–50%",
                  "Google Sheets sync and Miracle WhatsApp API support",
                ]}
                links={[
                  { label: "Busy ERP Integration", href: "/solutions/busy-erp" },
                  { label: "Miracle WhatsApp API", href: "/solutions/miracle-whatsapp-api" },
                ]}
              />
            </Reveal>
          </div>

          <ComparisonBlock />

          <BentoCapabilities />
        </div>
      </Container>
    </Section>
  );
}
