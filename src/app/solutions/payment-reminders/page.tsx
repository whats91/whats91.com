import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ContactCard } from "@/components/landing/ContactCard";
import { AnimatedPaymentReminder } from "@/components/landing/AnimatedPaymentReminder";
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
import { JsonLd } from "@/lib/seo/JsonLd";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  generateServiceSchema,
  siteConfig,
} from "@/lib/seo/config";
import {
  ChevronRight,
  Bell,
  Users,
  CreditCard,
  Timer,
  Building2,
  Factory,
  Truck as TruckIcon,
  Store,
  CheckCircle2,
  Zap,
  Shield,
  Lock,
  FileCheck,
  FileText,
  Calendar,
  Layers,
} from "lucide-react";

const pagePath = "/solutions/payment-reminders";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "WhatsApp Payment Reminders for Busy ERP | Whats91 Cloud API";
const seoDescription =
  "India's most advanced WhatsApp payment reminder system for Busy ERP — rule-based credit limit validation, invoice aging logic, and company-wise segmentation.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "WhatsApp Payment Reminders",
      "Busy ERP Collections Automation",
      "Automated Outstanding Reminders",
      "WhatsApp Credit Limit Validation",
      "Busy Accounting Payment Follow-up",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

const logicFilters = [
  { icon: Users, title: "Customer-Specific Logic", description: "Individual rules for individual clients", detail: "Each customer gets evaluated against their unique terms, not a one-size-fits-all blast." },
  { icon: CreditCard, title: "Credit Limits & Periods", description: "Enforce your exact financial agreements", detail: "System validates credit limits before sending any reminder." },
  { icon: Timer, title: "Amount & Date Aging", description: "Target only specific outstanding thresholds", detail: "Filter by minimum amount, days overdue, or custom criteria." },
  { icon: Building2, title: "Company-Wise Segmentation", description: "Keep multi-company data strictly isolated", detail: "Distinct rules, schedules, and templates per company." },
];

const executionModes = [
  {
    title: "Normal Mode",
    subtitle: "Scheduled, Structured Outreach",
    icon: Calendar,
    features: [
      "Granular Scheduling: Set daily, weekly, or monthly cadences",
      "Smart Inclusion/Exclusion: Filter by outstanding amounts or exclude VIP clients",
      "Multi-Tier Routing: Distinct templates for different customer categories",
    ],
  },
  {
    title: "Advanced Mode",
    subtitle: "Customer-Specific Intelligence",
    icon: Zap,
    features: [
      "Credit Limit Validation: No reminders until outstanding crosses credit limit",
      "Invoice Aging Logic: Reminders trigger only after credit period ends",
      "Smart Condition Engine: Multiple rules evaluated per customer",
    ],
  },
];

const validationSteps = [
  { step: 1, title: "Analyze Busy Data", desc: "Real-time sync with accounting data" },
  { step: 2, title: "Evaluate Thresholds", desc: "Outstanding vs configured limits" },
  { step: 3, title: "Validate Credit Terms", desc: "Customer-level periods & limits" },
  { step: 4, title: "Apply Segmentation", desc: "Group-wise inclusion rules" },
  { step: 5, title: "Dispatch Alert", desc: "Only eligible customers receive WhatsApp" },
];

const templateExamples = [
  { day: "Day 1", tone: "Polite Reminder", toneClass: "bg-brand-primary/10 text-brand-primary" },
  { day: "Day 15", tone: "Follow-up", toneClass: "bg-warning-soft text-warning" },
  { day: "Day 30", tone: "Urgent Notice", toneClass: "bg-warning-soft text-warning" },
  { day: "Day 45", tone: "Final Notice", toneClass: "bg-error-soft text-error" },
];

const industries = [
  { icon: Building2, name: "Distributors & Wholesalers", description: "High-volume invoices & collections" },
  { icon: Factory, name: "Manufacturing", description: "Complex billing & dispatch tracking" },
  { icon: TruckIcon, name: "Logistics & Transport", description: "Bilty tracking & delivery updates" },
  { icon: Store, name: "Retail Chains", description: "Multi-location account management" },
];

