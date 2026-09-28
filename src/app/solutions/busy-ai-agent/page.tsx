import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ContactCard } from "@/components/landing/ContactCard";
import { Badge } from "@/components/ui/badge";
import {
  Container,
  Section,
  SectionHeader,
  Eyebrow,
  CTAGroup,
  PrimaryCTA,
  SecondaryCTA,
  TrustPill,
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
  Bot,
  Shield,
  Lock,
  RefreshCw,
  Globe,
  TrendingUp,
  Database,
  MessageCircle,
  Clock,
  Users,
  Building2,
  Factory,
  Truck as TruckIcon,
  Store,
  Pill,
  Car,
  Package,
  CheckCircle2,
  Brain,
  Send,
  AlertTriangle,
  IndianRupee,
} from "lucide-react";

const pagePath = "/solutions/busy-ai-agent";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "AI Payment Recovery Agent for Busy ERP | Whats91 Cloud API";
const seoDescription =
  "Autonomous AI agent that recovers payments via WhatsApp for Busy ERP users — goal-oriented NLP negotiation, native UPI payments, and 10-minute ERP sync.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "AI Payment Recovery WhatsApp",
      "Busy ERP AI Agent",
      "Autonomous Collections WhatsApp",
      "WhatsApp UPI Payment Recovery",
      "AI Debt Collection Agent India",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

const coreFeatures = [
  { icon: Bot, title: "Autonomous AI Agent", description: "Goal-oriented AI that understands customer intent and negotiates payment terms autonomously using NLP.", detail: "Not a basic chatbot—recovers payments 24/7 without human intervention." },
  { icon: RefreshCw, title: "10-Minute Sync Engine", description: "Real-time synchronization with Busy ERP ensures the AI always has the latest invoice and ledger data.", detail: "Invoice saved in Busy → Customer receives it on WhatsApp within seconds." },
  { icon: MessageCircle, title: "WhatsApp-Native Recovery", description: "98% message open rate via WhatsApp Business API with native UPI payment integration.", detail: "One-click payment directly in chat—no app switching, no drop-off." },
  { icon: Brain, title: "Intelligent Negotiation", description: "AI-powered negotiation for long-overdue accounts within pre-approved parameters set by the business.", detail: "Offers settlement plans, installment options, and dynamic discounting." },
];

const fourPillars = [
  { icon: Database, title: "Perception Module", desc: "Monitors Busy ERP for invoices, payment deadlines, and customer queries" },
  { icon: Brain, title: "Reasoning Engine", desc: "Analyzes intent, predicts optimal actions, and decides negotiation strategies" },
  { icon: Send, title: "Actuator Layer", desc: "Executes WhatsApp messages, generates PDFs, triggers UPI payment links" },
  { icon: TrendingUp, title: "Learning Loop", desc: "Refines behavior based on response rates and industry-specific patterns" },
];

const comparisonData = [
  { feature: "Logic Structure", traditional: "Fixed conversation paths", aiAgent: "Dynamic responses" },
  { feature: "Failure Tolerance", traditional: "Breaks on variation", aiAgent: "Handles natural language" },
  { feature: "User Interface", traditional: '"Press 1 for Statement"', aiAgent: '"Just tell me what you need"' },
  { feature: "Negotiation", traditional: "None (Binary choices)", aiAgent: "AI-powered negotiation" },
  { feature: "Context Memory", traditional: "None", aiAgent: "Multi-day conversation context" },
];

