import Link from "next/link";
import { illustrationScope } from "@/lib/home-content";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Bot,
  Check,
  CheckCircle2,
  CheckCheck,
  Database,
  FileSpreadsheet,
  Headset,
  MessageSquare,
  Phone,
  ShoppingBag,
  Smartphone,
  Sparkles,
} from "lucide-react";
import {
  Container,
  Section,
  SectionHeader,
  Reveal,
  BrandLogo,
} from "@/components/shared";

/** Conceptual campaign path; no customer metrics or benchmark comparison. */
function CampaignJourneyScene() {
  return <figure className="surface-card p-5 sm:p-6 max-w-md mx-auto">
    <div aria-hidden="true">
      <h4 className="heading-4 mb-4">Example campaign path</h4>
      <ol className="space-y-3 text-body-sm">
        <li className="rounded-lg border border-border/60 p-3">Prepare an opted-in audience</li>
        <li className="rounded-lg border border-border/60 p-3">Submit the intended template for review</li>
        <li className="rounded-lg border border-border/60 p-3">Check approval and account conditions before sending</li>
        <li className="rounded-lg border border-border/60 p-3">Review delivery events, replies and opt-outs</li>
      </ol>
    </div>
    <figcaption className="text-caption mt-4">{illustrationScope}</figcaption>
  </figure>;
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
        <FlowNode icon={Database} step="Act" label="Busy ERP lookup" sub="authorised ledger" delay={1} />
        <FlowConnector />
        <FlowNode icon={CheckCheck} step="Reply" label="Balance sent" sub="with pay link" delay={1.5} />
      </div>

      {/* Untaken branch: sentiment-aware handoff */}
      <div className="mx-auto mt-3 flex max-w-3xl items-center gap-2 pl-4 sm:pl-[26%]">
        <svg viewBox="0 0 28 26" className="h-6 w-7 shrink-0 text-border" aria-hidden="true">
          <path d="M4 0v14a8 8 0 0 0 8 8h14" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" fill="none" />
        </svg>
        <FlowNode icon={Headset} label="Human handoff" sub="on an exception" dim />
      </div>

      {/* Outcome (always visible) */}
      <div className="mx-auto mt-5 flex max-w-3xl items-center justify-between gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-success-border bg-success-soft px-3 py-1.5 text-[11px] font-semibold text-success">
          <CheckCheck className="h-3.5 w-3.5" aria-hidden="true" /> Example reply path; confirm timing and exceptions
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
          <span>Explore Google Sheets and Miracle integration paths</span>
        </div>

        <p className="mt-2 text-center text-[10px] font-medium uppercase tracking-wider text-text-muted">
          Confirm connector, freshness and hosting requirements
        </p>
      </div>
    </div>
  );
}

/* ================================================================== */
/* Comparison table (content preserved verbatim)                       */
/* ================================================================== */

const workflowChecks = [
  { task: "Send an ERP document", check: "Document fields, authorised recipient and connector", exception: "Missing or stale data; failed document delivery" },
  { task: "Answer a customer request", check: "Trigger, permissions, lookup and reply", exception: "Unknown request; route to a human" },
  { task: "Plan a campaign", check: "Opt-in audience, template review and account conditions", exception: "Rejections, opt-outs and delivery failures" },
];
function ComparisonBlock() {
  return <div className="surface-card p-5 sm:p-6">
    <h3 className="heading-3 mb-5">Agree on the workflow and its exceptions</h3>
    <div className="grid gap-5 md:grid-cols-3">{workflowChecks.map(row => <article key={row.task} className="min-w-0">
      <h4 className="heading-4 mb-3">{row.task}</h4>
      <p className="text-body-sm mb-2"><strong>Check:</strong> {row.check}.</p>
      <p className="text-body-sm"><strong>Plan for:</strong> {row.exception}.</p>
    </article>)}</div>
  </div>;
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
          Related workflow paths
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
                  Voice calls over the Cloud API — confirm eligibility and effective charges before budgeting.
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
                  Assess an eligible Business App number for hybrid API use; confirm account and rollout conditions.
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
              <p className="text-body-sm">Explore scheduled sales and outstanding reports; confirm source data and recipients.</p>
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
              <p className="text-body-sm">Explore follow-ups with statements and payment links; confirm permissions and triggers.</p>
            </div>
            <p className="mt-4 text-[11px] text-text-muted" aria-hidden="true">
              Example schedule: <span className="font-mono text-text-secondary">daily 10:00</span>
            </p>
          </Link>
        </Reveal>

        {/* Storefront */}
        <Reveal delay={2} className="lg:col-span-2">
          <Link href="/solutions/busy-ecommerce" className={`${tile} h-full`}>
            <div>
              <span className="icon-tile h-9 w-9 mb-3"><ShoppingBag className="h-4 w-4" /></span>
              <p className="heading-4 mb-1.5">B2B/B2C Storefront</p>
              <p className="text-body-sm">Explore a storefront connected to Busy stock and rates; confirm sync and order handling.</p>
            </div>
            <div className="mt-4 flex items-center gap-2" aria-hidden="true">
              <span className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-medium text-text-muted border border-border/50">Stock ✓</span>
              <span className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-medium text-text-muted border border-border/50">Rates ✓</span>
              <span className="rounded-full bg-brand-primary/10 px-2.5 py-1 text-[10px] font-medium text-brand-700">Confirm sync schedule</span>
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
              <p className="text-body-sm">Explore ice breakers and slash commands as entry points to workflows.</p>
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
          title="Choose a campaign, request or ERP workflow"
          description="Explore the messaging and integration paths below. Confirm the enabled features, dependencies and permissions for your account."
        />

        <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
          {/* REACH — split, scene right */}
          <div className="grid gap-10 lg:gap-14 lg:grid-cols-2 items-center">
            <Reveal delay={1} className="min-w-0 order-2 lg:order-1">
              <PillarCopy
                overline="Reach"
                title="Plan campaigns for an opted-in audience"
                lead="Prepare the audience, message purpose and template. Review account conditions and delivery signals; response and conversion depend on your audience and offer."
                bullets={[
                  "Define recipient permissions and an opt-out process",
                  "Explore Click-to-WhatsApp entry paths",
                  "Agree on follow-up triggers and frequency",
                  "Use template examples; approval is specific to your submission",
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
                <h3 className="heading-2 mb-4">Map a request through to a reply or handoff</h3>
                <p className="text-body">
                  Explore triggers, conditions and actions in Flow Builder. Confirm the available nodes, connected systems and permissions, then plan the exception path when a request needs a person.
                </p>
              </Reveal>
              <Reveal delay={1} className="lg:col-span-2 min-w-0">
                <ul className="space-y-2.5">
                  {[
                    "Map the trigger and decision path",
                    "Confirm required data and connected actions",
                    "Define when and how a person takes over",
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
              <p className="text-caption mt-4">{illustrationScope}</p>
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
              <p className="text-caption mt-4">{illustrationScope}</p>
            </Reveal>
            <Reveal delay={1} className="min-w-0 order-2">
              <PillarCopy
                overline="Integrate"
                title="Your ERP, speaking WhatsApp"
                lead="Explore how an ERP document or authorised customer request can move through a connector and a WhatsApp workflow. Confirm the source fields, sync schedule, hosting and failure handling for your setup."
                bullets={[
                  "Confirm the invoice event and PDF fields",
                  "Define authorised ledger requests and data freshness",
                  "Agree on reminder triggers, recipient permissions and exceptions",
                  "Review separate Google Sheets and Miracle requirements",
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
