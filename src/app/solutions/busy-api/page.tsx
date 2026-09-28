import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ContactCard } from "@/components/landing/ContactCard";
import { AnimatedAPIArchitecture } from "@/components/landing/AnimatedAPIArchitecture";
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
  Server,
  Code2,
  FileJson,
  FileText,
  FileCode,
  Building2,
  CheckCircle2,
  Shield,
  Lock,
  Clock,
  Layers,
  Globe,
  Cpu,
} from "lucide-react";

const pagePath = "/solutions/busy-api";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "Busy Accounting REST API | Whats91 Cloud API";
const seoDescription =
  "Secure, real-time REST API access for Busy Accounting Software. Standard endpoints, custom SQL queries, and JSON/HTML/PDF ledger outputs with 24/7 data availability.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "Busy Accounting API",
      "Busy ERP REST API",
      "Busy Ledger API",
      "Busy Software Developer API",
      "Busy Accounting JSON API",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

const comparisonData = [
  { feature: "Setup Time", standard: "Instant deployment", custom: "Built to your specifications" },
  { feature: "Data Scope", standard: "Ledgers, Sales, Outstanding, Inventory", custom: "100% custom SQL logic" },
  { feature: "Output Structure", standard: "Fixed JSON schema", custom: "Developer-defined JSON schema" },
  { feature: "Filtering", standard: "Standard date & party filters", custom: "Advanced multi-company & voucher logic" },
  { feature: "Best For", standard: "Fast integrations & dashboards", custom: "Complex workflows & proprietary systems" },
];

const outputFormats = [
  {
    icon: FileJson,
    title: "JSON Ledger API",
    description: "Structured raw data payload for deep system integration and custom UI rendering.",
    features: ["Invoice dates & aging details", "Debit/credit breakups", "Bill-by-bill data", "Customer-wise grouping"],
  },
  {
    icon: FileCode,
    title: "HTML Ledger API",
    description: "Beautifully formatted, responsive HTML ledger. Inject directly into portals with zero front-end coding.",
    features: ["Responsive design", "Print-ready styling", "Zero CSS needed", "Instant integration"],
  },
  {
    icon: FileText,
    title: "PDF Ledger API",
    description: "Ready-to-share, printable PDF generated on the fly. Perfect for email workflows and WhatsApp sharing.",
    features: ["Professional formatting", "Auto-generated", "Email attachments", "WhatsApp ready"],
  },
];

const endpoints = [
  { path: "/api/v1/ledger", description: "Fetch ledger data" },
  { path: "/api/v1/outstanding", description: "Outstanding bills" },
  { path: "/api/v1/sales", description: "Sales summary" },
  { path: "/api/v1/inventory", description: "Stock levels" },
  { path: "/api/v1/ledger/html", description: "HTML formatted ledger" },
  { path: "/api/v1/ledger/pdf", description: "PDF ledger document" },
];

const integrationTargets = [
  { icon: Building2, title: "CRM Integration", description: "Salesforce, HubSpot, Zoho CRM" },
  { icon: Globe, title: "E-commerce Portals", description: "B2B ordering platforms" },
  { icon: Cpu, title: "BI Tools", description: "PowerBI, Tableau dashboards" },
  { icon: Layers, title: "Custom Mobile Apps", description: "iOS & Android applications" },
];

const securityFeatures = [
  { icon: Lock, title: "Token-Based Authentication", desc: "Strict API key and bearer token validation" },
  { icon: Building2, title: "Company Isolation", desc: "Enforce company-wise data boundaries" },
  { icon: Shield, title: "IP Whitelisting", desc: "Restrict access to trusted networks" },
  { icon: Clock, title: "99.99% Uptime", desc: "Stable response times, 24/7 availability" },
];

