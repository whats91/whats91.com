import {
  BadgeCheck,
  Check,
  FileText,
  IndianRupee,
  ShieldCheck,
  Workflow,
  Zap,
} from "lucide-react";
import {
  Container,
  Section,
  Eyebrow,
  CTAGroup,
  SecondaryCTA,
  TrustPill,
} from "@/components/shared";
import { BookDemoPopup } from "@/components/landing/BookDemoPopup";

function DoubleTick({ className }: { className?: string }) {
  return (
    <span className={className} aria-hidden="true">
      <Check className="h-3 w-3 inline -mr-1.5" />
      <Check className="h-3 w-3 inline" />
    </span>
  );
}

/**
 * The hero centerpiece: a WhatsApp-style business conversation that plays
 * itself on a 12s loop — customer asks, the ledger bot answers with a live
 * balance + PDF, ticks turn read, and an ERP auto-invoice toast lands.
 * Pure CSS scene (see "Product animation scenes" in globals.css);
 * reduced-motion users see the completed conversation. Conceptual mockup,
 * aria-hidden — never presented as a real screenshot.
 */
function LiveConversation() {
  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-[400px] select-none">
      {/* Ambient wash */}
      <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-brand-100/70 via-transparent to-brand-50/50 blur-2xl" />

      {/* Phone-style chat card */}
      <div className="relative surface-card overflow-hidden rounded-3xl shadow-xl">
        {/* Chat header */}
        <div className="flex items-center gap-3 px-4 py-3.5 bg-brand-600">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 shrink-0">
            <span className="text-xs font-semibold text-white">W91</span>
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">Whats91 Enterprise</p>
            <p className="text-[10px] text-white/80 font-medium flex items-center gap-1">
              <BadgeCheck className="h-3 w-3" /> Verified Business · online
            </p>
          </div>
        </div>

        {/* Conversation canvas */}
        <div
          className="relative px-3.5 py-4 space-y-3 min-h-[264px] bg-surface/60"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--border-subtle) 1px, transparent 1px)",
            backgroundSize: "16px 16px",
          }}
        >
          {/* ERP auto-invoice toast */}
          <div className="absolute top-3 inset-x-3.5 z-10 [animation:hs-toast_12s_ease-out_infinite]">
            <div className="surface-card px-3 py-2 shadow-lg flex items-center gap-2.5">
              <span className="icon-tile h-7 w-7 rounded-lg shrink-0">
                <FileText className="h-3.5 w-3.5" />
              </span>
              <div className="min-w-0">
                <p className="text-[11px] font-semibold text-text-primary truncate">
                  Invoice #1042 auto-sent
                </p>
                <p className="text-[10px] text-text-muted">Busy ERP · 10-min sync</p>
              </div>
              <Check className="h-3.5 w-3.5 text-success ml-auto shrink-0" />
            </div>
          </div>

          <div className="pt-9" />

          {/* Customer message */}
          <div className="flex justify-start [animation:hs-msg-1_12s_ease-out_infinite]">
            <div className="rounded-2xl rounded-bl-md bg-card border border-border/60 px-3.5 py-2 text-sm text-text-primary shadow-sm">
              Balance?
              <span className="text-[9px] text-text-muted ml-2">11:02</span>
            </div>
          </div>

          {/* Reply area: neutral container so the transient typing bubble can
              overlay where the reply will land, without reserving space */}
          <div className="relative">
            <div className="absolute top-0 right-0 scene-transient [animation:hs-typing_12s_ease-out_infinite]">
              <div className="rounded-2xl rounded-br-md bg-brand-primary/15 px-3.5 py-2.5 flex items-center gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1.5 w-1.5 rounded-full bg-brand-600 [animation:dot-bounce_1.2s_ease-in-out_infinite]"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>

            {/* Bot reply */}
            <div className="flex justify-end [animation:hs-msg-2_12s_ease-out_infinite]">
            <div className="rounded-2xl rounded-br-md bg-brand-600 px-3.5 py-2.5 text-xs text-white max-w-[240px] shadow-md shadow-brand-primary/20">
              <p className="font-semibold mb-1.5">Sharma Traders — Ledger</p>
              <p className="text-white/90">
                Outstanding: <span className="font-semibold text-white">₹45,000</span>
              </p>
              <p className="text-white/90">Due: 15 Jan 2026</p>
              <div className="mt-2 flex items-center gap-2 rounded-lg bg-white/12 border border-white/15 px-2.5 py-1.5">
                <FileText className="h-3.5 w-3.5 shrink-0" />
                <span className="text-[11px] font-medium truncate">Statement.pdf</span>
              </div>
              <div className="mt-2 pt-1.5 border-t border-white/20 flex items-center justify-between">
                <span className="text-[11px] font-semibold">Pay Now →</span>
                <span className="relative inline-flex h-3.5 w-7 items-center justify-end text-[10px]">
                  {/* delivered → read tick crossfade */}
                  <DoubleTick className="absolute right-0 text-white/60 scene-transient [animation:hs-tick-sent_12s_ease-out_infinite]" />
                  <DoubleTick className="absolute right-0 text-sky-300 [animation:hs-tick-read_12s_ease-out_infinite]" />
                </span>
              </div>
            </div>
            </div>
          </div>

          {/* Bot attribution */}
          <div className="flex justify-end [animation:hs-msg-2_12s_ease-out_infinite]">
            <p className="text-[10px] text-text-muted flex items-center gap-1">
              <Workflow className="h-3 w-3 text-brand-primary" /> answered by ledger-bot · no agent needed
            </p>
          </div>
        </div>
      </div>

      {/* Floating: flow status */}
      <div className="absolute -top-4 -right-3 sm:-right-6 animate-float motion-reduce:animate-none">
        <div className="surface-card px-3.5 py-2.5 shadow-lg flex items-center gap-2.5">
          <span className="icon-tile h-7 w-7 rounded-lg">
            <Workflow className="h-3.5 w-3.5" />
          </span>
          <div>
            <p className="text-[11px] font-semibold text-text-primary leading-tight">Payment-reminder flow</p>
            <p className="text-[10px] text-success font-medium leading-tight flex items-center gap-1">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-success" />
              </span>
              Active · runs daily
            </p>
          </div>
        </div>
      </div>

      {/* Floating: campaign delivery */}
      <div className="absolute -bottom-4 -left-3 sm:-left-6 animate-float motion-reduce:animate-none [animation-delay:2.2s]">
        <div className="surface-card px-3.5 py-2.5 shadow-lg">
          <p className="text-[10px] text-text-muted mb-1">Diwali broadcast · 12,480 sent</p>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-24 rounded-full bg-surface-subtle overflow-hidden">
              <div className="h-full rounded-full bg-brand-primary w-[98%] [animation:cs-bar-read_12s_ease-out_infinite]" />
            </div>
            <p className="text-[11px] font-semibold text-text-primary">98% read</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HomeHero() {
  return (
    <Section id="home" tone="brand-soft" pad="lg" className="overflow-hidden">
      <Container>
        <div className="grid gap-14 lg:gap-10 lg:grid-cols-12 items-center">
          {/* Narrative — centered through tablet, left-aligned at lg */}
          <div className="lg:col-span-6 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start max-w-2xl mx-auto lg:mx-0 lg:max-w-none min-w-0">
            <Eyebrow icon={BadgeCheck} live>
              WhatsApp Cloud API for Indian businesses
            </Eyebrow>

            <h1 className="heading-display">
              Run your entire business{" "}
              <span className="text-gradient whitespace-nowrap">on WhatsApp</span>
            </h1>

            <p className="text-lead measure-prose">
              Whats91 is the WhatsApp Cloud API platform for Indian business —
              broadcast campaigns, AI chatbot flows, payment reminders, and deep
              Busy ERP integration on official Meta infrastructure, at
              zero-markup Meta rates.
            </p>

            <CTAGroup align="responsive-hero">
              <BookDemoPopup
                triggerLabel="Book a free demo"
                triggerSize="lg"
                source="homepage-hero"
                triggerClassName="h-11 sm:h-12 px-6 sm:px-7 text-sm sm:text-base rounded-xl w-full sm:w-auto"
              />
              <SecondaryCTA href="/pricing">See transparent pricing</SecondaryCTA>
            </CTAGroup>

            <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
              <TrustPill icon={IndianRupee}>Zero-markup Meta rates</TrustPill>
              <TrustPill icon={Zap}>Meta-hosted messaging API</TrustPill>
              <TrustPill icon={ShieldCheck}>Consent-first messaging</TrustPill>
            </div>
          </div>

          {/* The product, playing itself */}
          <div className="lg:col-span-6 min-w-0 px-3 sm:px-8 lg:px-4 pt-2 lg:pt-0">
            <LiveConversation />
          </div>
        </div>
      </Container>
    </Section>
  );
}
