import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ContactCard } from "@/components/landing/ContactCard";
import { UtilityCodeSandbox } from "./UtilityCodeSandbox";
import {
  Container,
  Section,
  SectionHeader,
  Eyebrow,
  CTAGroup,
  PrimaryCTA,
  SecondaryCTA,
  TrustPill,
  StatCard,
  IconBadge,
} from "@/components/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "@/lib/seo/JsonLd";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  generateServiceSchema,
  siteConfig,
} from "@/lib/seo/config";
import {
  Package,
  FileText,
  Shield,
  CheckCircle2,
  Clock,
  Zap,
  Lock,
  CreditCard,
  Calendar,
  Truck,
  AlertTriangle,
  Settings,
  Database,
  Sparkles,
  Bot,
  RefreshCw,
  DollarSign,
  Bell,
  MapPin,
  FileCheck,
  UserCheck,
  Webhook,
  Upload,
  Layers,
  TrendingUp,
  Award,
  MessageCircle,
} from "lucide-react";

const pagePath = "/solutions/utility";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "WhatsApp Utility Messaging API | Whats91 Cloud API";
const seoDescription =
  "The 2026 guide to WhatsApp utility messaging — transactional alerts, template classification, Meta compliance, and per-message pricing 70-85% lower than marketing.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "WhatsApp Utility API",
      "WhatsApp Transactional Messaging",
      "WhatsApp Template Classification",
      "WhatsApp Business API Pricing",
      "WhatsApp Order Notifications",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

const utilityStats = [
  { value: "98%", label: "Open Rate", sublabel: "instant visibility" },
  { value: "< 30s", label: "Delivery Time", sublabel: "critical alerts" },
  { value: "FREE", label: "In-Window", sublabel: "24h service window" },
  { value: "₹0.12", label: "Avg Cost", sublabel: "India pricing" },
];

const utilityCategories = [
  { icon: Package, title: "Order Management", description: "Confirmations, cancellations, modifications", examples: ["Order Confirmed", "Order Cancelled", "Order Modified"] },
  { icon: Truck, title: "Logistics & Delivery", description: "Shipping alerts, tracking, delivery updates", examples: ["Shipped", "Out for Delivery", "Delivered"] },
  { icon: CreditCard, title: "Finance & Payments", description: "Payment receipts, billing, refund status", examples: ["Payment Received", "Invoice Generated", "Refund Processed"] },
  { icon: Calendar, title: "Appointments", description: "Reminders and schedule confirmations", examples: ["Appointment Confirmed", "Reminder: Tomorrow", "Rescheduled"] },
  { icon: Shield, title: "Account & Security", description: "Subscription renewals, activity alerts", examples: ["Password Changed", "Renewal Due", "Security Alert"] },
  { icon: Bell, title: "System Alerts", description: "Service updates, maintenance notices", examples: ["Service Restored", "Maintenance Scheduled", "Alert Resolved"] },
];

const portalFeatures = [
  { icon: Webhook, title: "API Webhook Integration", description: "Trigger messages instantly from Shopify, WooCommerce, or custom CRMs with real-time event hooks.", features: ["Real-time Triggers", "Multi-platform", "Auto-retry Logic"] },
  { icon: Upload, title: "Bulk CSV/Excel Upload", description: "Handle bulk notifications for delayed flights or city-wide service alerts with clear header mapping.", features: ["Header Mapping", "Validation", "Preview Mode"] },
  { icon: Database, title: "Personalization Engine", description: "Sequential dynamic variables ({{1}}, {{2}}) to insert customer-specific data while keeping templates neutral.", features: ["Variable Validation", "Preview Test", "Error Detection"] },
  { icon: Layers, title: "Interactive Utility Buttons", description: "Standardize 'Track Order,' 'Confirm Appointment,' or 'Download Invoice' buttons to reduce friction.", features: ["Quick Actions", "Deep Links", "Callback Data"] },
];