const faqs = [
  { q: "Who is this system built for?", a: "The Whats91 Payment Reminder system is engineered specifically for distributors, wholesalers, manufacturers, transport businesses, and multi-company operations utilizing Busy ERP who want to automate their collections process with intelligent, rule-based WhatsApp reminders." },
  { q: "How is this different from bulk WhatsApp messaging?", a: "This is NOT bulk messaging. Our system evaluates each customer against their specific credit limits, invoice aging, and company segmentation before sending any reminder. It's a controlled financial workflow, not a blast tool." },
  { q: "Can I run the system immediately instead of waiting for a schedule?", a: "Yes. You can run reminders on a fully automated schedule (daily, weekly, monthly), or trigger immediate, on-demand executions for specific customer sets through the dashboard." },
  { q: "Is it safe to connect with my Busy ERP data?", a: "Yes. The system operates on secure, role-based access with controlled execution. Full logic validation occurs before any data or message is dispatched. We follow data minimization principles." },
  { q: "What happens if a customer has a credit limit?", a: "The system remains silent until their outstanding amount explicitly crosses their credit limit. No unnecessary friction with customers who are within their agreed terms." },
  { q: "Can I customize message templates?", a: "Yes. Map dynamic placeholders (Customer Name, Amount, Bill No., Due Date) into custom templates. Set different tones for different stages—polite reminders for Day 1, strong notices for Day 45." },
  { q: "How does company-wise data isolation work?", a: "If you manage multiple companies within Busy ERP, Whats91 keeps them strictly separated. Distinct reminder rules, schedules, and message templates for every individual company. Zero data mixing." },
  { q: "Do customers need to opt-in for WhatsApp reminders?", a: "Yes. For proactive outbound messages, customers must opt-in. We ensure all messages comply with WhatsApp Business Platform policies using approved message templates." },
];

const onboardingSteps = [
  { step: 1, title: "Connect WhatsApp Cloud API", description: "Set up your official WhatsApp Business account" },
  { step: 2, title: "Configure Reminder Rules", description: "Define credit limits, aging thresholds, and customer groups" },
  { step: 3, title: "Approve Message Templates", description: "Review and customize tone for each reminder stage" },
  { step: 4, title: "Go Live & Automate", description: "Start intelligent collections on autopilot" },
];

const schemaData = [
  generateServiceSchema({
    name: "WhatsApp Payment Reminders for Busy ERP",
    description: seoDescription,
    url: pageUrl,
  }),
  generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/#solutions" },
    { name: "Payment Reminders", url: pagePath },
  ]),
];

