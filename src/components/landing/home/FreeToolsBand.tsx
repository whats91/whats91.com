import Link from "next/link";
import { ArrowRight, Calculator, Link2, QrCode, TrendingUp } from "lucide-react";
import {
  Container,
  Section,
  Reveal,
  AnimatedNumber,
} from "@/components/shared";

const tools = [
  {
    icon: Calculator,
    title: "API Cost Calculator",
    description: "Your exact monthly spend at Meta's official India rates.",
    href: "/tools/whatsapp-api-cost-calculator",
  },
  {
    icon: TrendingUp,
    title: "Lead ROI Calculator",
    description: "What qualified WhatsApp leads are worth to your funnel.",
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
    description: "Scannable WhatsApp QR for packaging and print.",
    href: "/tools/qr-code-generator",
  },
];

/**
 * Conceptual preview of the cost calculator (decorative, aria-hidden) —
 * the real tool lives at /tools/whatsapp-api-cost-calculator.
 * Rates shown are the existing pricing-page figures.
 */
function CalculatorPreview() {
  return (
    <div aria-hidden="true" className="relative select-none">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-bl from-brand-50 to-transparent" />
      <div className="relative surface-card p-5 sm:p-6 shadow-lg max-w-sm mx-auto">
        <p className="text-xs font-semibold text-text-primary mb-4">Monthly estimate</p>
        <div className="space-y-3 mb-5">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Marketing msgs</span>
            <span className="font-mono text-text-primary">10,000 × ₹0.8631</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Utility msgs</span>
            <span className="font-mono text-text-primary">25,000 × ₹0.1150</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">Whats91 plan</span>
            <span className="font-semibold text-text-primary">See selected plan</span>
          </div>
        </div>
        <div className="rounded-xl bg-brand-primary/[0.06] border border-brand-primary/15 px-4 py-3.5 flex items-baseline justify-between">
          <span className="text-xs font-medium text-text-secondary">Estimated message subtotal</span>
          <span className="text-2xl font-bold tracking-tight text-brand-700">
            ₹<AnimatedNumber value={11506} />
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
              Four free tools, no signup — the same calculators our own team
              uses in onboarding calls.
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
                      <span className="block text-body-sm truncate">{tool.description}</span>
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
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