const reclassificationTraps = [
  { trigger: "Warm Greetings", fails: "\"We're excited to confirm your order!\" is promotional", fix: "Use neutral language: \"Your order #123 is confirmed.\"" },
  { trigger: "Upselling", fails: "Adding \"Check out our new arrivals\" to a receipt", fix: "Keep templates pure. Only include transaction info." },
  { trigger: "Promotional Buttons", fails: "\"Shop More\" or \"Learn More\" buttons", fix: "Use functional buttons like \"Track Order\" or \"View PDF.\"" },
  { trigger: "Vague Content", fails: "\"Hi {{1}}, thank you for choosing us.\" too generic", fix: "Reference specific action: \"We received your payment of {{2}}.\"" },
];

const reviewScenarios = [
  { type: "Machine-Learning Triage", trigger: "Standard transactional templates", duration: "30 min - 24 hours" },
  { type: "Human Review", trigger: "Complex variables, sensitive industries", duration: "Up to 48 hours" },
  { type: "Appeal Process", trigger: "Auto-reclassified as Marketing", duration: "60 days to appeal" },
];

const pricingComparison = [
  { scenario: "Inside 24h Service Window", utility: "FREE", marketing: "FREE", note: "Customer initiated" },
  { scenario: "Outside Service Window", utility: "₹0.115-0.145", marketing: "₹0.35-0.85", note: "Business initiated" },
  { scenario: "Reclassified as Marketing", utility: "₹0.35+", marketing: "₹0.35+", note: "300-800% cost spike" },
];

const throughputData = [
  { tier: "Tier 1-3", mps: "80 MPS", useCase: "Standard transactional volume" },
  { tier: "Tier 4 (Unlimited)", mps: "1,000 MPS", useCase: "Tax deadlines, mass events" },
];

const buttonTypes = [
  { type: "Track Order", icon: MapPin, example: "Opens tracking page or sends status" },
  { type: "View Invoice", icon: FileText, example: "Downloads PDF or opens portal" },
  { type: "Confirm Appointment", icon: Calendar, example: "Sends confirmation callback" },
  { type: "Contact Support", icon: MessageCircle, example: "Opens 24h service window" },
];

const consentTypes = [
  { type: "Checkout Consent", valid: true, example: "\"I agree to receive order updates via WhatsApp\"" },
  { type: "Account Settings", valid: true, example: "Explicit toggle in user preferences" },
  { type: "Past Orders Only", valid: false, example: "Having customer's number is NOT consent" },
  { type: "Implicit Assumption", valid: false, example: "Assuming consent from previous interaction" },
];

const faqs = [
  { q: "What's the difference between Utility and Marketing messages?", a: "Utility messages are transaction-triggered and non-promotional—order confirmations, shipping alerts, payment receipts. Marketing messages are proactive promotions. Utility messages cost 70-85% less and have higher delivery priority. The key distinction: Utility = factual, expected information. Marketing = persuasive, discovery-driven content." },
  { q: "Why was my Utility template reclassified as Marketing?", a: "Meta's AI scans for 'warm' or 'persuasive' language. Common triggers: enthusiastic greetings ('We're excited!'), upselling phrases ('Check out our new arrivals'), promotional buttons ('Shop More'), or vague content without specific transaction references. Reclassification can increase costs by 300-800%." },
  { q: "How long does Utility template approval take?", a: "Standard transactional templates are typically approved within 30 minutes to 24 hours via machine-learning triage. Templates with complex variables or in sensitive industries (finance, healthcare) can take up to 48 hours for manual human review." },
  { q: "When are Utility messages FREE?", a: "If a customer messages you first, any message (Utility or template) sent within the 24-hour Customer Service Window is FREE. This is why encouraging customer responses—like 'Reply for order status'—can significantly reduce messaging costs." },
  { q: "What is the 'time-sensitive' priority flag?", a: "Through the Marketing Messages Lite API, you can flag Utility messages as 'time-sensitive.' This allows critical alerts to bypass standard marketing queues and deliver immediately, even if the recipient has reached their daily global frequency limit." },
  { q: "Do I need opt-in consent for Utility messages?", a: "Yes. In 2026, Meta mandates traceable opt-in records. 'Consent at Checkout' (explicit checkbox) is compliant. Merely having a customer's number from a past order is NOT sufficient for proactive API messaging." },
  { q: "What happens if my Utility template is rejected?", a: "You have 60 days to request a manual review via Meta Business Manager. Common fixes: remove promotional language, add specific transaction references, use functional buttons only. Delete rejected templates before resubmitting with corrections." },
  { q: "Can I use AI for Utility responses?", a: "Yes, but only 'Business-Context AI' is allowed. General-purpose AI (open-ended LLM bots) is prohibited as of January 15, 2026. AI that answers 'Where is my order?' or 'How do I return this?' is fully compliant if it stays within its functional purpose." },
  { q: "What's the throughput for Utility messages?", a: "Tiers 1-3 offer approximately 80 Messages Per Second (MPS). Tier 4 (Unlimited) accounts can scale to 1,000 MPS—ideal for massive transactional events like tax-deadline reminders or city-wide service alerts." },
  { q: "Does Meta charge for undelivered messages?", a: "No. If a status remains 'Sent' (single gray check) because the recipient's phone is offline, Meta does not charge. You only pay for successfully delivered messages." },
];

