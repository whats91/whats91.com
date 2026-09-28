import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRight,
  BadgeIndianRupee,
  Building2,
  CheckCircle2,
  CircleDollarSign,
  Handshake,
  Headphones,
  Phone,
  RefreshCw,
  Settings,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
} from "lucide-react";
import { Footer } from "@/components/landing/Footer";
import { Header } from "@/components/landing/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { JsonLd } from "@/lib/seo/JsonLd";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  siteConfig,
} from "@/lib/seo/config";

const pagePath = "/partners";
const pageUrl = `${siteConfig.url}${pagePath}`;
const partnerRegisterUrl = "https://app.whats91.com/partner/register";

export const metadata: Metadata = generatePageMetadata({
  title: "Whats91 Partner Program | Partner & Tech Partner Pricing",
  description:
    "Join the Whats91 Partner Program. Compare Partner and Tech Partner pricing for Co-Existing, Standard, Flow Builder, Catalog, and campaign add-ons with renewal benefits.",
  keywords: [
    "Whats91 partner program",
    "WhatsApp API partner pricing",
    "WhatsApp Cloud API reseller India",
    "Whats91 Tech Partner",
    "WhatsApp Business API partner",
    "Co-Existing plan partner pricing",
    "Standard WhatsApp API partner pricing",
  ],
  path: pagePath,
});

const phoneLabel = "+91 96698 23388";

const partnerTypes = [
  {
    title: "Partner",
    badge: "Referral-led",
    icon: Handshake,
    description:
      "Refer clients to Whats91 while our team handles onboarding, WhatsApp setup, support, and integrations.",
    points: [
      "Best for consultants, sales partners, and regional business networks.",
      "Whats91 manages technical onboarding and customer support.",
      "Ongoing renewal benefits grow with referred active clients.",
    ],
  },
  {
    title: "Tech Partner",
    badge: "Partner-led delivery",
    icon: Wrench,
    description:
      "Onboard and support clients independently while using the Whats91 platform at stronger partner pricing.",
    points: [
      "Best for agencies, software vendors, ERP teams, and implementation partners.",
      "Tech Partner handles onboarding, support, setup, and client success.",
      "Greater platform and add-on benefits for partners with delivery capability.",
    ],
  },
];

const responsibilities = [
  { area: "Lead generation", partner: "Partner refers clients", techPartner: "Tech Partner sources and manages clients" },
  { area: "Client onboarding", partner: "Whats91 handles onboarding", techPartner: "Tech Partner handles onboarding" },
  { area: "WhatsApp setup", partner: "Whats91 configures setup", techPartner: "Tech Partner configures with platform access" },
  { area: "Template/helpdesk support", partner: "Whats91 provides support", techPartner: "Tech Partner provides first-line support" },
  { area: "ERP/integration work", partner: "Whats91 handles integrations", techPartner: "Tech Partner handles delivery independently" },
  { area: "Renewal relationship", partner: "Benefit from referred active renewals", techPartner: "Benefit from managed active renewals" },
  { area: "Discount level", partner: "Partner pricing", techPartner: "Higher Tech Partner benefits" },
];

const corePlans = [
  {
    plan: "Co-Existing",
    term: "1 Year",
    customer: "₹5,000",
    partner: "₹3,500",
    techPartner: "₹2,500",
  },
  {
    plan: "Co-Existing",
    term: "3 Years",
    customer: "₹13,000",
    partner: "₹8,000",
    techPartner: "₹6,000",
  },
  {
    plan: "Standard",
    term: "1 Year",
    customer: "₹7,000",
    partner: "₹5,000",
    techPartner: "₹4,000",
  },
  {
    plan: "Standard",
    term: "3 Years",
    customer: "₹16,000",
    partner: "₹11,000",
    techPartner: "₹9,000",
  },
];

const addOns = [
  {
    code: "103",
    name: "Flow Builder",
    customer: "₹2,000",
    partner: "₹1,500",
    techPartner: "₹1,000",
  },
  {
    code: "102",
    name: "WhatsApp Catalog Management",
    customer: "₹4,000",
    partner: "₹3,000",
    techPartner: "₹2,000",
  },
  {
    code: "101",
    name: "Campaign Utility Templates",
    customer: "₹2,000",
    partner: "₹1,500",
    techPartner: "₹1,000",
  },
];