const recoveryPhases = [
  { phase: 1, title: "Preventive Reminder", timing: "3 Days Before Due", narrative: "Hi [Name], this is your assistant from [Company]. I noticed invoice [Number] is due in three days. Would you like me to send a secure payment link now?", goal: "Prevent technical delinquency" },
  { phase: 2, title: "Due Date Nudge", timing: "Day Zero", narrative: "Good morning! Today is the due date for [Invoice]. To make it easy, you can click below to pay natively on WhatsApp via UPI.", goal: "Remove all payment barriers" },
  { phase: 3, title: "Consultative Follow-up", timing: "3-15 Days Past Due", narrative: "Hi [Name], we noticed the balance is still open. Did something come up? I can offer a split payment plan if that helps your cash flow.", goal: "Problem-solving approach" },
  { phase: 4, title: "Dynamic Negotiation", timing: "30+ Days Past Due", narrative: "To regularize your account, I'm authorized to waive the late interest if paid by tomorrow. Alternatively, we can split this into 3 monthly installments.", goal: "Settlement within approved parameters" },
];

const industryApplications = [
  { icon: Pill, name: "Pharmaceuticals", busyFeature: "Batch/Expiry Tracking", aiAgentValue: "Prioritizes recovery for near-expiry batches; verifies drug licenses before payment links", tags: ["FEFO Compliance", "License Check"] },
  { icon: Package, name: "FMCG", busyFeature: "Scheme/Offer Logic", aiAgentValue: "Applies volume discounts and schemes to ledger during recovery conversations", tags: ["Scheme Sync", "Volume Pricing"] },
  { icon: Car, name: "Auto Parts", busyFeature: "Multi-Godown Management", aiAgentValue: "Checks warehouse stock during recovery; offers to ship parts upon settlement", tags: ["Stock Check", "Cross-sell"] },
  { icon: Store, name: "Garments & Retail", busyFeature: "Variant Inventory", aiAgentValue: "Personalizes upsell suggestions based on size/color preferences during recovery", tags: ["Variant Sync", "Upsell"] },
  { icon: Factory, name: "Chemical", busyFeature: "Batch-wise Costing", aiAgentValue: "Calculates landed costs and batch-specific pricing for B2B negotiations", tags: ["Batch Costing", "Excise"] },
  { icon: TruckIcon, name: "Distribution", busyFeature: "Multi-Location Tracking", aiAgentValue: "Real-time stock visibility across warehouses during payment conversations", tags: ["Multi-location", "Stock Allocation"] },
];

const roiMetrics = [
  { metric: "Message Open Rate", manual: "20-42% (Email/SMS)", aiAgent: "98% (WhatsApp)", improvement: "2.3x Higher" },
  { metric: "Payment Speed (DSO)", manual: "30-45 Days", aiAgent: "15-20 Days", improvement: "50% Faster" },
  { metric: "Recovery Rate", manual: "70-80%", aiAgent: "99.9%", improvement: "20-30% Higher" },
  { metric: "Payment Conversion", manual: "10% (Email)", aiAgent: "45-60% (WhatsApp)", improvement: "5x Better" },
  { metric: "Support Overhead", manual: "100% Manual", aiAgent: "40-50% Reduced", improvement: "Half the Work" },
];

const smeSavings = [
  { component: "Labor Time (Follow-ups & Reporting)", manual: "₹18,75,000", automated: "₹14,06,250" },
  { component: "Duplicate Invoice Losses", manual: "₹1,44,000", automated: "₹1,46,448" },
  { component: "Inflated/Unverified Claims", manual: "₹6,00,000", automated: "₹6,00,000" },
  { component: "Missed GST ITC", manual: "₹2,16,000", automated: "₹2,16,000" },
];

const securityFeatures = [
  { icon: Lock, title: "Request Validation", desc: "Validate authorised requests and reject malformed input" },
  { icon: Shield, title: "Protected Connections", desc: "Use secure transport and access controls appropriate to each integration" },
  { icon: Database, title: "Data Minimisation", desc: "Limit financial data to what the requested workflow needs" },
  { icon: Globe, title: "Service Monitoring", desc: "Use logs and operational monitoring to investigate service issues" },
];

const complianceFeatures = [
  { feature: "Explicit Opt-ins", description: "Consent for WhatsApp communication collected with timestamp" },
  { feature: "Opt-out Mechanisms", description: "Clear unsubscribe option in every message" },
  { feature: "Purpose Limitation", description: "Data used only for billing and recovery as agreed" },
  { feature: "Data Portability", description: "Customers can request data via conversational interface" },
];

