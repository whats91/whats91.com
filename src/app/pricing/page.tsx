import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ContactCard } from "@/components/landing/ContactCard";
import { FAQJsonLD, BreadcrumbJsonLD } from "@/components/seo/JsonLD";
import { PricingCostCalculator } from "./PricingCostCalculator";
import {
  Container,
  Section,
  SectionHeader,
  Eyebrow,
  CTAGroup,
  PrimaryCTA,
  TrustPill,
  IconBadge,
} from "@/components/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { generatePageMetadata, siteConfig } from "@/lib/seo/config";
import {
  Shield,
  CheckCircle2,
  Calculator,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Clock,
  Zap,
  Globe,
  Sparkles,
  Award,
  Building2,
  Receipt,
  Percent,
  Timer,
  Target,
  Layers,
  RefreshCw,
  Check,
} from "lucide-react";

const pagePath = "/pricing";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "WhatsApp API Pricing India 2026 | Rate Card & Plans";
const seoDescription =
  "Review WhatsApp Cloud API message-rate estimates, Whats91 software plans, quoted services, and applicable taxes for India.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "WhatsApp API Pricing India",
      "WhatsApp Business API Cost",
      "WhatsApp Cloud API Rates 2026",
      "WhatsApp API Plan Pricing",
      "WhatsApp Marketing Message Price",
      "WhatsApp Utility Message Price",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

// Official Meta Rates (India 2026)
const officialRates = [
  { category: "Marketing", rate: "₹0.8631", description: "Promotional broadcasts, offers" },
  { category: "Utility", rate: "₹0.1150", description: "Order updates, shipping alerts" },
  { category: "Authentication", rate: "₹0.1150", description: "OTPs, security codes (domestic)" },
  { category: "Service", rate: "FREE", description: "Customer support replies", free: true },
];

// Pricing components are separated so buyers can reconcile the Meta rate card,
// the selected Whats91 plan, and taxes against their written order form.
const pricingComponents = [
  { component: "Meta messaging charges", treatment: "Pass-through where applicable", verification: "Current Meta rate card and invoice" },
  { component: "Whats91 software plan", treatment: "Plan-dependent", verification: "Selected plan or order form" },
  { component: "Onboarding and integrations", treatment: "Only when quoted", verification: "Signed scope or order form" },
  { component: "Taxes", treatment: "Applied as required", verification: "Tax invoice" },
];

// Utility Volume Tiers
const utilityTiers = [
  { volume: "0 – 25 Million", rate: "₹0.1150", discount: "Base Rate" },
  { volume: "25M – 50 Million", rate: "₹0.1081", discount: "6% off" },
  { volume: "50M – 100 Million", rate: "₹0.1012", discount: "12% off" },
  { volume: "100M – 200 Million", rate: "₹0.0943", discount: "18% off" },
  { volume: "200M – 300 Million", rate: "₹0.0874", discount: "24% off" },
  { volume: "Above 300 Million", rate: "₹0.0805", discount: "30% off" },
];

// Authentication Volume Tiers
const authTiers = [
  { volume: "0 – 750,000", rate: "₹0.1150", discount: "Base Rate" },
  { volume: "750k – 15 Million", rate: "₹0.1081", discount: "6% off" },
  { volume: "15M – 20 Million", rate: "₹0.1012", discount: "12% off" },
  { volume: "20M – 50 Million", rate: "₹0.0943", discount: "18% off" },
  { volume: "50M – 100 Million", rate: "₹0.0874", discount: "24% off" },
  { volume: "Above 100 Million", rate: "₹0.0805", discount: "30% off" },
];

// Messaging Tiers
const messagingTiers = [
  { tier: "Tier 0", limit: "250", requirement: "Unverified Business", icon: Shield },
  { tier: "Tier 1", limit: "1,000", requirement: "Verified Business", icon: CheckCircle2 },
  { tier: "Tier 2", limit: "10,000", requirement: "Sustained High Quality", icon: TrendingUp },
  { tier: "Tier 3", limit: "100,000", requirement: "Established Brand", icon: Building2 },
  { tier: "Tier 4", limit: "Unlimited", requirement: "Enterprise / High Reliability", icon: Globe },
];