export default function PaymentRemindersPage() {
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
                <Eyebrow icon={Bell} className="mb-5">Intelligent Payment Reminders</Eyebrow>
                <h1 className="heading-1 mb-5">India&apos;s Most Advanced WhatsApp Payment Reminder System for Busy ERP</h1>
                <p className="text-lead measure-prose mx-auto lg:mx-0 mb-6">
                  <strong className="text-text-primary">Stop chasing payments manually.</strong> Control your collections intelligently with rule-based WhatsApp reminders.
                </p>

                <CTAGroup align="responsive-hero" className="mb-8">
                  <PrimaryCTA href="/contact">Schedule a System Demo</PrimaryCTA>
                  <ContactCard
                    variant="popup"
                    trigger={
                      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl h-11 sm:h-12 px-6 sm:px-7 text-sm sm:text-base font-semibold border border-border/80 bg-background text-text-primary hover:bg-surface hover:border-border transition-all duration-200 w-full sm:w-auto">
                        Request Setup Consultation
                      </button>
                    }
                  />
                </CTAGroup>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
                  <TrustPill>Rule-Based Logic</TrustPill>
                  <TrustPill>Credit Limit Validation</TrustPill>
                  <TrustPill>Company-Wise Isolation</TrustPill>
                </div>
              </div>

              <AnimatedPaymentReminder />
            </div>
          </Container>
        </Section>

        {/* AI Answer Target */}
        <Section tone="surface" bordered>
          <Container size="reading">
            <div className="text-center">
              <h2 className="heading-3 mb-4">What is the Whats91 Payment Reminder System?</h2>
              <p className="text-lead">
                Whats91 provides an <strong className="text-text-primary">advanced, filter-driven integration</strong> for Busy Accounting Software that automates WhatsApp payment reminders based on customer-specific logic. Unlike standard automation tools, the Whats91 system evaluates <strong className="text-text-primary">credit limits, invoice aging, and company-wise segmentation</strong> before triggering any communication—ensuring completely structured and professional collection strategies.
              </p>
            </div>
          </Container>
        </Section>

        {/* Logic Filters */}
        <Section aria-labelledby="logic-heading">
          <Container>
            <SectionHeader
              eyebrow="Logic Engine"
              eyebrowIcon={Layers}
              id="logic-heading"
              title="Why Our System is Different: Intelligence Over Automation"
              description="Most reminder tools send the same generic message to your entire ledger. We don't. This is not basic messaging—this is a controlled financial workflow."
            />
            <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {logicFilters.map((item) => (
                <div key={item.title} className="surface-card p-5 sm:p-6">
                  <IconBadge icon={item.icon} size="lg" className="mb-5" />
                  <h4 className="text-base font-semibold text-text-primary mb-2">{item.title}</h4>
                  <p className="text-sm text-text-secondary mb-2">{item.description}</p>
                  <p className="text-xs text-text-muted leading-relaxed">{item.detail}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Execution Modes */}
        <Section tone="surface" aria-labelledby="modes-heading">
          <Container>
            <SectionHeader
              id="modes-heading"
              title="Two Powerful Execution Modes"
              description="Choose between scheduled outreach or customer-specific intelligence based on your business needs"
            />
            <div className="grid gap-6 md:grid-cols-2 mb-10">
              {executionModes.map((mode) => (
                <div key={mode.title} className="surface-card p-6 sm:p-8">
                  <IconBadge icon={mode.icon} size="lg" className="mb-5" />
                  <h3 className="heading-3 mb-2">{mode.title}</h3>
                  <p className="text-caption mb-5">{mode.subtitle}</p>
                  <ul className="space-y-3">
                    {mode.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm sm:text-base text-text-secondary">
                        <CheckCircle2 className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="surface-card border-brand-primary/20 bg-brand-primary/[0.03] p-5 sm:p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                Advanced Mode: Real-World Examples
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl surface-card">
                  <p className="text-sm font-semibold text-text-primary mb-2">Example A: Credit Limit Validation</p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    If a client has a <strong className="text-text-primary">₹1,00,000 credit limit</strong>, the system remains silent until their outstanding amount crosses that limit. <span className="text-brand-primary font-medium">No unnecessary friction.</span>
                  </p>
                </div>
                <div className="p-4 rounded-xl surface-card">
                  <p className="text-sm font-semibold text-text-primary mb-2">Example B: Invoice Aging Logic</p>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    If a customer has a <strong className="text-text-primary">strict 15-day credit period</strong>, zero reminders are sent until the invoice age hits day 16. <span className="text-brand-primary font-medium">Clients hear from you only when terms are breached.</span>
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Technical Capabilities */}
        <Section aria-labelledby="capabilities-heading">
          <Container>
            <SectionHeader id="capabilities-heading" title="Complete Control Over Financial Communication" />
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="surface-card p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <IconBadge icon={Building2} size="lg" />
                  <h3 className="text-xl font-semibold text-text-primary">Company-Wise Data Isolation</h3>
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  If you manage multiple companies within Busy ERP, Whats91 keeps them strictly separated.
                </p>
                <ul className="space-y-2.5">
                  {[
                    "Distinct reminder rules per company",
                    "Separate schedules for each business unit",
                    "Unique message templates per entity",
                    "Zero data mixing between companies",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-text-secondary">
                      <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="surface-card p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <IconBadge icon={FileText} size="lg" />
                  <h3 className="text-xl font-semibold text-text-primary">Custom Template Mapping</h3>
                </div>
                <p className="text-sm text-text-secondary mb-4">
                  Control your tone with dynamic placeholders:{" "}
                  <span className="font-mono text-xs bg-surface px-1.5 py-0.5 rounded">{"{Name}"}</span>,{" "}
                  <span className="font-mono text-xs bg-surface px-1.5 py-0.5 rounded">{"{Amount}"}</span>,{" "}
                  <span className="font-mono text-xs bg-surface px-1.5 py-0.5 rounded">{"{BillNo}"}</span>,{" "}
                  <span className="font-mono text-xs bg-surface px-1.5 py-0.5 rounded">{"{DueDate}"}</span>
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {templateExamples.map((template) => (
                    <div key={template.day} className="flex items-center gap-2 p-2 rounded-lg bg-surface/50">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${template.toneClass}`}>{template.day}</span>
                      <span className="text-xs text-text-muted">{template.tone}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Validation Sequence */}
        <Section tone="surface" aria-labelledby="validation-heading">
          <Container>
            <SectionHeader
              id="validation-heading"
              title="System Validation Sequence"
              description="Every message must pass strict validation before dispatch"
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
              {validationSteps.map((item, i) => (
                <div key={item.step} className="relative">
                  <div className="surface-card p-5 h-full text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white text-lg font-bold mb-4 shadow-md shadow-brand-primary/20 mx-auto">
                      {item.step}
                    </div>
                    <h4 className="text-base font-semibold text-text-primary mb-2">{item.title}</h4>
                    <p className="text-sm text-text-secondary">{item.desc}</p>
                  </div>
                  {i < validationSteps.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute top-1/2 -right-2.5 h-5 w-5 text-brand-primary -translate-y-1/2" aria-hidden="true" />
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-xl border border-brand-primary/20 bg-brand-primary/[0.03] p-4 max-w-2xl mx-auto">
              <p className="text-sm text-text-secondary text-center">
                <strong className="text-text-primary">Result:</strong> Only mathematically eligible customers receive an automated WhatsApp alert
              </p>
            </div>
          </Container>
        </Section>

        {/* Security */}
        <Section aria-labelledby="security-heading">
          <Container>
            <SectionHeader
              eyebrow="Security & Compliance"
              eyebrowIcon={Shield}
              id="security-heading"
              title="Built for accounting-grade security"
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Lock, title: "Role-Based Access", desc: "Control who can send reminders" },
                { icon: FileCheck, title: "Audit Logs", desc: "Track every message dispatched" },
                { icon: Shield, title: "Data Minimization", desc: "Send only what's required" },
                { icon: FileText, title: "Template Compliance", desc: "Opt-in required for outbound" },
              ].map((item) => (
                <div key={item.title} className="surface-card surface-card-hover p-5 text-center">
                  <IconBadge icon={item.icon} className="mx-auto mb-4" />
                  <h4 className="text-sm font-semibold text-text-primary mb-1">{item.title}</h4>
                  <p className="text-xs text-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Industries */}
        <Section tone="surface" aria-labelledby="industries-heading">
          <Container>
            <SectionHeader id="industries-heading" title="Who this is for" />
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

        {/* Setup */}
        <Section aria-labelledby="setup-heading">
          <Container size="narrow">
            <SectionHeader id="setup-heading" title="Quick setup, fast results" />
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
            <p className="mt-8 text-center text-caption">
              Typical timeline: <span className="font-medium text-text-primary">3-5 business days</span> from signup to go-live
            </p>
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
                <h2 className="heading-2 !text-white mb-4">Automate Your Busy ERP Collections Today</h2>
                <p className="text-base sm:text-lg text-white/90 mb-8">
                  Stop letting outstanding payments drain your operational time. Let Whats91 upgrade your workflow with intelligent, automated follow-ups.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white text-brand-700 hover:bg-white/95 rounded-xl shadow-lg transition-colors"
                  >
                    Schedule a Technical Demo
                  </a>
                  <ContactCard
                    variant="popup"
                    trigger={
                      <button className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl transition-colors">
                        Request Setup Consultation
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
