import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ContactCard } from "@/components/landing/ContactCard";
import { AnimatedChatbot } from "@/components/landing/AnimatedChatbot";
import { BookDemoPopup } from "@/components/landing/BookDemoPopup";
import {
  Container,
  Section,
  SectionHeader,
  Eyebrow,
  CTAGroup,
  SecondaryCTA,
  TrustPill,
  FeatureCard,
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
  MessageCircle,
  Send,
  Bot,
  FileText,
  Receipt,
  Truck,
  Download,
  Users,
  Shield,
  Building2,
  Factory,
  Truck as TruckIcon,
  Store,
  CheckCircle2,
  Clock,
  Zap,
  Lock,
  FileCheck,
} from "lucide-react";

const pagePath = "/solutions/busy-erp";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "Busy Accounting WhatsApp Integration | Whats91 Cloud API";
const seoDescription =
  "Turn Busy Accounting data into instant WhatsApp responses — automated invoice and receipt delivery plus a 24/7 ERP chatbot for balance, ledger, receipts, and bilty status.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "Busy Accounting WhatsApp Integration",
      "Busy ERP WhatsApp API",
      "Busy Software WhatsApp Automation",
      "WhatsApp Ledger Chatbot",
      "Busy Invoice WhatsApp",
      "Busy Outstanding Reminder WhatsApp",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

const chatbotMenu = [
  { icon: FileText, label: "Check Balance", description: "Instant outstanding balance", source: "Ledger data", format: "Text message" },
  { icon: FileText, label: "Bill-by-Bill Ledger", description: "Complete transaction history", source: "Account ledger", format: "Text + PDF" },
  { icon: Receipt, label: "Last Receipt", description: "Most recent payment receipt", source: "Receipt voucher", format: "PDF attachment" },
  { icon: Truck, label: "Bilty Status", description: "Transport document details", source: "Bilty records", format: "Text message" },
  { icon: Download, label: "Download Statement", description: "Period-wise statement", source: "Statement report", format: "PDF attachment" },
  { icon: Users, label: "Talk to Team", description: "Connect with accounts", source: "Human routing", format: "Chat transfer" },
];

const automationScenarios = [
  { title: "Auto-send Invoice/Receipt", description: "After every entry in Busy", icon: Receipt },
  { title: "Outstanding Reminders", description: "Daily or weekly schedules", icon: Clock },
  { title: "Ledger on Request", description: "Customer self-service 24/7", icon: FileText },
  { title: "Delivery/Bilty Updates", description: "Transport status alerts", icon: Truck },
  { title: "Overdue Notifications", description: "Internal team alerts", icon: Zap },
  { title: "Payment Confirmations", description: "Auto-send receipts", icon: CheckCircle2 },
];

const reportsSupported = [
  { category: "Reports", items: ["Outstanding / Balance Summary", "Bill-by-Bill Ledger", "Sales Summary", "Stock / Dispatch Reports"] },
  { category: "Vouchers", items: ["Sales Invoice", "Receipt", "Payment Voucher", "Credit/Debit Notes", "Bilty / Transport Docs"] },
];

const securityFeatures = [
  { icon: Lock, title: "Role-Based Access", desc: "Control who can request what data" },
  { icon: FileCheck, title: "Audit Logs", desc: "Track every request and response" },
  { icon: Shield, title: "Data Minimization", desc: "Send only what's required" },
  { icon: FileText, title: "Template Compliance", desc: "Opt-in required for outbound" },
];

const industries = [
  { icon: Building2, name: "Distributors & Wholesalers", description: "High-volume invoices & collections" },
  { icon: Factory, name: "Manufacturing", description: "Complex billing & dispatch tracking" },
  { icon: TruckIcon, name: "Logistics & Transport", description: "Bilty tracking & delivery updates" },
  { icon: Store, name: "Retail Chains", description: "Multi-location account management" },
];

const onboardingSteps = [
  { step: 1, title: "Connect WhatsApp Cloud API", description: "We help you set up your official WhatsApp Business account" },
  { step: 2, title: "Map Your Busy Data", description: "Configure which reports, vouchers, and data points to sync" },
  { step: 3, title: "Approve Chatbot Menu", description: "Review and customize the customer-facing menu options" },
  { step: 4, title: "Go Live", description: "Start automating and let customers self-serve instantly" },
];

const howItWorksSteps = [
  { step: 1, title: "Busy Generates Data", desc: "Reports, vouchers, ledgers, bilty created in Busy" },
  { step: 2, title: "Whats91 Picks It Up", desc: "Scheduled sync or real-time trigger" },
  { step: 3, title: "WhatsApp Sends Message", desc: "PDF + interactive buttons via Cloud API" },
  { step: 4, title: "Customer Gets Answers", desc: "Instant response, 24/7 self-service" },
];