// Free Windows
const freeWindows = [
  {
    title: "24-Hour Customer Service Window",
    duration: "24 hours",
    trigger: "Customer messages you first",
    benefit: "All service messages FREE",
    icon: Clock,
  },
  {
    title: "72-Hour CTWA Ad Window",
    duration: "72 hours",
    trigger: "Click-to-WhatsApp Ad click",
    benefit: "ALL message types FREE",
    icon: Target,
  },
  {
    title: "Utility in Service Window",
    duration: "Within 24h CSW",
    trigger: "Customer initiates conversation",
    benefit: "Utility templates FREE",
    icon: Receipt,
  },
];

// Cost Traps
const costTraps = [
  { trap: "Utility → Marketing Reclassification", impact: "650% cost increase", fix: "Keep utility templates purely transactional" },
  { trap: "International Authentication", impact: "20x cost (₹2.30 vs ₹0.115)", fix: "Verify destination country code" },
  { trap: "Unclear provider charges", impact: "Unexpected software or service fees", fix: "Reconcile the Meta rate card with the signed order form" },
  { trap: "Frequency Cap Saturation", impact: "Undelivered = wasted budget", fix: "Time broadcasts strategically" },
];

// FAQs
const faqs = [
  { q: "How is WhatsApp API billed in 2026?", a: "In 2026, WhatsApp Business API uses per-message billing. You pay only for successfully delivered templates. Marketing messages cost ₹0.8631, Utility ₹0.1150, and Authentication ₹0.1150 (domestic). Service messages within the 24-hour customer window are completely FREE." },
  { q: "What's the difference between Marketing and Utility pricing?", a: "Marketing messages (₹0.8631) are promotional broadcasts like offers and newsletters. Utility messages (₹0.1150) are transaction-triggered alerts like order confirmations and shipping updates. Utility costs 7.5x less than Marketing—keeping templates purely functional prevents costly reclassification." },
  { q: "Are there volume discounts available?", a: "Yes! Utility and Authentication messages have automatic volume tiers. Starting at 25M utility messages/month, rates drop to ₹0.1081 (6% off). At 300M+ messages, you pay only ₹0.0805 (30% off). Marketing has a flat rate regardless of volume." },
  { q: "When are WhatsApp messages completely FREE?", a: "Three scenarios: (1) Any reply within 24 hours of customer message—completely free. (2) Any message type within 72 hours of Click-to-WhatsApp ad click—completely free. (3) Utility templates sent within an active 24-hour service window—free as of April 2025." },
  { q: "Why can provider pricing differ from Meta rates?", a: "Providers may separately charge for software, support, onboarding, integrations, or managed services. Compare the current Meta rate card with each provider's written commercial terms before purchasing; Whats91 pricing and any pass-through charges are shown in the applicable order form or plan." },
  { q: "What is the 18% GST on WhatsApp API in India?", a: "WhatsApp API services in India attract 18% GST. With local INR billing from Meta, this GST is fully claimable as Input Tax Credit (ITC) for GST-registered businesses. Previously, USD billing made GST compliance complex." },
  { q: "How do messaging tier limits work?", a: "Tier limits determine how many unique users you can message per 24 hours. Tier 0 (unverified) allows 250, Tier 1 (verified) allows 1,000, up to Tier 4 (unlimited). In 2026, Meta checks for upgrades every 6 hours, allowing rapid scaling during peaks." },
  { q: "What is Error 131049 (Saturation)?", a: "Meta limits users to ~2 marketing messages per day across ALL brands. If a user already received 2 marketing messages, your broadcast fails with Error 131049. This global frequency cap encourages strategic timing and high-quality content." },
  { q: "Can I get FREE marketing messages?", a: "Yes! Within the 72-hour Click-to-WhatsApp ad window, ALL message types including Marketing are FREE. This makes CTWA ads highly efficient—the ad spend effectively 'pre-pays' for 72 hours of unlimited messaging." },
  { q: "How often does Meta update pricing?", a: "Meta reviews pricing quarterly as of 2026. The January 2026 update increased Marketing rates by 10% in India due to high volume. Local INR billing protects against currency volatility that previously added 12-20% hidden costs." },
];

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://whats91.com/pricing#whatsapp-api-pricing-service",
  name: "WhatsApp API Pricing India",
  url: "https://whats91.com/pricing",
  description:
    "Whats91 pricing page for Indian WhatsApp Cloud API teams, covering Meta message categories, Marketing rates, Utility rates, Authentication rates, service windows, GST, and provider markup comparison.",
  provider: { "@id": "https://whats91.com/#organization" },
  areaServed: { "@type": "Country", name: "India" },
  serviceType: "WhatsApp Cloud API pricing and implementation",
  offers: officialRates.map((rate) => ({
    "@type": "Offer",
    name: `${rate.category} WhatsApp API messages`,
    priceCurrency: "INR",
    price: rate.rate === "FREE" ? "0" : rate.rate.replace("₹", ""),
    description: rate.description,
    url: "https://whats91.com/pricing",
    seller: { "@id": "https://whats91.com/#organization" },
  })),
};

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <FAQJsonLD faqs={faqs.map((faq) => ({ question: faq.q, answer: faq.a }))} />
      <BreadcrumbJsonLD
        items={[
          { name: "Home", url: "https://whats91.com/" },
          { name: "Pricing", url: "https://whats91.com/pricing" },
        ]}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }} />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {/* Hero */}
        <Section tone="brand-soft" pad="lg">
          <Container className="text-center max-w-4xl">
            <Eyebrow icon={Award} className="mb-5">
              Official Meta WhatsApp Business API Pricing
            </Eyebrow>
            <h1 className="heading-1 mb-5">WhatsApp API Pricing India 2026</h1>
            <p className="text-lead measure-prose mx-auto mb-6">
              Pay the exact Meta rates—<strong className="text-text-primary">₹0.8631 for Marketing</strong> and{" "}
              <strong className="text-text-primary">₹0.1150 for Utility</strong>—without a single paisa of middleman markup.
            </p>

            <CTAGroup align="center" className="mb-8">
              <PrimaryCTA href="https://chat.whats91.com">Start Free Trial</PrimaryCTA>
              <ContactCard
                variant="popup"
                trigger={
                  <button className="inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-7 text-sm sm:text-base font-semibold rounded-xl border border-border/80 text-text-primary hover:bg-surface transition-colors w-full sm:w-auto">
                    Talk to Sales
                  </button>
                }
              />
            </CTAGroup>

            <div className="flex flex-wrap justify-center gap-2.5">
              <TrustPill>Pricing Components Separated</TrustPill>
              <TrustPill>Written Order Terms</TrustPill>
              <TrustPill>Tax Invoice Support</TrustPill>
            </div>
          </Container>
        </Section>

        {/* Official Rate Card */}
        <Section id="marketing" tone="surface" className="scroll-mt-24" aria-labelledby="rates-heading">
          <Container>
            <SectionHeader
              eyebrow="2026 Rate Card"
              eyebrowIcon={Receipt}
              id="rates-heading"
              title="Official Meta Rates (India)"
              description="Effective January 1, 2026 • Per Delivered Message • INR Billing"
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {officialRates.map((item) => (
                <div
                  key={item.category}
                  className={`rounded-2xl border p-6 text-center transition-shadow duration-300 hover:shadow-lg ${
                    item.free ? "bg-success-soft border-success-border" : "surface-card"
                  }`}
                >
                  <div className={`text-3xl sm:text-4xl font-bold mb-2 ${item.free ? "text-success" : "text-brand-primary"}`}>
                    {item.rate}
                  </div>
                  <div className="text-base font-semibold text-text-primary mb-1">{item.category}</div>
                  <div className="text-caption">{item.description}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-warning-border bg-warning-soft p-5 text-center">
              <p className="text-sm text-text-primary">
                <AlertTriangle className="h-4 w-4 inline mr-2 text-warning" aria-hidden="true" />
                <strong>2026 Update:</strong> Marketing rates increased 10% (from ₹0.78 to ₹0.8631) due to high
                promotional volume in India. Focus on quality templates and audience segmentation for better ROI.
              </p>
            </div>
          </Container>
        </Section>

        {/* Pricing transparency */}
        <Section aria-labelledby="comparison-heading">
          <Container>
            <SectionHeader
              id="comparison-heading"
              title="Understand Every Pricing Component"
              description="Check the current Meta rate card, your selected Whats91 plan, quoted services, and applicable taxes before purchase."
            />
            <div className="surface-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px]">
                  <thead>
                    <tr className="bg-surface/80">
                      <th className="text-left p-4 text-xs font-semibold text-text-muted uppercase">Component</th>
                      <th className="text-left p-4 text-xs font-semibold text-text-muted uppercase">Treatment</th>
                      <th className="text-left p-4 text-xs font-semibold text-text-muted uppercase">Verify against</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingComponents.map((row) => (
                      <tr key={row.component} className="border-t border-border/60">
                        <td className="p-4 text-sm text-text-primary font-medium">{row.component}</td>
                        <td className="p-4 text-sm text-text-secondary">{row.treatment}</td>
                        <td className="p-4 text-sm text-text-secondary">{row.verification}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-5 text-center">
              <p className="text-sm text-text-secondary">
                Your binding charges are the ones stated in the applicable plan, order form, and invoice. Third-party rates can change independently.
              </p>
            </div>
          </Container>
        </Section>

        {/* Volume Tiers */}
        <Section id="utility" tone="surface" className="scroll-mt-24" aria-labelledby="tiers-heading">
          <Container>
            <SectionHeader
              eyebrow="Volume Discounts"
              eyebrowIcon={TrendingUp}
              id="tiers-heading"
              title="Scale More, Pay Less"
              description="Automatic tier discounts for Utility and Authentication messages. Marketing has flat pricing."
            />

            <Tabs defaultValue="utility" className="items-center">
              <TabsList>
                <TabsTrigger value="utility">Utility Tiers</TabsTrigger>
                <TabsTrigger value="auth">Authentication Tiers</TabsTrigger>
              </TabsList>

              {(
                [
                  { key: "utility", tiers: utilityTiers },
                  { key: "auth", tiers: authTiers },
                ] as const
              ).map(({ key, tiers }) => (
                <TabsContent key={key} value={key} className="w-full">
                  <div className="surface-card overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[480px]">
                        <thead>
                          <tr className="bg-surface/80">
                            <th className="text-left p-4 text-xs font-semibold text-text-muted uppercase">Monthly Volume</th>
                            <th className="text-center p-4 text-xs font-semibold text-text-muted uppercase">Rate per Message</th>
                            <th className="text-center p-4 text-xs font-semibold text-text-muted uppercase">Discount</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tiers.map((row) => (
                            <tr key={row.volume} className="border-t border-border/60">
                              <td className="p-4 text-sm text-text-primary font-medium">{row.volume}</td>
                              <td className="p-4 text-sm text-center font-bold text-brand-primary">{row.rate}</td>
                              <td className="p-4 text-sm text-center">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    row.discount === "Base Rate"
                                      ? "bg-surface text-text-muted"
                                      : "bg-success-soft text-success"
                                  }`}
                                >
                                  {row.discount}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <p className="mt-4 text-center text-caption">
              Marginal pricing: First 25M messages at base rate, subsequent messages at discounted tier rate
            </p>
          </Container>
        </Section>

        {/* Free Messaging Windows */}
        <Section aria-labelledby="free-heading">
          <Container>
            <SectionHeader
              eyebrow="Free Messaging"
              eyebrowIcon={Sparkles}
              id="free-heading"
              title="How to Get FREE Messages"
            />
            <div className="grid gap-6 md:grid-cols-3">
              {freeWindows.map((item) => (
                <div key={item.title} className="surface-card surface-card-hover p-6">
                  <IconBadge icon={item.icon} size="lg" className="mb-4" />
                  <h3 className="heading-4 mb-2">{item.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Timer className="h-4 w-4 text-text-muted" aria-hidden="true" />
                      <span className="text-text-secondary">
                        Duration: <strong className="text-text-primary">{item.duration}</strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Zap className="h-4 w-4 text-text-muted" aria-hidden="true" />
                      <span className="text-text-secondary">
                        Trigger: <strong className="text-text-primary">{item.trigger}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-success-soft border border-success-border">
                    <p className="text-sm font-medium text-success">{item.benefit}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-success-border bg-success-soft p-6">
              <div className="flex items-start gap-4">
                <Target className="h-6 w-6 text-success shrink-0" aria-hidden="true" />
                <div>
                  <h4 className="text-base font-semibold text-text-primary mb-2">The 72-Hour CTWA Hack</h4>
                  <p className="text-sm text-text-secondary mb-3">
                    Run a Click-to-WhatsApp ad on Facebook/Instagram. When users click and message you, the 72-hour
                    window opens. During this window, <strong>ALL message types including Marketing are FREE</strong>.
                    This effectively makes your ad spend &quot;pre-pay&quot; for 72 hours of unlimited messaging.
                  </p>
                  <p className="text-caption">
                    Pro tip: This is the only way to send FREE marketing messages in 2026.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Cost Calculator */}
        <Section id="volume" tone="surface" className="scroll-mt-24" aria-labelledby="calc-heading">
          <Container size="narrow">
            <SectionHeader
              eyebrow="Cost Calculator"
              eyebrowIcon={Calculator}
              id="calc-heading"
              title="Estimate Your Monthly Cost"
            />
            <PricingCostCalculator />
          </Container>
        </Section>

        {/* Messaging Tiers */}
        <Section aria-labelledby="scaling-heading">
          <Container>
            <SectionHeader
              eyebrow="Scaling Limits"
              eyebrowIcon={Layers}
              id="scaling-heading"
              title="Messaging Tier System"
              description={
                <>
                  Daily unique user limits. Meta checks for upgrades every <strong>6 hours</strong> in 2026.
                </>
              }
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              {messagingTiers.map((item) => (
                <div key={item.tier} className="surface-card surface-card-hover p-5 text-center">
                  <IconBadge icon={item.icon} className="mx-auto mb-3" />
                  <div className="text-lg font-bold text-text-primary mb-1">{item.tier}</div>
                  <div className="text-2xl font-bold text-brand-primary mb-2">{item.limit}</div>
                  <div className="text-caption">{item.requirement}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-5 text-center">
              <p className="text-sm text-text-secondary">
                <RefreshCw className="h-4 w-4 inline mr-2 text-brand-primary" aria-hidden="true" />
                <strong className="text-text-primary">6-Hour Upgrade Check:</strong> Hit 50% of daily limit +
                maintain Green quality rating = automatic tier bump within 6 hours.
              </p>
            </div>
          </Container>
        </Section>

        {/* Cost Traps */}
        <Section tone="surface" aria-labelledby="traps-heading">
          <Container>
            <SectionHeader
              eyebrow="Hidden Costs"
              eyebrowIcon={AlertTriangle}
              id="traps-heading"
              title="Avoid These Cost Traps"
            />
            <div className="grid gap-4 md:grid-cols-2">
              {costTraps.map((item) => (
                <div key={item.trap} className="flex items-start gap-4 rounded-xl border border-error-border bg-card p-5">
                  <AlertTriangle className="h-5 w-5 text-error shrink-0 mt-0.5" aria-hidden="true" />
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary mb-1">{item.trap}</h4>
                    <p className="text-sm text-error font-medium mb-2">{item.impact}</p>
                    <p className="text-caption">
                      <strong>Fix:</strong> {item.fix}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* GST Information */}
        <Section aria-labelledby="gst-heading">
          <Container size="narrow">
            <SectionHeader id="gst-heading" title="Local INR Billing & GST" />
            <div className="surface-card p-6 sm:p-8">
              <div className="space-y-6">
                {[
                  { icon: DollarSign, title: "No Currency Volatility", desc: "Direct INR billing from Meta India eliminates 12-20% hidden costs from USD conversion and bank fees." },
                  { icon: Percent, title: "18% GST Fully Claimable", desc: "Invoices from Meta India entity allow GST-registered businesses to claim full Input Tax Credit (ITC)." },
                  { icon: Receipt, title: "Transparent Invoicing", desc: "Every message is a line item. Track campaign costs precisely with delivery-based charging." },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <IconBadge icon={item.icon} className="shrink-0" />
                    <div>
                      <h4 className="text-base font-semibold text-text-primary mb-1">{item.title}</h4>
                      <p className="text-body-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section tone="surface" aria-labelledby="faq-heading">
          <Container size="narrow">
            <SectionHeader id="faq-heading" title="Frequently Asked Questions" />
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.q} value={`faq-${index}`} className="surface-card px-4 sm:px-5 border-b-0">
                  <AccordionTrigger className="text-sm sm:text-base font-medium text-text-primary hover:no-underline">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-body-sm">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Container>
        </Section>

        {/* Final CTA */}
        <Section>
          <Container>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-primary via-brand-primary to-brand-accent p-7 sm:p-8 md:p-12 lg:p-16 shadow-xl">
              <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute -top-1/2 -right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="heading-2 !text-white mb-4">Choose the right plan for your workflow</h2>
                <p className="text-base sm:text-lg text-white/90 mb-8">
                  Review current message charges, software fees, scoped services, and taxes before you subscribe.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href="https://chat.whats91.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2 h-12 px-7 text-base font-semibold bg-white text-brand-700 hover:bg-white/95 rounded-xl shadow-lg transition-colors w-full sm:w-auto"
                  >
                    Get Started Free
                    <Check className="h-5 w-5 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden="true" />
                  </a>
                  <ContactCard
                    variant="popup"
                    trigger={
                      <button className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl transition-colors w-full sm:w-auto">
                        Talk to Sales
                      </button>
                    }
                  />
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
