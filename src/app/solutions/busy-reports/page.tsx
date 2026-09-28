import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ContactCard } from "@/components/landing/ContactCard";
import { AnimatedReportPortal } from "@/components/landing/AnimatedReportPortal";
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
  FileText,
  TrendingUp,
  Users,
  CreditCard,
  Building2,
  Factory,
  Truck as TruckIcon,
  Store,
  CheckCircle2,
  Shield,
  Lock,
  Layers,
  BarChart3,
  Globe,
} from "lucide-react";

const pagePath = "/solutions/busy-reports";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "Busy Accounting Reports on Web & Mobile | Whats91 Cloud API";
const seoDescription =
  "View all your Busy Accounting Software reports on web and mobile, 24/7 — no remote desktop required. Live ledgers, outstanding bills, and role-based access for your team.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "Busy Reports Web Portal",
      "Busy Accounting Mobile App",
      "Busy Software Remote Access",
      "Busy ERP Reports Dashboard",
      "Busy Ledger Reports Online",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

const reportCategories = [
  {
    icon: FileText,
    title: "Live Ledger Reports",
    description: "Real-time party-wise tracking",
    items: ["Party-wise ledger tracking", "Detailed transaction views", "Opening & closing balances", "Debit/Credit breakdown with date filtering"],
  },
  {
    icon: CreditCard,
    title: "Bill-by-Bill Outstanding",
    description: "Complete receivables & payables",
    items: ["Outstanding bills (Receivables & Payables)", "Invoice-wise aging and due dates", "Pending amount tracking", "Overdue status monitoring"],
  },
  {
    icon: TrendingUp,
    title: "Sales & Purchase Analytics",
    description: "Performance insights",
    items: ["Sales summary & customer performance", "Product-wise & item reports", "Vendor-wise purchase data", "Bill-level purchase details"],
  },
  {
    icon: BarChart3,
    title: "Custom & MIS Reporting",
    description: "Tailored for your business",
    items: ["Stock and inventory movement", "Tax, Payment, and Receipt reports", "Custom MIS reports", "Engineered for your business logic"],
  },
];

const comparisonData = [
  { feature: "Accessibility", desktop: "Office PC only", portal: "Anywhere, 24/7 (Web & App)" },
  { feature: "Data Synchronization", desktop: "Manual checks", portal: "Live synchronization" },
  { feature: "User Access Control", desktop: "Limited system logins", portal: "Granular, role-based restrictions" },
  { feature: "Multi-Company View", desktop: "Switch companies manually", portal: "Unified, isolated dashboards" },
  { feature: "Owner Dependency", desktop: "High (asking accountant for exports)", portal: "Zero (instant self-serve access)" },
];

const securityFeatures = [
  { icon: Users, title: "Strict Role-Based Access", desc: "Control which user, branch head, or account manager can see specific reports" },
  { icon: Building2, title: "Multi-Company Separation", desc: "Clean, company-wise separation with zero data mixing" },
  { icon: Lock, title: "Secure Authentication", desc: "Token-based API access ensures your data stays protected" },
  { icon: Shield, title: "Encrypted Connections", desc: "All data transmission secured with industry-standard encryption" },
];

const industries = [
  { icon: Building2, name: "Distributors & Wholesalers", description: "Monitor sales & collections remotely" },
  { icon: Factory, name: "Manufacturing", description: "Track production & stock levels" },
  { icon: TruckIcon, name: "Logistics & Transport", description: "Real-time dispatch & billing status" },
  { icon: Store, name: "Retail Chains", description: "Multi-location performance tracking" },
];