const faqs = [
  { q: "Is this official WhatsApp Cloud API or WhatsApp Web automation?", a: "We use the official WhatsApp Business Platform (Cloud API) hosted by Meta. This ensures reliability, compliance, and access to the latest features like interactive messages and flows." },
  { q: "Can customers request ledger/balance anytime?", a: "Yes, 24/7. Customers simply send 'Hi' or any message to your WhatsApp Business number, and the chatbot presents action buttons for balance, ledger, receipts, and more." },
  { q: "Do you support bill-by-bill ledger?", a: "Absolutely. Customers can view their complete transaction history with each bill broken down—date, reference, debit, credit, and running balance—instantly on WhatsApp." },
  { q: "Can we send last receipt automatically after payment?", a: "Yes. When a receipt is entered in Busy, Whats91 can automatically send the receipt PDF to the customer's WhatsApp within seconds—no manual action needed." },
  { q: "Can you show bilty details only for relevant accounts?", a: "Yes. We configure the chatbot to show bilty/transport options only for accounts where bilty data exists, keeping the experience clean and relevant." },
  { q: "Can we add buttons and custom flows?", a: "Yes. WhatsApp Cloud API supports interactive messages with buttons. We can customize menu items, button labels, and flows based on your specific business needs." },
  { q: "How do templates work for outbound notifications?", a: "For proactive messages (reminders, invoices), we use approved WhatsApp message templates. Customers must opt-in, and we ensure all outbound messages comply with Meta's policies." },
  { q: "What data do you store?", a: "We follow data minimization principles. We store only essential mapping data and recent transaction references needed for quick responses. Full accounting data remains in your Busy installation." },
  { q: "Can we route chats to a human accounts team?", a: "Yes. The 'Talk to Team' button routes complex queries to your designated team members via the WhatsApp Business API inbox or your existing CRM." },
];

const schemaData = [
  generateServiceSchema({
    name: "Busy Accounting WhatsApp Integration",
    description: seoDescription,
    url: pageUrl,
  }),
  generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/#solutions" },
    { name: "Busy ERP Integration", url: pagePath },
  ]),
];