const growthBenefits = [
  {
    icon: Users,
    title: "Build a recurring client base",
    description:
      "Every successful client onboarding can keep contributing value when the account remains active and renews.",
  },
  {
    icon: RefreshCw,
    title: "Benefit from renewals",
    description:
      "Partner benefits are designed around active and renewing clients, not only one-time setup activity.",
  },
  {
    icon: TrendingUp,
    title: "Grow into Tech Partner delivery",
    description:
      "Partners with their own onboarding and support capability can move toward the stronger Tech Partner model.",
  },
];

const faqs = [
  {
    question: "What is the difference between Partner and Tech Partner?",
    answer:
      "A Partner refers clients to Whats91 and Whats91 handles onboarding, support, and integrations. A Tech Partner performs onboarding and support independently while using the Whats91 platform with greater pricing benefits.",
  },
  {
    question: "Who handles onboarding for standard Partners?",
    answer:
      "For standard Partners, Whats91 handles client onboarding, WhatsApp setup, support coordination, and integration work after the partner refers the client.",
  },
  {
    question: "Who handles support for Tech Partners?",
    answer:
      "Tech Partners handle first-line onboarding and support for their clients. Whats91 provides the platform layer, while the Tech Partner manages client delivery and day-to-day support.",
  },
  {
    question: "Are prices exclusive of GST?",
    answer:
      "Yes. All Customer, Partner, and Tech Partner prices shown on this page are exclusive of 18% GST.",
  },
  {
    question: "Are Meta message charges included?",
    answer:
      "No. Meta per-message charges are extra and are paid directly to Meta as per the applicable Meta template and message rates.",
  },
  {
    question: "Do partners receive renewal benefits?",
    answer:
      "Yes. Partners receive ongoing renewal benefits based on their active and renewing client base. Exact benefits depend on the partner type, client activity, and commercial terms finalized with Whats91.",
  },
  {
    question: "Are add-ons discounted for partners?",
    answer:
      "Yes. Flow Builder, WhatsApp Catalog Management, and Campaign Utility Templates have separate Customer, Partner, and Tech Partner pricing. Tech Partners receive the strongest add-on pricing shown on this page.",
  },
  {
    question: "Which plan should partners sell: Co-Existing or Standard?",
    answer:
      "Co-Existing is suitable when a customer wants to keep using the WhatsApp Business App alongside Cloud API workflows. Standard is suitable for clients who want a more API-led WhatsApp setup. The right plan depends on the client's workflow and support needs.",
  },
  {
    question: "Can software agencies become Tech Partners?",
    answer:
      "Yes. Software agencies, ERP implementers, automation consultants, and technical service providers can become Tech Partners if they can manage onboarding, setup, support, and client success independently.",
  },
  {
    question: "How do I apply?",
    answer:
      "Use the partner registration link on this page or call +91 96698 23388. The team will review your client base, delivery capability, and preferred partner model.",
  },
];

const structuredData = [
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Partners", url: pagePath },
  ]),
  generateFAQSchema(faqs),
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: "Whats91 Partner Program",
    description:
      "Whats91 Partner Program page for standard Partners and Tech Partners, including public plan pricing, add-on pricing, responsibility split, renewal benefits, and application steps.",
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.url}/#website`,
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: [
      { "@type": "Thing", name: "WhatsApp Cloud API partner program" },
      { "@type": "Thing", name: "Tech Partner onboarding" },
      { "@type": "Thing", name: "Partner renewal benefits" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#partner-service`,
    name: "Whats91 Partner Program",
    serviceType: "WhatsApp Cloud API partner program",
    url: pageUrl,
    description:
      "Partner and Tech Partner program for selling Whats91 Co-Existing and Standard WhatsApp Cloud API plans with discounted platform and add-on pricing.",
    provider: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.name,
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Whats91 Partner Program Pricing",
      itemListElement: [
        ...corePlans.flatMap((row) => [
          {
            "@type": "Offer",
            name: `Customer ${row.plan} ${row.term}`,
            priceCurrency: "INR",
            price: row.customer.replace(/[₹,]/g, ""),
            description: `${row.plan} ${row.term} customer price, exclusive of 18% GST.`,
            url: pageUrl,
          },
          {
            "@type": "Offer",
            name: `Partner ${row.plan} ${row.term}`,
            priceCurrency: "INR",
            price: row.partner.replace(/[₹,]/g, ""),
            description: `${row.plan} ${row.term} Partner price, exclusive of 18% GST.`,
            url: pageUrl,
          },
          {
            "@type": "Offer",
            name: `Tech Partner ${row.plan} ${row.term}`,
            priceCurrency: "INR",
            price: row.techPartner.replace(/[₹,]/g, ""),
            description: `${row.plan} ${row.term} Tech Partner price, exclusive of 18% GST.`,
            url: pageUrl,
          },
        ]),
        ...addOns.flatMap((row) => [
          {
            "@type": "Offer",
            name: `Customer add-on ${row.code} - ${row.name}`,
            priceCurrency: "INR",
            price: row.customer.replace(/[₹,]/g, ""),
            description: `${row.name} customer add-on price, exclusive of 18% GST.`,
            url: pageUrl,
          },
          {
            "@type": "Offer",
            name: `Partner add-on ${row.code} - ${row.name}`,
            priceCurrency: "INR",
            price: row.partner.replace(/[₹,]/g, ""),
            description: `${row.name} Partner add-on price, exclusive of 18% GST.`,
            url: pageUrl,
          },
          {
            "@type": "Offer",
            name: `Tech Partner add-on ${row.code} - ${row.name}`,
            priceCurrency: "INR",
            price: row.techPartner.replace(/[₹,]/g, ""),
            description: `${row.name} Tech Partner add-on price, exclusive of 18% GST.`,
            url: pageUrl,
          },
        ]),
      ],
    },
  },
];

