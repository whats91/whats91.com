import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ContactCard } from "@/components/landing/ContactCard";
import { GoogleSheetAnimation } from "@/components/landing/GoogleSheetAnimation";
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
  Database,
  Server,
  Building2,
  Factory,
  Truck as TruckIcon,
  Store,
  CheckCircle2,
  Shield,
  Lock,
  FileCheck,
  FileText,
  Code2,
  Layers,
  AlertTriangle,
  BarChart3,
  Users,
  TrendingUp,
  Settings,
} from "lucide-react";

const pagePath = "/solutions/busy-google-sheet";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "Busy ERP to Google Sheets Integration | Whats91 Cloud API";
const seoDescription =
  "Turn Busy ERP data into live Google Sheets with zero API limits. Custom SQL queries, reverse-flow architecture, and 99.99% uptime — no more 429 errors.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "Busy ERP Google Sheets Integration",
      "Busy to Google Sheets API",
      "Google Sheets 429 Error Fix",
      "Busy Accounting Custom SQL Export",
      "Busy ERP Data Automation",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

const features = [
  { icon: Code2, title: "Custom SQL Generation", description: "Build advanced logic to pull ledger data, outstanding reports, or stock movement.", detail: "No rigid, predefined reports—extract exactly what you need." },
  { icon: Settings, title: "Granular Filtering", description: "Filter dynamically by customer, date range, voucher type, or specific business rules.", detail: "Complete control over your data extraction logic." },
  { icon: Shield, title: "Secure & Isolated", description: "Data runs through a dedicated API endpoint with token-based access.", detail: "Your Busy data stays protected with role-based query restrictions." },
];

const comparisonData = [
  { feature: "Data Movement", traditional: "Pushes to Google (Unstable)", whats91: "Sheet pulls from Server (Stable)" },
  { feature: "Google API Limits", traditional: "Fails when quotas are reached", whats91: "Bypasses push limit entirely" },
  { feature: "Data Structure", traditional: "Fixed, predefined columns", whats91: "100% custom SQL queries" },
  { feature: "Uptime & Reliability", traditional: "Breaks on high-frequency syncing", whats91: "99.99% Uptime Infrastructure" },
  { feature: "Multi-Company Logic", traditional: "Data often gets mixed", whats91: "Strict company & financial year isolation" },
];

const useCases = [
  { icon: BarChart3, title: "Live Sales Dashboards", description: "Track revenue and targets in real-time" },
  { icon: FileText, title: "Automated Outstanding Reports", description: "Keep credit and collection teams updated instantly" },
  { icon: Users, title: "Customer Performance Sheets", description: "Evaluate buyer behavior and purchasing trends" },
  { icon: TrendingUp, title: "Custom MIS & Management Reporting", description: "Combine multi-company data into a single executive view" },
];

const industries = [
  { icon: Building2, name: "Distributors & Wholesalers", description: "High-volume data sync needs" },
  { icon: Factory, name: "Manufacturing", description: "Complex production & stock tracking" },
  { icon: TruckIcon, name: "Logistics & Transport", description: "Real-time dispatch monitoring" },
  { icon: Store, name: "Retail Chains", description: "Multi-location data consolidation" },
];