export default function BusyERPIntegrationPage() {
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
                <Eyebrow icon={MessageCircle} className="mb-5">
                  Busy Accounting Integration
                </Eyebrow>

                <h1 className="heading-1 mb-5">
                  Turn Busy data into instant WhatsApp responses
                </h1>

                <p className="text-lead measure-prose mx-auto lg:mx-0 mb-6">
                  Automate report &amp; voucher delivery from Busy and offer a 24/7
                  ERP chatbot for balance, bill-by-bill ledger, receipts, and bilty status.
                </p>

                <CTAGroup align="responsive-hero" className="mb-8">
                  <BookDemoPopup
                    triggerLabel="Schedule a Demo"
                    triggerSize="lg"
                    source="busy-erp-hero"
                    triggerClassName="h-12 px-7 text-base rounded-xl"
                  />
                  <SecondaryCTA href="/contact">Request Integration</SecondaryCTA>
                </CTAGroup>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
                  <TrustPill>Official WhatsApp Cloud API</TrustPill>
                  <TrustPill>Secure, Permission-based</TrustPill>
                  <TrustPill>Quick Onboarding</TrustPill>
                </div>
              </div>

              <div className="min-w-0">
                <AnimatedChatbot />
              </div>
            </div>
          </Container>
        </Section>

        {/* What you get - two pillars */}
        <Section tone="surface" aria-labelledby="pillars-heading">
          <Container>
            <SectionHeader
              id="pillars-heading"
              title="What you get with Whats91 + Busy"
              description="Two powerful capabilities that transform how you interact with customers"
            />
            <div className="grid gap-6 md:grid-cols-2">
              <div className="surface-card p-6 sm:p-8">
                <IconBadge icon={Send} size="lg" className="mb-5" />
                <h3 className="heading-3 mb-4">Automated Busy Outputs on WhatsApp</h3>
                <ul className="space-y-3 mb-5">
                  {[
                    "Auto-send invoices, receipts & reports",
                    "Faster collections with instant delivery",
                    "PDF attachments for all documents",
                    "Reduce manual follow-ups by 80%",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base text-text-secondary">
                      <CheckCircle2 className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-caption italic">
                  WhatsApp has 98% open rates vs 42% for email—your customers will see every message.
                </p>
              </div>

              <div className="surface-card p-6 sm:p-8">
                <IconBadge icon={Bot} size="lg" className="mb-5" />
                <h3 className="heading-3 mb-4">24/7 ERP Chatbot with Buttons</h3>
                <ul className="space-y-3 mb-5">
                  {[
                    "Customer sends 'Hi' → gets action menu",
                    "Self-serve balance, ledger, receipts",
                    "Works 24/7, no human needed",
                    "Reduce support calls by 50%",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm sm:text-base text-text-secondary">
                      <CheckCircle2 className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-caption italic">
                  WhatsApp interactive messages &amp; flows enable guided, button-based experiences.
                </p>
              </div>
            </div>
          </Container>
        </Section>

        {/* Chatbot menu / use cases */}
        <Section id="use-cases" className="scroll-mt-24" aria-labelledby="use-cases-heading">
          <Container>
            <SectionHeader
              eyebrow="Chatbot Menu"
              eyebrowIcon={MessageCircle}
              id="use-cases-heading"
              title="Every action your customers can take"
              description="A simple 'Hi' triggers this menu. Customers tap a button and get instant answers."
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {chatbotMenu.map((item) => (
                <FeatureCard key={item.label} icon={item.icon} title={item.label} description={item.description}>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="px-2 py-1 rounded-md bg-surface text-caption">Source: {item.source}</span>
                    <span className="px-2 py-1 rounded-md bg-brand-primary/5 text-xs text-brand-primary font-medium">
                      {item.format}
                    </span>
                  </div>
                </FeatureCard>
              ))}
            </div>
          </Container>
        </Section>

        {/* How it works */}
        <Section tone="surface" aria-labelledby="how-heading">
          <Container>
            <SectionHeader
              id="how-heading"
              title="How the integration works"
              description="A simple 4-step process from Busy data to WhatsApp response"
            />
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-10">
              {howItWorksSteps.map((item) => (
                <div key={item.step} className="surface-card p-5 h-full">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white text-sm font-bold mb-4 shadow-md shadow-brand-primary/20">
                    {item.step}
                  </div>
                  <h4 className="heading-4 mb-2">{item.title}</h4>
                  <p className="text-body-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="rounded-xl border border-brand-primary/20 bg-brand-primary/[0.03] p-4 max-w-2xl mx-auto">
              <p className="text-sm text-text-secondary text-center">
                <span className="font-medium text-text-primary">Technical Note:</span> We use WhatsApp
                Business Platform capabilities like interactive messages and flows for guided customer actions.
              </p>
            </div>
          </Container>
        </Section>

        {/* Automation scenarios */}
        <Section aria-labelledby="automations-heading">
          <Container>
            <SectionHeader
              id="automations-heading"
              title="Common automations customers ask for"
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
              {automationScenarios.map((item) => (
                <div key={item.title} className="surface-card surface-card-hover flex items-center gap-4 p-4 sm:p-5">
                  <IconBadge icon={item.icon} className="shrink-0" />
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold text-text-primary">{item.title}</h4>
                    <p className="text-body-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="surface-card bg-surface/50 p-5 sm:p-6 max-w-3xl mx-auto">
              <p className="text-sm sm:text-base text-text-secondary text-center">
                <span className="font-semibold text-text-primary">Important:</span> BUSY&apos;s built-in
                WhatsApp sending is manual—users must click to send each message. Whats91 adds{" "}
                <span className="text-brand-primary font-medium">true automation</span> with Cloud API + 24/7
                chatbot capabilities.
              </p>
            </div>
          </Container>
        </Section>

        {/* Reports & vouchers */}
        <Section tone="surface" aria-labelledby="reports-heading">
          <Container>
            <SectionHeader id="reports-heading" title="Reports &amp; Vouchers Supported" />
            <div className="grid gap-6 md:grid-cols-2">
              {reportsSupported.map((category) => (
                <div key={category.category} className="surface-card p-6">
                  <h3 className="heading-4 mb-4 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-brand-primary" aria-hidden="true" />
                    {category.category}
                  </h3>
                  <ul className="space-y-2.5">
                    {category.items.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 text-sm sm:text-base text-text-secondary">
                        <CheckCircle2 className="h-4 w-4 text-brand-primary shrink-0" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
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
              {securityFeatures.map((item) => (
                <div key={item.title} className="surface-card surface-card-hover p-5 text-center">
                  <IconBadge icon={item.icon} className="mx-auto mb-4" />
                  <h4 className="text-sm font-semibold text-text-primary mb-1">{item.title}</h4>
                  <p className="text-caption">{item.desc}</p>
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
                <FeatureCard key={item.name} icon={item.icon} title={item.name} description={item.description} />
              ))}
            </div>
          </Container>
        </Section>

        {/* Onboarding */}
        <Section aria-labelledby="onboarding-heading">
          <Container size="narrow">
            <SectionHeader id="onboarding-heading" title="Quick setup, fast results" />
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

            <div className="mt-8 text-center">
              <p className="text-sm text-text-muted mb-2">
                Typical timeline: <span className="font-medium text-text-primary">3-5 business days</span> from signup to go-live
              </p>
              <p className="text-caption">
                Requirements: Busy software access, data export capability, WhatsApp Business number
              </p>
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section tone="surface" aria-labelledby="faq-heading">
          <Container size="narrow">
            <SectionHeader id="faq-heading" title="Frequently Asked Questions" />
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.q}
                  value={`faq-${index}`}
                  className="surface-card px-4 sm:px-5 border-b-0"
                >
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
                <h2 className="heading-2 !text-white mb-4">
                  See Busy + WhatsApp automation in action
                </h2>
                <p className="text-base sm:text-lg text-white/90 mb-8">
                  Get a personalized demo of how Whats91 can automate your Busy workflows.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <BookDemoPopup
                    triggerLabel="Schedule a Demo"
                    triggerSize="lg"
                    source="busy-erp-final-cta"
                    triggerClassName="h-12 px-7 text-base rounded-xl !bg-white !text-brand-700 hover:!bg-white/95"
                    showIcon={false}
                  />
                  <ContactCard
                    variant="popup"
                    trigger={
                      <button className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl transition-colors">
                        Talk to Integration Team
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