const faqs = [
  { q: "Do I need a Remote Desktop connection (RDP) to use this?", a: "No. This system completely eliminates the need for RDP or AnyDesk. You simply log in to your secure Whats91 web portal or mobile app from any browser or device. Your Busy data is accessible from anywhere, anytime." },
  { q: "Can I restrict my sales team to only see their specific customer ledgers?", a: "Yes. Our role-based access control allows you to restrict report visibility by user, company, and date range. A sales manager will only see the data you authorize them to see. You have complete control over data visibility." },
  { q: "How does the live synchronization work?", a: "Our secure system connects directly to your Busy Software database, applies your selected date and company filters, and updates the web and mobile dashboards automatically without requiring manual Excel exports. Data stays fresh without any manual intervention." },
  { q: "Can I access reports from my mobile phone?", a: "Yes. The Whats91 portal is fully responsive and works on any browser. Additionally, we offer a dedicated mobile app for iOS and Android, giving you instant access to your Busy reports on the go." },
  { q: "What reports are available in the portal?", a: "All critical Busy reports including ledgers, outstanding bills, sales summaries, purchase data, stock reports, tax reports, and custom MIS reports. If it's in Busy, we can display it in your dashboard." },
  { q: "Is my financial data secure?", a: "Yes. We use token-based authentication, encrypted connections, and strict role-based access control. Your data is isolated by company, and only authorized users can access specific reports. We follow industry-standard security practices." },
  { q: "Can I view multiple companies in one dashboard?", a: "Yes. If you manage multiple companies within Busy, the dashboard provides unified access with strict company-wise separation. You can switch between companies instantly without data mixing." },
  { q: "How quickly is data updated?", a: "Data synchronization happens in real-time. When a transaction is entered in Busy, it reflects in your web portal and mobile app within moments. No manual refresh or export required." },
];

const onboardingSteps = [
  { step: 1, title: "Connect Your Busy Software", description: "We configure the secure connection to your Busy database" },
  { step: 2, title: "Set Up User Access", description: "Define which users see which reports and companies" },
  { step: 3, title: "Customize Your Dashboard", description: "Select the reports and metrics you want to track" },
  { step: 4, title: "Access Anywhere, Anytime", description: "Login from web or mobile and start monitoring" },
];

const schemaData = [
  generateServiceSchema({
    name: "Busy Reports Web & Mobile Portal",
    description: seoDescription,
    url: pageUrl,
  }),
  generateFAQSchema(faqs.map((f) => ({ question: f.q, answer: f.a }))),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Solutions", url: "/#solutions" },
    { name: "Busy Reports", url: pagePath },
  ]),
];