const faqs = [
  { q: "Does the server running Busy software need to be online 24/7?", a: "Our architecture utilizes a secure synchronization agent that ensures your required API data remains accessible 24/7 via our cloud infrastructure, drastically reducing the dependency on your local server's continuous uptime. Your data stays available even when your office is closed." },
  { q: "Can I filter the API to only show data for a specific financial year or branch?", a: "Yes. Both our Standard and Custom APIs support deep filtering parameters, including date ranges, financial years, specific company codes, branch selection, and individual voucher types. You have complete control over what data is returned." },
  { q: "Is there a limit to the number of API calls we can make?", a: "We offer scalable rate limits designed for enterprise usage. During the technical scoping call, we evaluate your query volume and configure the endpoint infrastructure to support your specific load without throttling. No unexpected limits or surprises." },
  { q: "What format does the API return data in?", a: "Our API supports multiple output formats. Standard endpoints return JSON. Our Ledger API can return JSON for raw data, HTML for instant web display, and PDF for printable documents—giving developers maximum flexibility." },
  { q: "How secure is the API connection?", a: "We use industry-standard HTTPS encryption, bearer token authentication, and support IP whitelisting. Each request is validated against your API credentials, and data is isolated by company. Your financial data never travels unencrypted." },
  { q: "Can I connect multiple Busy companies to the API?", a: "Yes. The API supports multi-company configurations with strict isolation. Each company's data is kept separate, and you can filter requests to specific companies or fetch consolidated reports across companies you authorize." },
  { q: "What data can I access through the API?", a: "Standard endpoints cover ledgers, outstanding bills, sales summaries, purchase data, inventory levels, and receipts. Custom APIs can access any data in your Busy database using SQL queries tailored to your needs." },
  { q: "How quickly can we integrate?", a: "Standard API endpoints are available immediately after configuration. Most integrations take 1-2 weeks depending on complexity. Custom APIs require a scoping call to define requirements, typically deployed within 2-4 weeks." },
];

const onboardingSteps = [
  { step: 1, title: "Technical Scoping Call", description: "Define your data requirements and integration goals" },
  { step: 2, title: "API Configuration", description: "Set up endpoints, authentication, and data mappings" },
  { step: 3, title: "Development Access", description: "Receive API keys, documentation, and sandbox access" },
  { step: 4, title: "Go Live", description: "Deploy to production with monitoring and support" },
];

const schemaData = [
  generateServiceSchema({
    name: "Busy Accounting REST API",
    description: seoDescription,
    url: pageUrl,
  }),
  generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/#solutions" },
    { name: "Busy API", url: pagePath },
  ]),
];