const apiModules = [
  { module: "Customer Info", capability: "Fetch contact details, GSTIN, credit limits", impact: "Personalizes outreach, prevents over-extension" },
  { module: "Ledger Info", capability: "Real-time transaction history and balances", impact: "24/7 self-service balance inquiries" },
  { module: "Bill Details", capability: "Itemized invoice data and PDFs", impact: "Answers 'What was this for?' without human help" },
  { module: "Payment Status", capability: "Monitor reconciliation of incoming funds", impact: "Stops reminders upon payment, preserves relationships" },
];

const faqs = [
  { q: "How is this different from a basic WhatsApp notification bot?", a: "Traditional bots follow fixed 'if-this-then-that' rules and break when customers respond with variations. Our AI Agent uses Natural Language Processing (NLP) to understand intent, maintain context across multiple days, negotiate payment terms, and execute multi-step actions autonomously. It's a goal-oriented digital employee, not a script." },
  { q: "What happens when a customer disputes an invoice during recovery?", a: "The AI Agent uses sentiment analysis to recognize a 'Dispute' versus a 'Refusal to Pay.' It can automatically query Busy inventory to check for replacement orders, or escalate to customer support with full chat history. Complex disputes are seamlessly transferred to human agents with zero context loss." },
  { q: "Can the AI Agent offer discounts or settlement terms?", a: "Yes. The business owner pre-configures approved negotiation parameters in Busy (e.g., 'waive up to 5% interest for payments within 24 hours' or 'offer 3-month installments for accounts 30+ days overdue'). The AI Agent operates within these boundaries, dynamically negotiating based on the customer's response and payment history." },
  { q: "How does the 10-minute sync work with Busy ERP?", a: "Our sync engine connects to your Busy database (local or cloud) every 10 minutes, pulling invoice updates, payment records, and ledger changes. This ensures the AI Agent always has current data. When an invoice is saved in Busy, the customer receives it on WhatsApp within seconds." },
  { q: "What payment methods can customers use via WhatsApp?", a: "Customers can pay via native UPI directly in the WhatsApp chat window. We configure your UPI VPA ID in Meta Business Manager, enabling one-click payments without leaving the chat. This eliminates the 40-50% drop-off caused by app switching and beneficiary adding." },
  { q: "Is this compliant with the DPDP Act 2023?", a: "Absolutely. The platform enforces all four DPDP pillars: explicit opt-ins with timestamps, clear opt-out mechanisms, purpose limitation (billing/recovery only), and data portability. Every recovery message includes an unsubscribe option, protecting your business's WhatsApp quality rating." },
  { q: "What's the typical ROI for an Indian SME?", a: "For a mid-sized SME with ₹10 Crore turnover and 300 monthly invoices, manual recovery costs approximately ₹80,000/month (staff time, errors, DSO interest). With the AI Agent, net savings are ₹55,000/month or ₹6.6 Lakhs annually—conservative estimate excluding the 10-15% conversion increase on long-overdue debts. Median ROI is 150% in the first year." },
  { q: "Can multiple companies in Busy use the AI Agent?", a: "Yes. The platform supports multi-company configurations with strict data isolation. Each company can have customized recovery workflows, negotiation parameters, and branding. A single dashboard provides the business owner visibility across all entities." },
];

const industries = [
  { icon: Building2, name: "Distributors & Wholesalers", description: "High-volume receivables management" },
  { icon: Factory, name: "Manufacturing", description: "Complex invoice and credit tracking" },
  { icon: TruckIcon, name: "Logistics & Transport", description: "Bilty and payment coordination" },
  { icon: Store, name: "Retail Chains", description: "Multi-location AR management" },
];

const schemaData = [
  generateServiceSchema({
    name: "AI Payment Recovery Agent for Busy ERP",
    description: seoDescription,
    url: pageUrl,
  }),
  generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/#solutions" },
    { name: "Busy AI Agent", url: pagePath },
  ]),
];