const onboardingSteps = [
  { step: 1, title: "Complete Meta Verification", description: "Move past Tier 0 (250 users) to unlock transactional volume" },
  { step: 2, title: "Create Neutral Templates", description: "Use factual language, specific references, functional buttons" },
  { step: 3, title: "Set Up Webhook Triggers", description: "Connect Shopify, WooCommerce, or custom CRM for automation" },
  { step: 4, title: "Test & Monitor Delivery", description: "Verify 24h service window usage, track delivery rates" },
];

const bestPractices = [
  { icon: FileText, title: "Keep It Neutral", description: "Cold, factual language prevents reclassification" },
  { icon: RefreshCw, title: "Maximize Free Window", description: "Encourage replies to utilize 24h service window" },
  { icon: Clock, title: "Set Time-Sensitive Flag", description: "Critical alerts bypass marketing queues" },
  { icon: Lock, title: "Maintain Consent Records", description: "Traceable opt-ins required for audits" },
];

const schemaData = [
  generateServiceSchema({
    name: "WhatsApp Utility & Transactional Messaging",
    description: seoDescription,
    url: pageUrl,
  }),
  generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/#solutions" },
    { name: "Utility Messaging", url: pagePath },
  ]),
];

export default function WhatsAppUtilityPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <JsonLd data={schemaData} />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {/* Hero */}
        <Section tone="brand-soft" pad="lg">
          <Container>
            <div className="grid gap-10 lg:gap-14 lg:grid-cols-2 items-center">
              <div className="text-center lg:text-left min-w-0">
                <Eyebrow icon={Award} className="mb-5">Official Meta Tech Partner</Eyebrow>
                <h1 className="heading-1 mb-5">Enterprise WhatsApp Utility Messaging</h1>
                <p className="text-lead measure-prose mx-auto lg:mx-0 mb-6">
                  The critical nervous system of enterprise-customer relations. Transaction-triggered,
                  non-promotional messaging with 98% open rates and 70-85% lower costs than marketing.
                </p>

                <CTAGroup align="responsive-hero" className="mb-8">
                  <PrimaryCTA href="https://chat.whats91.com">Access Utility Portal</PrimaryCTA>
                  <SecondaryCTA href="https://developers.whats91.com/overview">View API Docs</SecondaryCTA>
                </CTAGroup>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
                  <TrustPill>Per-Message Billing</TrustPill>
                  <TrustPill>Time-Sensitive Priority</TrustPill>
                  <TrustPill>24h Free Window</TrustPill>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:gap-5 min-w-0">
                {utilityStats.map((stat) => (
                  <StatCard key={stat.label} value={stat.value} label={stat.label} caption={stat.sublabel} />
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* What Qualifies */}
        <Section tone="surface" aria-labelledby="taxonomy-heading">
          <Container>
            <SectionHeader
              eyebrow="Core Taxonomy"
              eyebrowIcon={FileCheck}
              id="taxonomy-heading"
              title='What Qualifies as "Utility" in 2026?'
              description="Utility messages are strictly transaction-triggered and non-promotional. Understanding these categories prevents costly classification errors."
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {utilityCategories.map((category) => (
                <div key={category.title} className="surface-card surface-card-hover p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <IconBadge icon={category.icon} />
                    <h4 className="text-base font-semibold text-text-primary">{category.title}</h4>
                  </div>
                  <p className="text-body-sm mb-3">{category.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {category.examples.map((ex) => (
                      <span key={ex} className="px-2 py-0.5 rounded bg-surface text-xs text-text-muted">
                        {ex}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Portal Features */}
        <Section aria-labelledby="portal-heading">
          <Container>
            <SectionHeader
              eyebrow="Portal Capabilities"
              eyebrowIcon={Settings}
              id="portal-heading"
              title="Tools for High-Volume Transactional Flows"
            />
            <div className="grid gap-6 md:grid-cols-2">
              {portalFeatures.map((feature) => (
                <div key={feature.title} className="surface-card p-6 sm:p-8">
                  <IconBadge icon={feature.icon} size="lg" className="mb-5" />
                  <h3 className="heading-3 mb-3">{feature.title}</h3>
                  <p className="text-body mb-4">{feature.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {feature.features.map((f) => (
                      <span key={f} className="px-3 py-1 rounded-full bg-brand-primary/5 text-xs font-medium text-brand-primary">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Reclassification Trap */}
        <Section tone="surface" aria-labelledby="trap-heading">
          <Container>
            <div className="flex flex-col items-center gap-3 sm:gap-4 mb-10 sm:mb-12 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-error-soft border border-error-border px-4 py-1.5 text-xs sm:text-sm font-medium text-error">
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                Critical Warning
              </span>
              <h2 id="trap-heading" className="heading-2">
                The Utility-to-Marketing Reclassification Trap
              </h2>
              <p className="text-lead max-w-2xl mx-auto">
                Meta&apos;s AI scans for &quot;warm&quot; or &quot;persuasive&quot; language. If reclassified, costs can
                increase by <span className="font-bold text-error">300-800%</span> immediately.
              </p>
            </div>

            <div className="surface-card border-error-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px]">
                  <thead>
                    <tr className="bg-error-soft">
                      <th className="text-left p-4 text-xs font-semibold text-error uppercase">Trigger</th>
                      <th className="text-left p-4 text-xs font-semibold text-error uppercase">Why It Fails</th>
                      <th className="text-left p-4 text-xs font-semibold text-error uppercase">Corrected Approach</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reclassificationTraps.map((row) => (
                      <tr key={row.trigger} className="border-t border-error-border/60">
                        <td className="p-4 text-sm font-medium text-error">{row.trigger}</td>
                        <td className="p-4 text-sm text-text-secondary">{row.fails}</td>
                        <td className="p-4 text-sm text-success font-medium">{row.fix}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-info-border bg-info-soft p-5 text-center">
              <p className="text-sm text-text-primary">
                <strong>Pro Tip:</strong> Neutrality is Profit. Cold, factual language is the key to maintaining
                low Utility pricing tiers.
              </p>
            </div>
          </Container>
        </Section>

        {/* Review Process */}
        <Section aria-labelledby="review-heading">
          <Container>
            <SectionHeader
              id="review-heading"
              title="Meta Review Cycles & Approval Norms"
              description="2026 approval process for Utility templates is more stringent than Marketing"
            />
            <div className="grid gap-6 md:grid-cols-3">
              {reviewScenarios.map((item) => (
                <div key={item.type} className="surface-card surface-card-hover p-5">
                  <IconBadge icon={Clock} size="lg" className="mb-4" />
                  <h4 className="text-base font-semibold text-text-primary mb-2">{item.type}</h4>
                  <p className="text-body-sm mb-2">{item.trigger}</p>
                  <div className="text-lg font-bold text-brand-primary">{item.duration}</div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Pricing Comparison */}
        <Section tone="surface" aria-labelledby="pricing-heading">
          <Container>
            <SectionHeader
              eyebrow="Pricing Logic"
              eyebrowIcon={DollarSign}
              id="pricing-heading"
              title="Utility vs Marketing Pricing (India)"
            />
            <div className="surface-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px]">
                  <thead>
                    <tr className="bg-surface/80">
                      <th className="text-left p-4 text-xs font-semibold text-text-muted uppercase">Scenario</th>
                      <th className="text-center p-4 text-xs font-semibold text-brand-primary uppercase">Utility</th>
                      <th className="text-center p-4 text-xs font-semibold text-text-muted uppercase">Marketing</th>
                      <th className="text-left p-4 text-xs font-semibold text-text-muted uppercase">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pricingComparison.map((row) => (
                      <tr key={row.scenario} className="border-t border-border/60">
                        <td className="p-4 text-sm text-text-primary font-medium">{row.scenario}</td>
                        <td className="p-4 text-sm text-center font-bold text-brand-primary">{row.utility}</td>
                        <td className="p-4 text-sm text-center text-text-muted">{row.marketing}</td>
                        <td className="p-4 text-sm text-text-secondary">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-5 text-center">
              <p className="text-sm text-text-secondary">
                <strong className="text-brand-primary">24h Service Window:</strong> If a customer messages you
                first, any message sent within 24 hours is <strong>FREE</strong>. Encourage customer responses to
                maximize this window.
              </p>
            </div>
          </Container>
        </Section>

        {/* Delivery Behavior */}
        <Section aria-labelledby="delivery-heading">
          <Container>
            <SectionHeader id="delivery-heading" title="Delivery Behavior & Throughput" />
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <div className="surface-card overflow-hidden">
                <div className="p-5 bg-surface/50 border-b border-border/60">
                  <h3 className="heading-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                    Messages Per Second
                  </h3>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="text-left p-4 text-xs font-semibold text-text-muted uppercase">Tier</th>
                      <th className="text-left p-4 text-xs font-semibold text-text-muted uppercase">MPS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {throughputData.map((row) => (
                      <tr key={row.tier} className="border-b border-border/20 last:border-0">
                        <td className="p-4 text-sm text-text-primary font-medium">{row.tier}</td>
                        <td className="p-4 text-sm text-brand-primary font-bold">{row.mps}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="surface-card p-6">
                <IconBadge icon={TrendingUp} size="lg" className="mb-4" />
                <h3 className="heading-4 mb-2">Time-Sensitive Priority Flag</h3>
                <p className="text-body-sm mb-3">
                  Through the Marketing Messages Lite API, flag Utility messages as &quot;time-sensitive&quot; to
                  bypass marketing queues and deliver immediately—even if the recipient has reached their daily
                  frequency limit.
                </p>
                <p className="text-caption">Ideal for: OTP alternatives, security alerts, critical updates</p>
              </div>
            </div>

            <div className="surface-card p-5 text-center">
              <p className="text-sm text-text-secondary">
                <strong className="text-text-primary">Handset Delays:</strong> If status remains &quot;Sent&quot;
                (single gray check), the recipient&apos;s phone is likely offline. Meta does{" "}
                <strong>not charge</strong> for undelivered messages.
              </p>
            </div>
          </Container>
        </Section>

        {/* Interactive Buttons */}
        <Section tone="surface" aria-labelledby="buttons-heading">
          <Container>
            <SectionHeader
              eyebrow="Interactive Elements"
              eyebrowIcon={Layers}
              id="buttons-heading"
              title="Utility Button Standards"
              description='Use functional buttons only. Avoid promotional CTAs like "Shop More" or "Learn More."'
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {buttonTypes.map((btn) => (
                <div key={btn.type} className="surface-card surface-card-hover p-5 text-center">
                  <IconBadge icon={btn.icon} className="mx-auto mb-3" />
                  <h4 className="text-sm font-semibold text-text-primary mb-2">{btn.type}</h4>
                  <p className="text-xs text-text-secondary">{btn.example}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Consent Requirements */}
        <Section aria-labelledby="consent-heading">
          <Container>
            <SectionHeader
              eyebrow="Compliance"
              eyebrowIcon={UserCheck}
              id="consent-heading"
              title="Mandatory Consent Requirements"
              description="2026 Meta mandates traceable opt-in records for all proactive messaging"
            />
            <div className="grid gap-4 md:grid-cols-2">
              {consentTypes.map((item) => (
                <div
                  key={item.type}
                  className={`flex items-start gap-4 rounded-xl border p-5 ${item.valid ? "border-success-border bg-success-soft" : "border-error-border bg-error-soft"}`}
                >
                  {item.valid ? (
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" aria-hidden="true" />
                  ) : (
                    <AlertTriangle className="h-5 w-5 text-error shrink-0 mt-0.5" aria-hidden="true" />
                  )}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm font-semibold text-text-primary">{item.type}</h4>
                      <span className={`text-xs px-2 py-0.5 rounded ${item.valid ? "bg-success/10 text-success" : "bg-error/10 text-error"}`}>
                        {item.valid ? "Valid" : "Invalid"}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary">{item.example}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-xl border border-warning-border bg-warning-soft p-5">
              <div className="flex items-start gap-3">
                <Bot className="h-5 w-5 text-warning shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h4 className="text-sm font-semibold text-text-primary mb-1">2026 AI Policy Update</h4>
                  <p className="text-sm text-text-secondary">
                    <strong>January 15, 2026:</strong> General-purpose AI (open-ended LLM bots) is prohibited.
                    Only &quot;Business-Context AI&quot; is allowed—for answering &quot;Where is my order?&quot; or
                    &quot;How do I return this?&quot; within functional purpose.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Developer Sandbox */}
        <Section tone="surface" aria-labelledby="sandbox-heading">
          <Container size="narrow">
            <SectionHeader
              eyebrow="Developer Sandbox"
              eyebrowIcon={Database}
              id="sandbox-heading"
              title="Sample Utility Template Request"
            />
            <UtilityCodeSandbox />
            <div className="mt-4 text-center">
              <p className="text-sm text-text-secondary">
                Template name:{" "}
                <code className="px-2 py-0.5 rounded bg-surface text-brand-primary font-mono">order_confirmation</code>{" "}
                with 3 body parameters: Order ID, Amount, Date
              </p>
            </div>
          </Container>
        </Section>

        {/* Best Practices */}
        <Section aria-labelledby="practices-heading">
          <Container>
            <SectionHeader id="practices-heading" title="Strategic Best Practices" />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {bestPractices.map((item) => (
                <div key={item.title} className="surface-card surface-card-hover p-5 text-center">
                  <IconBadge icon={item.icon} className="mx-auto mb-3" />
                  <h4 className="text-sm font-semibold text-text-primary mb-1">{item.title}</h4>
                  <p className="text-xs text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Setup Steps */}
        <Section tone="surface" aria-labelledby="setup-heading">
          <Container size="narrow">
            <SectionHeader id="setup-heading" title="Quick Start Guide" />
            <div className="space-y-4">
              {onboardingSteps.map((item) => (
                <div key={item.step} className="surface-card flex items-start gap-4 p-5">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white text-sm font-bold shadow-md shadow-brand-primary/20">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="text-base font-semibold text-text-primary mb-1">{item.title}</h4>
                    <p className="text-body-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section aria-labelledby="faq-heading">
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
                <h2 className="heading-2 !text-white mb-4">Start sending reliable transactional alerts today</h2>
                <p className="text-base sm:text-lg text-white/90 mb-8">
                  Join 500+ enterprises using Whats91 for high-delivery, low-cost utility messaging.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href="https://chat.whats91.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white text-brand-700 hover:bg-white/95 rounded-xl shadow-lg transition-colors"
                  >
                    Access Utility Portal
                  </a>
                  <ContactCard
                    variant="popup"
                    trigger={
                      <button className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl transition-colors">
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