export default function BusyAPIPage() {
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
                <Eyebrow icon={Code2} className="mb-5">Developer API</Eyebrow>
                <h1 className="heading-1 mb-5">Secure, Real-Time API Access for Busy Accounting Software</h1>
                <p className="text-lead measure-prose mx-auto lg:mx-0 mb-4">
                  <strong className="text-text-primary">Standard Endpoints | Custom SQL Queries | 24/7 Data Availability</strong>
                </p>
                <p className="text-body measure-prose mx-auto lg:mx-0 mb-6">
                  Unlock the full power of your financial data. The Whats91 API engine transforms on-premise Busy Accounting Software into a cloud-ready data source. Integrate your ledger, inventory, and outstanding data directly into your CRM, custom mobile apps, or enterprise dashboards.
                </p>

                <CTAGroup align="responsive-hero" className="mb-8">
                  <PrimaryCTA href="https://developers.whats91.com/overview">Request API Documentation</PrimaryCTA>
                  <ContactCard
                    variant="popup"
                    trigger={
                      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl h-11 sm:h-12 px-6 sm:px-7 text-sm sm:text-base font-semibold border border-border/80 bg-background text-text-primary hover:bg-surface hover:border-border transition-all duration-200 w-full sm:w-auto">
                        Schedule Technical Scoping
                      </button>
                    }
                  />
                </CTAGroup>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
                  <TrustPill>REST API</TrustPill>
                  <TrustPill>JSON • HTML • PDF</TrustPill>
                  <TrustPill>99.99% Uptime</TrustPill>
                </div>
              </div>

              <AnimatedAPIArchitecture />
            </div>
          </Container>
        </Section>

        {/* AI Answer Target */}
        <Section tone="surface" bordered>
          <Container size="reading">
            <div className="text-center">
              <h2 className="heading-3 mb-4">What is the Whats91 Busy API Engine?</h2>
              <p className="text-lead">
                The Whats91 API infrastructure bridges the gap between <strong className="text-text-primary">legacy desktop accounting</strong> and <strong className="text-text-primary">modern cloud applications</strong>. It provides secure, token-authenticated <strong className="text-brand-primary">REST API endpoints</strong> that fetch real-time data from Busy Accounting Software. Whether you need standard JSON responses for software integration or ready-to-print HTML/PDF ledgers, our server-driven architecture ensures <strong className="text-text-primary">24/7 data availability</strong> without relying on accountant intervention.
              </p>
            </div>
          </Container>
        </Section>

        {/* Comparison */}
        <Section aria-labelledby="comparison-heading">
          <Container size="narrow">
            <SectionHeader
              id="comparison-heading"
              title="Total Control Over Your Data Retrieval"
              description="We don't force you into rigid data structures. Choose the API tier that fits your development needs."
            />
            <div className="surface-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-sm sm:text-base">
                  <thead>
                    <tr className="bg-surface/80 border-b border-border/60">
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Capability</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-brand-primary">Standard API</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-muted">Custom API</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row) => (
                      <tr key={row.feature} className="border-t border-border/40">
                        <td className="px-4 sm:px-6 py-4 font-medium text-text-primary">{row.feature}</td>
                        <td className="px-4 sm:px-6 py-4 text-brand-primary font-medium">{row.standard}</td>
                        <td className="px-4 sm:px-6 py-4 text-text-secondary">{row.custom}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Container>
        </Section>

        {/* Multi-Format Ledger API */}
        <Section tone="surface" aria-labelledby="ledger-heading">
          <Container>
            <SectionHeader
              eyebrow="Ledger API"
              eyebrowIcon={FileJson}
              id="ledger-heading"
              title="Multi-Format Ledger API: JSON, HTML & PDF"
              description="Rendering complex financial ledgers from raw data is a massive development headache. We solved it. Our dedicated Ledger API delivers bill-by-bill outstanding data in three distinct formats, instantly."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {outputFormats.map((format) => (
                <div key={format.title} className="surface-card p-6 sm:p-8">
                  <IconBadge icon={format.icon} size="lg" className="mb-5" />
                  <h4 className="heading-3 mb-4">{format.title}</h4>
                  <p className="text-sm text-text-secondary mb-5">{format.description}</p>
                  <ul className="space-y-3">
                    {format.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-sm sm:text-base text-text-secondary">
                        <CheckCircle2 className="h-5 w-5 text-brand-primary shrink-0 mt-0.5" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Endpoints */}
        <Section aria-labelledby="endpoints-heading">
          <Container>
            <SectionHeader
              eyebrow="API Endpoints"
              eyebrowIcon={Server}
              id="endpoints-heading"
              title="Ready-to-Use Endpoints"
              description="Standard API endpoints available instantly after configuration"
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {endpoints.map((item) => (
                <div key={item.path} className="surface-card surface-card-hover p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 text-xs font-bold text-success bg-success-soft rounded">GET</span>
                    <code className="text-sm font-mono text-text-primary">{item.path}</code>
                  </div>
                  <p className="text-sm text-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-5 max-w-2xl mx-auto">
              <p className="text-sm text-text-secondary text-center">
                <strong className="text-text-primary">Developer Note:</strong> All endpoints support filtering by date range, company, and party. Custom endpoints can be built for any data in your Busy database.
              </p>
            </div>
          </Container>
        </Section>

        {/* Security */}
        <Section tone="surface" aria-labelledby="security-heading">
          <Container>
            <SectionHeader
              eyebrow="Security & Infrastructure"
              eyebrowIcon={Shield}
              id="security-heading"
              title="Secure, Controlled, and Always Online"
              description="Your financial database is your most critical asset. Our API architecture ensures absolute protection and high availability."
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {securityFeatures.map((item) => (
                <div key={item.title} className="surface-card surface-card-hover p-5 text-center">
                  <IconBadge icon={item.icon} className="mx-auto mb-4" />
                  <h4 className="text-sm font-semibold text-text-primary mb-2">{item.title}</h4>
                  <p className="text-xs text-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Integration Targets */}
        <Section aria-labelledby="targets-heading">
          <Container>
            <SectionHeader
              id="targets-heading"
              title="Where Can You Flow Your Busy Data?"
              description="With a reliable API connection, your development team can build limitless automated workflows"
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {integrationTargets.map((item) => (
                <div key={item.title} className="surface-card surface-card-hover p-5">
                  <IconBadge icon={item.icon} className="mb-4" />
                  <h4 className="text-base font-semibold text-text-primary mb-1">{item.title}</h4>
                  <p className="text-body-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Setup */}
        <Section tone="surface" aria-labelledby="setup-heading">
          <Container size="narrow">
            <SectionHeader id="setup-heading" title="Get API access in 4 steps" />
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
              Standard API: <span className="font-medium text-text-primary">Instant access</span> • Custom API: <span className="font-medium text-text-primary">2-4 weeks</span>
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
                <h2 className="heading-2 !text-white mb-4">Connect Your Busy Software to the Modern Web</h2>
                <p className="text-base sm:text-lg text-white/90 mb-8">
                  Stop relying on manual exports and fragile workarounds. Give your development team the clean, secure, and reliable API endpoints they need.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href="https://developers.whats91.com/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white text-brand-700 hover:bg-white/95 rounded-xl shadow-lg transition-colors"
                  >
                    Request API Documentation
                  </a>
                  <ContactCard
                    variant="popup"
                    trigger={
                      <button className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl transition-colors">
                        Schedule Technical Scoping
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