const faqs = [
  { q: "How does this system bypass Google Sheets API limits?", a: "Traditional tools trigger a '429: Too many requests' error because they aggressively push data to Google. Our system operates in reverse. The API server processes the Busy data, and the Google Sheet simply fetches the clean, validated JSON response, eliminating write-quota failures." },
  { q: "Can I connect multiple companies from Busy ERP?", a: "Yes. Each business and company can have a custom data structure, separate API endpoint, and company-wise filtering to ensure strict data isolation. Your multi-company data never gets mixed." },
  { q: "Is this a plug-and-play tool or a custom setup?", a: "This is a fully custom, enterprise-level solution built specifically for your requirements. We configure the custom query logic, generate the API endpoint, and install the Google Sheet Add-on for you. No manual work is required on your end." },
  { q: "What data can I sync from Busy to Google Sheets?", a: "Any data that exists in your Busy ERP—ledgers, outstanding reports, stock movement, sales summaries, customer data, voucher details, and more. Since we use custom SQL queries, you have complete flexibility." },
  { q: "How often does the data refresh in Google Sheets?", a: "The Google Sheet Add-on pulls fresh data on demand or on a schedule you define. Because it's a pull-based system, you control when and how often data updates—without hitting API limits." },
  { q: "Do I need to keep my computer running for this to work?", a: "No. This is a fully cloud-based solution. Our API server processes your Busy data, and your Google Sheet connects to it directly. No local software or always-on computer required." },
  { q: "Is my Busy data secure?", a: "Yes. Data runs through a dedicated API endpoint with token-based access and role-based query restrictions. Your Busy data remains protected, and only authorized requests receive responses." },
  { q: "Can I customize the data structure in Google Sheets?", a: "Absolutely. Since we use custom SQL queries, you define exactly which columns, fields, and data points appear in your sheet. No fixed, predefined report formats." },
];

const onboardingSteps = [
  { step: 1, title: "Analyze Your Data Needs", description: "We identify which Busy data you need in Google Sheets" },
  { step: 2, title: "Build Custom API Endpoint", description: "Create dedicated queries and data structure for your use case" },
  { step: 3, title: "Install Google Sheet Add-on", description: "Deploy the custom Apps Script to your Google Sheet" },
  { step: 4, title: "Go Live & Automate", description: "Start syncing data without API limit errors" },
];

const schemaData = [
  generateServiceSchema({
    name: "Busy ERP to Google Sheets Data Engine",
    description: seoDescription,
    url: pageUrl,
  }),
  generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/#solutions" },
    { name: "Busy Google Sheets", url: pagePath },
  ]),
];