type PriceTableProps =
  | { rows: typeof corePlans; type: "plans" }
  | { rows: typeof addOns; type: "addons" };

function PriceTable(props: PriceTableProps) {
  const { rows, type } = props;

  return (
    <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card shadow-sm">
      <table className="min-w-[760px] w-full text-left text-sm">
        <thead className="bg-surface/70 text-xs uppercase tracking-wider text-text-muted">
          <tr>
            <th className="px-5 py-4 font-semibold">{type === "plans" ? "Plan" : "Add-on"}</th>
            <th className="px-5 py-4 font-semibold">{type === "plans" ? "Term" : "Code"}</th>
            <th className="px-5 py-4 font-semibold">Customer</th>
            <th className="px-5 py-4 font-semibold">Partner</th>
            <th className="px-5 py-4 font-semibold">Tech Partner</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/70">
          {type === "plans"
            ? rows.map((row) => (
                <tr key={`${row.plan}-${row.term}`} className="align-top">
                  <td className="px-5 py-4 font-semibold text-text-primary">{row.plan}</td>
                  <td className="px-5 py-4 text-text-secondary">{row.term}</td>
                  <td className="px-5 py-4">
                    <span className="block font-semibold text-text-primary">{row.customer}</span>
                    <span className="text-xs text-text-muted">+ 18% GST</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="block font-semibold text-brand-primary">{row.partner}</span>
                    <span className="text-xs text-text-muted">+ 18% GST</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="block font-semibold text-text-primary">{row.techPartner}</span>
                    <span className="block text-xs text-text-muted">+ 18% GST</span>
                    <span className="text-xs text-brand-primary">Best partner benefit</span>
                  </td>
                </tr>
              ))
            : rows.map((row) => (
                <tr key={row.code} className="align-top">
                  <td className="px-5 py-4 font-semibold text-text-primary">{row.name}</td>
                  <td className="px-5 py-4 text-text-secondary">{row.code}</td>
                  <td className="px-5 py-4">
                    <span className="block font-semibold text-text-primary">{row.customer}</span>
                    <span className="text-xs text-text-muted">+ 18% GST</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="block font-semibold text-brand-primary">{row.partner}</span>
                    <span className="text-xs text-text-muted">+ 18% GST</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="block font-semibold text-text-primary">{row.techPartner}</span>
                    <span className="block text-xs text-text-muted">+ 18% GST</span>
                    <span className="text-xs text-brand-primary">Best partner benefit</span>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={structuredData} />
      <Header />

      <main className="flex-1">
        <article>
          <section className="relative overflow-hidden bg-gradient-to-b from-surface/80 to-background py-14 sm:py-16 md:py-20">
            <div className="absolute inset-0 gradient-brand-subtle" aria-hidden="true" />
            <div className="relative mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
                <header className="text-center lg:text-left">
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-primary/20 bg-card px-4 py-1.5 text-xs font-semibold text-brand-primary shadow-sm sm:text-sm">
                    <Handshake className="h-4 w-4" />
                    Whats91 Partner Program
                  </div>
                  <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl md:text-5xl">
                    Grow with the Whats91 Partner Program
                  </h1>
                  <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg lg:mx-0">
                    Partners refer clients while Whats91 handles onboarding, support, and integrations. Tech Partners manage onboarding and support independently while using the Whats91 platform with greater pricing benefits.
                  </p>
                  <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                    <Button asChild className="h-11 rounded-xl bg-brand-primary px-6 text-white hover:bg-brand-primary-hover">
                      <a href={partnerRegisterUrl} target="_blank" rel="noopener noreferrer">
                        Become a Partner
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </a>
                    </Button>
                    <Button asChild variant="outline" className="h-11 rounded-xl border-border bg-card px-6 text-text-primary hover:bg-surface">
                      <a href="tel:+919669823388">
                        <Phone className="mr-1 h-4 w-4" />
                        Call {phoneLabel}
                      </a>
                    </Button>
                  </div>
                </header>

                <div className="rounded-3xl border border-border/70 bg-card p-5 shadow-xl shadow-brand-primary/10 sm:p-6">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">Partner economics</p>
                      <h2 className="mt-1 text-xl font-bold text-text-primary">Two ways to grow</h2>
                    </div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary">
                      <CircleDollarSign className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {partnerTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <div key={type.title} className="rounded-2xl border border-border/70 bg-surface/50 p-4">
                          <div className="mb-4 flex items-center justify-between gap-3">
                            <Icon className="h-6 w-6 text-brand-primary" />
                            <span className="rounded-full bg-brand-primary/10 px-2.5 py-1 text-[11px] font-semibold text-brand-primary">
                              {type.badge}
                            </span>
                          </div>
                          <h3 className="font-semibold text-text-primary">{type.title}</h3>
                          <p className="mt-2 text-sm leading-relaxed text-text-secondary">{type.description}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-5 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-4 text-sm leading-relaxed text-text-secondary">
                    <strong className="text-text-primary">Renewal upside:</strong> partner benefits improve as your active client base grows and renews with Whats91.
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 md:py-20" aria-labelledby="partner-types-heading">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-primary">Choose the right model</p>
                <h2 id="partner-types-heading" className="text-2xl font-bold text-text-primary sm:text-3xl">
                  Partner and Tech Partner are intentionally different
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
                  The standard Partner model is referral-led. The Tech Partner model is for teams that can own delivery, support, and account growth.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {partnerTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <Card key={type.title} className="rounded-2xl border-border/70 bg-card shadow-sm">
                      <CardContent className="p-6">
                        <div className="mb-5 flex items-start justify-between gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                            <Icon className="h-6 w-6" />
                          </div>
                          <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-semibold text-brand-primary">
                            {type.badge}
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold text-text-primary">{type.title}</h3>
                        <p className="mt-3 text-sm leading-relaxed text-text-secondary">{type.description}</p>
                        <ul className="mt-5 space-y-3">
                          {type.points.map((point) => (
                            <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-text-secondary">
                              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="bg-surface/50 py-14 sm:py-16 md:py-20" aria-labelledby="responsibility-heading">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-primary">Responsibility matrix</p>
                <h2 id="responsibility-heading" className="text-2xl font-bold text-text-primary sm:text-3xl">
                  Who owns onboarding, support, and renewals?
                </h2>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-border/70 bg-card shadow-sm">
                <table className="min-w-[760px] w-full text-left text-sm">
                  <thead className="bg-surface/70 text-xs uppercase tracking-wider text-text-muted">
                    <tr>
                      <th className="px-5 py-4 font-semibold">Area</th>
                      <th className="px-5 py-4 font-semibold">Partner</th>
                      <th className="px-5 py-4 font-semibold">Tech Partner</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/70">
                    {responsibilities.map((row) => (
                      <tr key={row.area}>
                        <td className="px-5 py-4 font-semibold text-text-primary">{row.area}</td>
                        <td className="px-5 py-4 text-text-secondary">{row.partner}</td>
                        <td className="px-5 py-4 text-text-secondary">{row.techPartner}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 md:py-20" aria-labelledby="pricing-heading">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-primary">Public partner pricing</p>
                <h2 id="pricing-heading" className="text-2xl font-bold text-text-primary sm:text-3xl">
                  Core plan pricing for Customers, Partners, and Tech Partners
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
                  All prices below are in INR and exclusive of 18% GST. Tech Partners receive stronger pricing because they manage onboarding and support independently.
                </p>
              </div>
              <PriceTable rows={corePlans} type="plans" />

              <div className="mt-12 mb-8 text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-primary">Add-on pricing</p>
                <h2 className="text-2xl font-bold text-text-primary sm:text-3xl">
                  Add-ons also include Partner and Tech Partner benefits
                </h2>
              </div>
              <PriceTable rows={addOns} type="addons" />

              <div className="mt-8 rounded-2xl border border-warning-border bg-warning-soft p-5 text-sm leading-relaxed text-warning">
                <div className="flex items-start gap-3">
                  <BadgeIndianRupee className="mt-0.5 h-5 w-5 shrink-0" />
                  <p>
                    <strong>Meta cost note:</strong> Meta per-message charges are extra and are paid directly to Meta as per Meta template/message rates.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-brand-primary/20 bg-brand-primary/5 p-5 text-sm leading-relaxed text-text-secondary">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <p>
                    <strong className="text-text-primary">Using partner wallet?</strong> Learn how Whats91 Coins convert recharge value into plan and add-on assignments.
                  </p>
                  <Button asChild variant="outline" className="shrink-0 border-brand-primary/30 bg-card text-brand-700 hover:bg-brand-primary/10">
                    <Link href="/partners/whats91-coins">
                      View Whats91 Coins
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface/50 py-14 sm:py-16 md:py-20" aria-labelledby="growth-heading">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                <div>
                  <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-primary">Renewal-led growth</p>
                  <h2 id="growth-heading" className="text-2xl font-bold text-text-primary sm:text-3xl">
                    More active clients create stronger long-term partner value
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                    The Whats91 partner model is built for recurring client relationships. As partners onboard more clients and those clients continue renewing, the partner relationship becomes more valuable over time.
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-text-secondary sm:text-base">
                    Exact renewal benefits depend on the selected partner type, active client base, renewal status, and commercial terms finalized with Whats91.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                  {growthBenefits.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-text-primary">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.description}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 md:py-20" aria-labelledby="why-partner-heading">
            <div className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-primary">Why partners choose Whats91</p>
                <h2 id="why-partner-heading" className="text-2xl font-bold text-text-primary sm:text-3xl">
                  Built for WhatsApp API, ERP, and business automation clients
                </h2>
              </div>
              <div className="grid gap-5 md:grid-cols-4">
                {[
                  { icon: ShieldCheck, title: "Official API focus", text: "Sell WhatsApp Cloud API workflows with a platform built for Indian business teams." },
                  { icon: Settings, title: "ERP-ready", text: "Position Busy, Miracle, templates, campaigns, and automation services to real business users." },
                  { icon: Headphones, title: "Clear support split", text: "Choose Whats91-led support as a Partner or own support as a Tech Partner." },
                  { icon: Sparkles, title: "Add-on upside", text: "Extend client value with Flow Builder, Catalog Management, and Campaign Utility Templates." },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                      <Icon className="mb-4 h-6 w-6 text-brand-primary" />
                      <h3 className="font-semibold text-text-primary">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{item.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="bg-surface/50 py-14 sm:py-16 md:py-20" aria-labelledby="faq-heading">
            <div className="mx-auto max-w-[900px] px-4 sm:px-6 lg:px-8">
              <div className="mb-10 text-center">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-brand-primary">FAQ</p>
                <h2 id="faq-heading" className="text-2xl font-bold text-text-primary sm:text-3xl">
                  Whats91 Partner Program questions
                </h2>
              </div>
              <div className="space-y-4">
                {faqs.map((faq) => (
                  <details key={faq.question} className="group rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                    <summary className="cursor-pointer list-none text-base font-semibold text-text-primary">
                      <span className="flex items-center justify-between gap-4">
                        {faq.question}
                        <span className="text-brand-primary transition-transform group-open:rotate-45">+</span>
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <section className="py-14 sm:py-16 md:py-20">
            <div className="mx-auto max-w-[1100px] px-4 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-brand-primary p-8 text-center text-white shadow-xl shadow-brand-primary/20 sm:p-10">
                <Building2 className="mx-auto mb-4 h-10 w-10" />
                <h2 className="text-2xl font-bold sm:text-3xl">Ready to become a Whats91 Partner?</h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/85 sm:text-base">
                  Share your client profile and delivery capability with Whats91. We will help you choose between Partner and Tech Partner models.
                </p>
                <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                  <Button asChild className="h-11 rounded-xl bg-white px-6 text-brand-700 hover:bg-white/90">
                    <a href={partnerRegisterUrl} target="_blank" rel="noopener noreferrer">
                      Register as Partner
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="h-11 rounded-xl border-white/30 bg-transparent px-6 text-white hover:bg-white/10">
                    <Link href="/partners/whats91-coins">Explore Whats91 Coins</Link>
                  </Button>
                  <Button asChild variant="outline" className="h-11 rounded-xl border-white/30 bg-transparent px-6 text-white hover:bg-white/10">
                    <a href="tel:+919669823388">Call {phoneLabel}</a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  );
}
