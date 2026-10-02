import { noMarkupPolicy, metaPricingSchedule, getMetaMarket, formatMetaRate, formatMetaMoney } from "@/lib/meta-pricing";
import Link from "next/link";
import { illustrationScope, homeMetaEstimate, homeMetaScenario, homePlanSummary } from "@/lib/home-content";
import { formatINR, plans } from "@/lib/plans";
import { ArrowRight, Calculator, Link2, QrCode, TrendingUp } from "lucide-react";
import {
  Container,
  Section,
  Reveal,
} from "@/components/shared";

const tools = [
  {
    icon: Calculator,
    title: "API Cost Calculator",
    description: "Estimate Meta INR delivery costs effective 1 October 2026.",
    href: "/tools/whatsapp-api-cost-calculator",
  },
  {
    icon: TrendingUp,
    title: "Lead ROI Calculator",
    description: "Compare lead qualification costs with your own assumptions.",
    href: "/tools/lead-qualification-roi-calculator",
  },
  {
    icon: Link2,
    title: "WhatsApp Link Generator",
    description: "wa.me click-to-chat links with pre-filled messages.",
    href: "/tools/whatsapp-link-generator",
  },
  {
    icon: QrCode,
    title: "QR Code Generator",
    description: "Create local PNG QR codes; test before printing.",
    href: "/tools/qr-code-generator",
  },
];

/**
 * Illustrative India budget using the shared effective schedule —
 * the real tool lives at /tools/whatsapp-api-cost-calculator.
 * Rates shown are the existing pricing-page figures.
 */
function CalculatorPreview() {
  return (
    <div className="relative select-none">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-bl from-brand-50 to-transparent" />
      <div className="relative surface-card p-5 sm:p-6 shadow-lg max-w-sm mx-auto">
        <p className="text-xs font-semibold text-text-primary mb-4">{metaPricingSchedule.effectiveLabel}</p>
        <div className="space-y-3 mb-5">
          <div className="flex flex-wrap gap-2 items-center justify-between text-sm">
            <span className="text-text-secondary">1,000 Marketing deliveries</span>
            <span className="font-mono text-text-primary">{formatMetaRate(getMetaMarket("IN")!.rates.marketing)} / delivery</span>
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-between text-sm">
            <span className="text-text-secondary">1,000 Utility deliveries</span>
            <span className="font-mono text-text-primary">{formatMetaRate(getMetaMarket("IN")!.rates.utility)} / delivery</span>
          </div>
          <div className="flex flex-wrap gap-2 items-center justify-between text-sm">
            <span className="text-text-secondary">Whats91 plan</span>
            <span className="font-semibold text-text-primary">Coexistence {formatINR(plans.coexistence.monthlyPrice)}/month + GST</span>
          </div>
        </div>
        <div className="rounded-xl bg-brand-primary/[0.06] border border-brand-primary/15 px-4 py-3.5 flex flex-wrap gap-2 items-baseline justify-between">
          <span className="text-xs font-medium text-text-secondary">Estimated message subtotal</span>
          <span className="text-base font-bold tracking-tight text-brand-700">
            {homeMetaEstimate.meta === null ? "Unavailable" : formatMetaMoney(homeMetaEstimate.meta)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function FreeToolsBand() {
  return (
    <Section tone="surface" aria-labelledby="tools-heading">
      <Container>
        <div className="grid gap-10 lg:gap-14 lg:grid-cols-2 items-center">
          <Reveal className="min-w-0">
            <p className="text-overline mb-3">Free Tools</p>
            <h2 id="tools-heading" className="heading-2 mb-4">
              Do the math before you commit
            </h2>
            <p className="text-body mb-8">
              Prepare message quantities, explore your own lead assumptions, or create a contact link and QR code. A calculator scenario is not a promised business result.
            </p>
            <ul className="divide-y divide-border/60 border-y border-border/60">
              {tools.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="group flex items-center gap-4 py-3.5 hover:bg-surface/70 -mx-2 px-2 rounded-lg transition-colors"
                  >
                    <span className="icon-tile h-9 w-9 shrink-0">
                      <tool.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-text-primary">{tool.title}</span>
                      <span className="block text-body-sm">{tool.description}</span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 text-brand-primary shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={1} className="min-w-0">
            <CalculatorPreview />
            <p className="text-caption mt-4">{illustrationScope} {homeMetaScenario} {homePlanSummary} {noMarkupPolicy}</p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
