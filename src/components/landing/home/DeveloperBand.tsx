import { Code2, ExternalLink, Shield, Terminal, Webhook } from "lucide-react";
import { Container, Section, Reveal } from "@/components/shared";

const technicalFeatures = [
  {
    icon: Webhook,
    title: "Graph API v21.0 support",
    description: "Full compatibility with Business Calling and WhatsApp Flows.",
  },
  {
    icon: Shield,
    title: "SHA256 signature validation",
    description: "Every payload verified in transit before it touches your systems.",
  },
  {
    icon: Code2,
    title: "Complete documentation",
    description: "Endpoints, rate-limit rules, media management, and a public changelog.",
  },
];

const payloadTypes = [
  { type: "Text", description: "Simple text inquiries" },
  { type: "Interactive", description: "Buttons & lists" },
  { type: "Location", description: "GPS coordinates" },
  { type: "Media", description: "Images & documents" },
];

/**
 * Live webhook event stream — the developer product, playing itself.
 * Lines land in sequence on a 10s loop; reduced motion shows the full log.
 */
function EventStream() {
  const line = "flex items-center gap-2 whitespace-nowrap";
  return (
    <div aria-hidden="true" className="rounded-xl bg-ink-elevated border border-ink-border overflow-hidden shadow-2xl select-none">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-ink-border">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        </div>
        <div className="flex items-center gap-2 ml-2">
          <Terminal className="h-3.5 w-3.5 text-ink-text-muted" />
          <span className="text-[11px] sm:text-xs text-ink-text-muted font-mono">webhook · live events</span>
        </div>
        <span className="ml-auto relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-60 motion-reduce:hidden" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent" />
        </span>
      </div>

      <div className="p-4 sm:p-5 font-mono text-[11px] sm:text-xs leading-7 overflow-x-auto">
        <div className={`${line} [animation:es-line-1_10s_linear_infinite]`}>
          <span className="text-ink-text-muted">11:02:04</span>
          <span className="text-brand-accent">POST /webhook</span>
          <span className="text-ink-text">message.received</span>
          <span className="text-ink-text-muted">from 91XXXXXXXXXX</span>
        </div>
        <div className={`${line} [animation:es-line-2_10s_linear_infinite]`}>
          <span className="text-ink-text-muted">11:02:04</span>
          <span className="text-yellow-300/90">sha256</span>
          <span className="text-ink-text">signature verified ✓</span>
        </div>
        <div className={`${line} [animation:es-line-3_10s_linear_infinite]`}>
          <span className="text-ink-text-muted">11:02:04</span>
          <span className="text-sky-300/90">route</span>
          <span className="text-ink-text">type=text → handleTextInquiry(&quot;Balance&quot;)</span>
        </div>
        <div className={`${line} [animation:es-line-4_10s_linear_infinite]`}>
          <span className="text-ink-text-muted">11:02:05</span>
          <span className="text-brand-accent">reply</span>
          <span className="text-ink-text">template=ledger_summary · pdf attached</span>
        </div>
        <div className={`${line} [animation:es-line-5_10s_linear_infinite]`}>
          <span className="text-ink-text-muted">11:02:05</span>
          <span className="text-green-300/90">200 OK</span>
          <span className="text-ink-text-muted">42ms</span>
        </div>
        <div className="flex items-center gap-0.5 mt-1">
          <span className="text-ink-text-muted">$</span>
          <span className="inline-block w-[7px] h-3.5 bg-brand-accent [animation:caret-blink_1.1s_steps(1)_infinite] motion-reduce:animate-none" />
        </div>
      </div>
    </div>
  );
}

export function DeveloperBand() {
  return (
    <Section id="developers" tone="ink" aria-labelledby="dev-heading">
      <Container>
        <div className="grid gap-10 lg:gap-14 lg:grid-cols-2 items-center">
          {/* Copy — second on phone so the live stream leads */}
          <Reveal className="order-2 lg:order-1 min-w-0">
            <p className="text-overline mb-3 !text-brand-accent">For Developers</p>
            <h2 id="dev-heading" className="heading-2 !text-white mb-4">
              A webhook environment you can trust
            </h2>
            <p className="text-body !text-ink-text mb-8">
              Building on a custom CRM? Every user interaction arrives as a
              signed, structured payload on a high-availability webhook —
              watch the pipeline handle a ledger inquiry in real time.
            </p>

            <div className="space-y-5 mb-8">
              {technicalFeatures.map((feature) => (
                <div key={feature.title} className="flex gap-3.5">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.06] border border-white/10 shrink-0">
                    <feature.icon className="h-5 w-5 text-brand-accent" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-white mb-0.5">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-ink-text-muted">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <a
                href="https://developers.whats91.com/overview"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent hover:text-brand-300 transition-colors"
              >
                API documentation
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href="https://developers.whats91.com/changelog"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-accent hover:text-brand-300 transition-colors"
              >
                Changelog
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </Reveal>

          {/* Live stream */}
          <Reveal delay={1} className="order-1 lg:order-2 min-w-0">
            <EventStream />
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {payloadTypes.map((payload) => (
                <div
                  key={payload.type}
                  className="rounded-lg bg-white/[0.04] border border-white/10 px-3 py-2.5"
                >
                  <p className="text-xs font-semibold text-white">{payload.type}</p>
                  <p className="text-[10px] text-ink-text-muted mt-0.5">{payload.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