export default function BusyGoogleSheetPage() {
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
                <Eyebrow icon={Database} className="mb-5">Busy to Google Sheets API Engine</Eyebrow>
                <h1 className="heading-1 mb-5">Turn Busy ERP Data into Live Google Sheets. Zero API Limits.</h1>
                <p className="text-lead measure-prose mx-auto lg:mx-0 mb-4">
                  <strong className="text-text-primary">Fully Custom Automation | API-Based Reverse Data Flow | 99.99% Uptime</strong>
                </p>
                <p className="text-body measure-prose mx-auto lg:mx-0 mb-6">
                  Stop dealing with broken exports, Google API quotas, and{" "}
                  <span className="font-mono text-xs bg-error-soft text-error px-1.5 py-0.5 rounded">429: Too many requests</span>{" "}
                  errors. Whats91 provides a structured, server-driven data engine that seamlessly connects Busy Accounting Software to Google Sheets.
                </p>

                <CTAGroup align="responsive-hero" className="mb-8">
                  <PrimaryCTA href="/contact">Schedule a Technical Demo</PrimaryCTA>
                  <ContactCard
                    variant="popup"
                    trigger={
                      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl h-11 sm:h-12 px-6 sm:px-7 text-sm sm:text-base font-semibold border border-border/80 bg-background text-text-primary hover:bg-surface hover:border-border transition-all duration-200 w-full sm:w-auto">
                        Request Custom Setup
                      </button>
                    }
                  />
                </CTAGroup>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
                  <TrustPill>Bypasses API Limits</TrustPill>
                  <TrustPill>Custom SQL Queries</TrustPill>
                  <TrustPill>99.99% Uptime</TrustPill>
                </div>
              </div>

              <GoogleSheetAnimation />
            </div>
          </Container>
        </Section>

        {/* AI Answer Target */}
        <Section tone="surface" bordered>
          <Container size="reading">
            <div className="text-center">
              <h2 className="heading-3 mb-4">The Reverse Flow Architecture: Smart & Stable</h2>
              <p className="text-lead">
                Most basic integrations push data directly from Busy to Google Sheets. The moment you hit Google&apos;s write quota (60 requests per minute), the system breaks. <strong className="text-text-primary">We engineered a completely different approach.</strong> Your Busy ERP data is processed securely on our API server. A custom Google Sheet Add-on then <strong className="text-brand-primary">pulls</strong> the structured data on demand—bypassing Google&apos;s push limits entirely.
              </p>
            </div>
          </Container>
        </Section>

        {/* Comparison */}
        <Section aria-labelledby="comparison-heading">
          <Container size="narrow">
            <SectionHeader
              id="comparison-heading"
              title="Why Enterprise Users Choose the Whats91 Method"
              description="See how our reverse API flow compares to traditional push-based integrations"
            />
            <div className="surface-card overflow-hidden mb-8">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-sm sm:text-base">
                  <thead>
                    <tr className="bg-surface/80 border-b border-border/60">
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Feature</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-error">Traditional Integrations</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-brand-primary">Whats91 Reverse API Flow</th>
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
                            {row.whats91}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-xl border border-warning-border bg-warning-soft p-5 max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-warning shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-text-primary mb-1">Google Sheets API Limit</p>
                  <p className="text-sm text-text-secondary">
                    Google&apos;s API has a strict <span className="font-mono bg-warning/10 px-1 rounded">60 requests/minute</span> quota. Traditional push-based integrations hit this limit and fail. Our reverse flow architecture bypasses this entirely.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Feature Grid */}
        <Section tone="surface" aria-labelledby="engine-heading">
          <Container>
            <SectionHeader
              eyebrow="Data Engine"
              eyebrowIcon={Layers}
              id="engine-heading"
              title="Fully Custom Query System"
              description="You are not restricted to rigid, predefined reports. Extract the exact data you need, structured exactly how you want it."
            />
            <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-3">
              {features.map((item) => (
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

        {/* Use Cases */}
        <Section aria-labelledby="usecases-heading">
          <Container>
            <SectionHeader
              id="usecases-heading"
              title="What Can You Build With Live Busy Data?"
              description="With a reliable data flow, businesses can automate their entire reporting workflow without manual Excel exports"
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {useCases.map((item) => (
                <div key={item.title} className="surface-card surface-card-hover p-5">
                  <IconBadge icon={item.icon} className="mb-4" />
                  <h4 className="text-base font-semibold text-text-primary mb-1">{item.title}</h4>
                  <p className="text-body-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Security */}
        <Section tone="surface" aria-labelledby="security-heading">
          <Container>
            <SectionHeader
              eyebrow="Security & Compliance"
              eyebrowIcon={Shield}
              id="security-heading"
              title="Enterprise-grade data security"
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: Lock, title: "Token-Based Access", desc: "Secure API authentication" },
                { icon: FileCheck, title: "Role-Based Queries", desc: "Restrict what can be fetched" },
                { icon: Shield, title: "Data Isolation", desc: "Company-wise separation" },
                { icon: Server, title: "Dedicated Endpoints", desc: "Your own API URL" },
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
        <Section aria-labelledby="industries-heading">
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
        <Section tone="surface" aria-labelledby="setup-heading">
          <Container size="narrow">
            <SectionHeader id="setup-heading" title="We handle everything for you" />
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
              Typical timeline: <span className="font-medium text-text-primary">5-7 business days</span> from signup to live data
            </p>
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
                <h2 className="heading-2 !text-white mb-4">Connect Busy Software to Google Sheets the Smart Way</h2>
                <p className="text-base sm:text-lg text-white/90 mb-8">
                  Stop exporting manually. Stop worrying about automation failures. Upgrade to a stable, custom-built API data engine today.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white text-brand-700 hover:bg-white/95 rounded-xl shadow-lg transition-colors"
                  >
                    Schedule a Demo
                  </a>
                  <ContactCard
                    variant="popup"
                    trigger={
                      <button className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl transition-colors">
                        Request Custom Setup
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