export default function BusyReportsPage() {
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
                <Eyebrow icon={Globe} className="mb-5">Web & Mobile Access</Eyebrow>
                <h1 className="heading-1 mb-5">View All Busy Reports on Web & Mobile — 24/7</h1>
                <p className="text-lead measure-prose mx-auto lg:mx-0 mb-4">
                  <strong className="text-text-primary">Access your Busy Accounting Software data anytime, anywhere.</strong> No remote desktop required.
                </p>
                <p className="text-body measure-prose mx-auto lg:mx-0 mb-6">
                  Untether your financial data from the office desktop. The Whats91 Busy Report Add-on securely syncs your core accounting reports to a structured web portal and mobile app, giving owners, managers, and authorized staff instant, real-time access.
                </p>

                <CTAGroup align="responsive-hero" className="mb-8">
                  <PrimaryCTA href="/contact">Activate Busy Reports Add-on</PrimaryCTA>
                  <ContactCard
                    variant="popup"
                    trigger={
                      <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl h-11 sm:h-12 px-6 sm:px-7 text-sm sm:text-base font-semibold border border-border/80 bg-background text-text-primary hover:bg-surface hover:border-border transition-all duration-200 w-full sm:w-auto">
                        Request Live Demo
                      </button>
                    }
                  />
                </CTAGroup>

                <div className="flex flex-wrap justify-center lg:justify-start gap-2.5">
                  <TrustPill>No RDP Required</TrustPill>
                  <TrustPill>24/7 Access</TrustPill>
                  <TrustPill>Role-Based Control</TrustPill>
                </div>
              </div>

              <AnimatedReportPortal />
            </div>
          </Container>
        </Section>

        {/* AI Answer Target */}
        <Section tone="surface" bordered>
          <Container size="reading">
            <div className="text-center">
              <h2 className="heading-3 mb-4">What is the Whats91 Busy Report Add-on?</h2>
              <p className="text-lead">
                The Whats91 Busy Report Add-on is a <strong className="text-text-primary">secure infrastructure tool</strong> that connects local Busy Accounting Software to a <strong className="text-text-primary">cloud-based Web Portal</strong> and <strong className="text-text-primary">Mobile App</strong>. It extracts live financial data—including ledgers, outstanding bills, and sales summaries—and displays them in interactive dashboards. This <strong className="text-brand-primary">eliminates the need for manual data exports</strong> or sitting at an office computer to monitor business performance.
              </p>
            </div>
          </Container>
        </Section>

        {/* Reports Grid */}
        <Section aria-labelledby="reports-heading">
          <Container>
            <SectionHeader
              eyebrow="Available Reports"
              eyebrowIcon={Layers}
              id="reports-heading"
              title="Complete Financial Visibility, 24/7"
              description="Monitor every critical metric through your browser or phone"
            />
            <div className="grid gap-5 sm:gap-6 grid-cols-1 sm:grid-cols-2">
              {reportCategories.map((category) => (
                <div key={category.title} className="surface-card surface-card-hover p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <IconBadge icon={category.icon} size="lg" className="shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-text-primary mb-1">{category.title}</h4>
                      <p className="text-caption mb-3">{category.description}</p>
                      <ul className="space-y-1.5">
                        {category.items.map((item) => (
                          <li key={item} className="flex items-center gap-2 text-sm text-text-secondary">
                            <CheckCircle2 className="h-3.5 w-3.5 text-brand-primary shrink-0" aria-hidden="true" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* Comparison */}
        <Section tone="surface" aria-labelledby="advantage-heading">
          <Container size="narrow">
            <SectionHeader
              id="advantage-heading"
              title="The Whats91 Advantage"
              description="See how our web & mobile portal compares to standard Busy desktop access"
            />
            <div className="surface-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[560px] text-sm sm:text-base">
                  <thead>
                    <tr className="bg-surface/80 border-b border-border/60">
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-primary">Feature</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-text-muted">Standard Busy Desktop</th>
                      <th className="px-4 sm:px-6 py-4 text-left font-semibold text-brand-primary">Whats91 Web & Mobile Portal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row) => (
                      <tr key={row.feature} className="border-t border-border/40">
                        <td className="px-4 sm:px-6 py-4 font-medium text-text-primary">{row.feature}</td>
                        <td className="px-4 sm:px-6 py-4 text-text-secondary">{row.desktop}</td>
                        <td className="px-4 sm:px-6 py-4">
                          <span className="flex items-center gap-2 text-brand-primary font-medium">
                            <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                            {row.portal}
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

        {/* Security */}
        <Section aria-labelledby="security-heading">
          <Container>
            <SectionHeader
              eyebrow="Security & Infrastructure"
              eyebrowIcon={Shield}
              id="security-heading"
              title="Secure Infrastructure & Role-Based Control"
              description="Financial data requires enterprise-grade protection. Your Busy data is isolated, encrypted, and controlled."
            />
            <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {securityFeatures.map((item) => (
                <div key={item.title} className="surface-card surface-card-hover p-5">
                  <IconBadge icon={item.icon} className="mb-4" />
                  <h4 className="text-sm font-semibold text-text-primary mb-2">{item.title}</h4>
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
            <SectionHeader id="setup-heading" title="Get started in minutes" />
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
              Typical setup: <span className="font-medium text-text-primary">1-2 business days</span> • No software installation on your phone
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
                <h2 className="heading-2 !text-white mb-4">Access Your Busy Reports Anytime, Anywhere</h2>
                <p className="text-base sm:text-lg text-white/90 mb-8">
                  Stop waiting for manual exports. Start making faster, data-driven decisions with instant access to your accounting dashboards.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href="/contact"
                    className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white text-brand-700 hover:bg-white/95 rounded-xl shadow-lg transition-colors"
                  >
                    Request a Demo
                  </a>
                  <ContactCard
                    variant="popup"
                    trigger={
                      <button className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl transition-colors">
                        Activate Busy Reports Add-on
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