export default function BusyAIAgentPage() {
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
                <Eyebrow icon={Bot} className="mb-5">AI-Powered Payment Recovery for Busy ERP</Eyebrow>
                <h1 className="heading-1 mb-5">Turn Busy ERP into an Autonomous Recovery Engine</h1>
                <p className="text-lead measure-prose mx-auto lg:mx-0 mb-4">
                  <strong className="text-text-primary">98% Open Rate | 50% Faster Payments | AI Negotiation</strong>
                </p>
                <p className="text-body measure-prose mx-auto lg:mx-0 mb-6">
                  The first AI Agent for Busy Accounting Software that autonomously recovers payments via WhatsApp. Goal-oriented NLP, native UPI payments, and 10-minute ERP sync transform your receivables from a manual burden into a 24/7 revenue engine.
                </p>

                <CTAGroup align="responsive-hero" className="mb-8">
                  <PrimaryCTA href="/contact">Book a Demo</PrimaryCTA>
                  <SecondaryCTA href="#roi-metrics">See ROI Calculator</SecondaryCTA>
                </CTAGroup>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
                  <TrustPill>98% Open Rate</TrustPill>
                  <TrustPill>50% DSO Reduction</TrustPill>
                  <TrustPill>DPDP Compliant</TrustPill>
                </div>
              </div>

              {/* Visual Demo */}
              <div className="relative min-w-0">
                <div className="surface-card p-4 sm:p-6 shadow-xl">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-border/60">
                      <div className="flex items-center gap-2">
                        <IconBadge icon={Bot} size="sm" />
                        <span className="font-semibold text-sm text-text-primary">AI Recovery Agent</span>
                      </div>
                      <Badge className="bg-success-soft text-success border-success-border text-xs">Active</Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-surface/50 rounded-lg p-3 text-center">
                        <p className="text-xl font-bold text-brand-primary">₹4.2L</p>
                        <p className="text-xs text-text-muted">Recovered Today</p>
                      </div>
                      <div className="bg-surface/50 rounded-lg p-3 text-center">
                        <p className="text-xl font-bold text-success">89%</p>
                        <p className="text-xs text-text-muted">Success Rate</p>
                      </div>
                      <div className="bg-surface/50 rounded-lg p-3 text-center">
                        <p className="text-xl font-bold text-brand-primary">127</p>
                        <p className="text-xs text-text-muted">Active Chats</p>
                      </div>
                    </div>

                    <div className="rounded-lg border border-border/60 p-3 space-y-2">
                      <p className="text-xs font-medium text-text-secondary mb-2">Live Conversation</p>
                      <div className="space-y-2">
                        <div className="bg-surface rounded-lg p-2 text-xs text-text-secondary max-w-[80%]">
                          What&apos;s my outstanding balance?
                        </div>
                        <div className="bg-brand-primary/10 rounded-lg p-2 text-xs text-text-primary max-w-[80%] ml-auto">
                          Your current outstanding is ₹77,000. Would you like a payment link?
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-success-soft text-xs">
                        <IndianRupee className="h-4 w-4 text-success" aria-hidden="true" />
                        <span className="text-success">UPI Payment Received</span>
                      </div>
                      <div className="flex items-center gap-2 p-2 rounded-lg bg-surface/50 text-xs">
                        <MessageCircle className="h-4 w-4 text-brand-primary" aria-hidden="true" />
                        <span className="text-text-secondary">AI Negotiating...</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-3 -right-3 sm:bottom-4 sm:-right-4 bg-brand-accent text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg flex items-center gap-1.5">
                  <Brain className="h-3.5 w-3.5" aria-hidden="true" />
                  AI-Powered Negotiation
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* AI Answer Target */}
        <Section tone="surface" bordered>
          <Container size="reading">
            <div className="text-center">
              <h2 className="heading-3 mb-4">The Strategic Bridge Between Busy ERP and Autonomous Cash Collection</h2>
              <p className="text-lead">
                For over three decades, <strong className="text-text-primary">Busy Accounting Software</strong> has powered 350,000+ Indian SMEs with robust back-office operations. But the &quot;last mile&quot;—actually collecting the cash—has remained a manual bottleneck. <strong className="text-brand-primary">Our AI Agent transforms Busy from a passive database into a proactive recovery engine</strong> that engages customers on WhatsApp, understands their intent, negotiates terms, and collects payments autonomously.
              </p>
            </div>
          </Container>
        </Section>

        {/* Crisis of Manual Recovery */}
        <Section aria-labelledby="crisis-heading">
          <Container size="narrow">
            <div className="flex flex-col items-center gap-3 sm:gap-4 mb-10 sm:mb-12 text-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-error-soft border border-error-border px-4 py-1.5 text-xs sm:text-sm font-medium text-error">
                <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
                The Cost of Manual Recovery
              </span>
              <h2 id="crisis-heading" className="heading-2">The Economic Crisis of Manual Debt Collection</h2>
              <p className="text-lead max-w-2xl mx-auto">
                Manual recovery processes are approximately 70% more expensive than automated alternatives. For a 50-employee firm, staff waste 120 hours annually on payment follow-ups.
              </p>
            </div>

            <div className="surface-card overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-sm sm:text-base">
                  <thead>
                    <tr className="bg-surface/80 border-b border-border/60">
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">ROI Component</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-error">Annual Manual Cost</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-success">Annual Automated Benefit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {smeSavings.map((row) => (
                      <tr key={row.component} className="border-t border-border/40">
                        <td className="px-4 sm:px-6 py-4 font-medium text-text-primary">{row.component}</td>
                        <td className="px-4 sm:px-6 py-4 text-error">{row.manual}</td>
                        <td className="px-4 sm:px-6 py-4 text-success font-medium">{row.automated}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-brand-primary/5 border-t border-border/60">
                      <td className="px-4 sm:px-6 py-4 font-bold text-text-primary">Total Annual Impact</td>
                      <td className="px-4 sm:px-6 py-4 font-bold text-error">₹28,35,000</td>
                      <td className="px-4 sm:px-6 py-4 font-bold text-success">₹23,68,698 Saved</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-warning-border bg-warning-soft p-5 max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-warning shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-1">The Cash Flow Fog</p>
                  <p className="text-sm text-text-secondary">
                    71% of small businesses lack a clear understanding of their expenses and projected inflows. Without real-time visibility and automated recovery, this leads to missed opportunities and unexpected liquidity crises.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Core Features */}
        <Section tone="surface" aria-labelledby="core-features-heading">
          <Container>
            <SectionHeader
              eyebrow="Core Platform Features"
              eyebrowIcon={Database}
              id="core-features-heading"
              title="Beyond Basic Chatbots: Agentic AI for Recovery"
              description="The AI Agent is given an objective—recover the payment—and uses NLP to understand intent, maintain context, and execute multi-step actions autonomously."
            />
            <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2">
              {coreFeatures.map((item) => (
                <div key={item.title} className="surface-card p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <IconBadge icon={item.icon} size="lg" className="shrink-0" />
                    <div>
                      <h4 className="text-base font-semibold text-text-primary mb-2">{item.title}</h4>
                      <p className="text-sm text-text-secondary mb-2">{item.description}</p>
                      <p className="text-xs text-text-muted leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Four Pillars */}
        <Section aria-labelledby="pillars-heading">
          <Container>
            <SectionHeader
              eyebrow="AI Agent Architecture"
              eyebrowIcon={Database}
              id="pillars-heading"
              title="The Four Pillars of Agentic AI"
              description="Built on four technical modules that ensure it functions as a digital employee, not a simple script."
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {fourPillars.map((item) => (
                <div key={item.title} className="surface-card surface-card-hover p-5">
                  <IconBadge icon={item.icon} className="mb-4" />
                  <h4 className="text-base font-semibold text-text-primary mb-2">{item.title}</h4>
                  <p className="text-sm text-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Comparison */}
        <Section tone="surface" aria-labelledby="comparison-heading">
          <Container size="narrow">
            <SectionHeader
              id="comparison-heading"
              title="Traditional Automation vs. Agentic AI"
              description="See how our AI Agent compares to traditional triggered systems and basic notification bots"
            />
            <div className="surface-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-sm sm:text-base">
                  <thead>
                    <tr className="bg-surface/80 border-b border-border/60">
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Feature</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-error">Traditional Automation</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-brand-primary">Agentic AI (Whats91)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row) => (
                      <tr key={row.feature} className="border-t border-border/40">
                        <td className="px-4 sm:px-6 py-4 font-medium text-text-primary">{row.feature}</td>
                        <td className="px-4 sm:px-6 py-4 text-text-secondary">{row.traditional}</td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className="flex items-center gap-2 text-brand-primary font-medium">
                            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                            {row.aiAgent}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </Section>

        {/* Recovery Phases */}
        <Section aria-labelledby="phases-heading">
          <Container>
            <SectionHeader
              eyebrow="Conversational Recovery Lifecycle"
              eyebrowIcon={MessageCircle}
              id="phases-heading"
              title="Multi-Stage Conversational Workflows"
              description="The agent follows lifecycle-specific logic that adapts to the age of the debt, maintaining a professional and brand-consistent tone."
            />
            <div className="space-y-4">
              {recoveryPhases.map((item) => (
                <div key={item.phase} className="surface-card surface-card-hover p-5 sm:p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    <div className="flex items-center gap-4 lg:w-48 shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary text-white font-bold text-lg">
                        {item.phase}
                      </div>
                      <div>
                        <h4 className="text-base font-semibold text-text-primary">{item.title}</h4>
                        <p className="text-xs text-brand-primary">{item.timing}</p>
                      </div>
                    </div>
                    <div className="flex-1 bg-surface/50 rounded-xl p-4">
                      <p className="text-sm text-text-secondary italic mb-2">&quot;{item.narrative}&quot;</p>
                      <p className="text-xs text-text-muted"><strong>Goal:</strong> {item.goal}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Industry Applications */}
        <Section tone="surface" aria-labelledby="industry-heading">
          <Container>
            <SectionHeader
              id="industry-heading"
              title="Industry-Specific AI Applications"
              description="The AI Agent adapts to the nuances of various Indian industry verticals by leveraging Busy's specialized features."
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {industryApplications.map((item) => (
                <div key={item.name} className="surface-card surface-card-hover p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <IconBadge icon={item.icon} />
                    <h4 className="text-base font-semibold text-text-primary">{item.name}</h4>
                  </div>
                  <p className="text-xs text-text-muted mb-2">
                    <span className="font-medium text-text-secondary">Busy Feature:</span> {item.busyFeature}
                  </p>
                  <p className="text-sm text-text-secondary mb-3">{item.aiAgentValue}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* ROI Metrics */}
        <Section aria-labelledby="roi-metrics">
          <Container size="narrow">
            <SectionHeader
              eyebrow="Performance Metrics"
              eyebrowIcon={TrendingUp}
              id="roi-metrics"
              title="Measurable Business Impact"
              description="Organizations employing intelligent automation report a median ROI of 150% within the first year."
            />
            <div className="surface-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] text-sm sm:text-base">
                  <thead>
                    <tr className="bg-surface/80 border-b border-border/60">
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Success Metric</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-error">Manual Recovery</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-brand-primary">AI Agent Recovery</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-success">Improvement</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roiMetrics.map((row) => (
                      <tr key={row.metric} className="border-t border-border/40">
                        <td className="px-4 sm:px-6 py-4 font-medium text-text-primary">{row.metric}</td>
                        <td className="px-4 sm:px-6 py-4 text-text-secondary">{row.manual}</td>
                        <td className="px-4 sm:px-6 py-4 text-brand-primary font-medium">{row.aiAgent}</td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className="inline-flex items-center rounded-full bg-success-soft px-2.5 py-1 text-xs font-medium text-success">
                            {row.improvement}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <p className="mt-6 text-center text-caption">
              For a mid-sized SME with <span className="font-medium text-text-primary">₹10 Crore turnover</span> and <span className="font-medium text-text-primary">300 monthly invoices</span>, net savings are estimated at <span className="font-medium text-text-primary">₹55,000/month</span> or <span className="font-medium text-text-primary">₹6.6 Lakhs annually</span>.
            </p>
          </Container>
        </Section>

        {/* API Modules */}
        <Section tone="surface" aria-labelledby="api-heading">
          <Container size="narrow">
            <SectionHeader
              eyebrow="Deep ERP Connectivity"
              eyebrowIcon={Database}
              id="api-heading"
              title="API Modules for Busy Integration"
              description="The Busy API allows the AI Agent to programmatically access and fetch critical data points."
            />
            <div className="surface-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-sm sm:text-base">
                  <thead>
                    <tr className="bg-surface/80 border-b border-border/60">
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">API Module</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Capability</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-brand-primary">Business Impact</th>
                    </tr>
                  </thead>
                  <tbody>
                    {apiModules.map((row) => (
                      <tr key={row.module} className="border-t border-border/40">
                        <td className="px-4 sm:px-6 py-4 font-medium text-text-primary">{row.module}</td>
                        <td className="px-4 sm:px-6 py-4 text-text-secondary">{row.capability}</td>
                        <td className="px-4 sm:px-6 py-4 text-brand-primary font-medium">{row.impact}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </Section>

        {/* Security & Compliance */}
        <Section aria-labelledby="security-heading">
          <Container>
            <SectionHeader
              eyebrow="Security & Compliance"
              eyebrowIcon={Shield}
              id="security-heading"
              title="Enterprise-Grade Protection"
              description='Built with "Privacy by Design" approach, fully compliant with the Digital Personal Data Protection (DPDP) Act of 2023.'
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10">
              {securityFeatures.map((item) => (
                <div key={item.title} className="surface-card surface-card-hover p-5 text-center">
                  <IconBadge icon={item.icon} className="mx-auto mb-4" />
                  <h4 className="text-sm font-semibold text-text-primary mb-1">{item.title}</h4>
                  <p className="text-xs text-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="surface-card p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                DPDP Act Compliance
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {complianceFeatures.map((item) => (
                  <div key={item.feature} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-text-primary">{item.feature}</p>
                      <p className="text-xs text-text-secondary">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* Industries */}
        <Section tone="surface" aria-labelledby="industries-heading">
          <Container>
            <SectionHeader id="industries-heading" title="Who This Is For" />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((item) => (
                <div key={item.name} className="surface-card surface-card-hover p-5">
                  <IconBadge icon={item.icon} className="mb-4" />
                  <h4 className="text-base font-semibold text-text-primary mb-1">{item.name}</h4>
                  <p className="text-body-sm">{item.description}</p>
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
        <Section tone="surface">
          <Container>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-primary via-brand-primary to-brand-accent p-7 sm:p-8 md:p-12 lg:p-16 shadow-xl">
              <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute -top-1/2 -right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="heading-2 !text-white mb-4">Transform Your Receivables into Revenue</h2>
                <p className="text-base sm:text-lg text-white/90 mb-8">
                  The AI Agent for Busy Accounting Software turns manual payment recovery into an autonomous, 24/7 competitive advantage. Book a demo to see it in action.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white text-brand-700 hover:bg-white/95 rounded-xl shadow-lg transition-colors"
                  >
                    Book a Demo
                  </a>
                  <ContactCard
                    variant="popup"
                    trigger={
                      <button className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl transition-colors">
                        Calculate Your ROI
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
