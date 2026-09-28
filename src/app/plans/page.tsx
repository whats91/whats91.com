import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { FAQJsonLD, BreadcrumbJsonLD } from "@/components/seo/JsonLD";
import { PlansSelector } from "./PlansSelector";
import {
  Container,
  Section,
  SectionHeader,
  Eyebrow,
  TrustPill,
  IconBadge,
} from "@/components/shared";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generatePageMetadata, siteConfig } from "@/lib/seo/config";
import {
  BILLING_CYCLES,
  formatINR,
  gstOn,
  planList,
  planPrice,
  setupFee,
  GST_RATE,
} from "@/lib/plans";
import {
  Layers,
  Receipt,
  Percent,
  Gift,
  MessageSquare,
  ShieldCheck,
  Wallet,
} from "lucide-react";

const pagePath = "/plans";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "Whats91 Plans | WhatsApp Coexistence & Standard Pricing";
const seoDescription =
  "Compare the Whats91 WhatsApp Coexistence and WhatsApp Standard plans. From ₹5,000/year or ₹699/month plus 18% GST, with one-time setup included free on annual billing.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "Whats91 plans",
      "WhatsApp Coexistence plan",
      "WhatsApp Standard plan",
      "WhatsApp API subscription India",
      "WhatsApp platform pricing",
      "WhatsApp Business API plan price",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

const includedInEveryPlan = [
  {
    icon: Layers,
    title: "Template Management",
    description: "Draft, submit and monitor WhatsApp message templates from one place.",
  },
  {
    icon: MessageSquare,
    title: "Campaign Builder",
    description: "Build, segment and schedule template campaigns to your contact book.",
  },
  {
    icon: ShieldCheck,
    title: "Chatbot Automation",
    description: "Automated flows and rule-based replies that run around the clock.",
  },
];

const faqs = [
  {
    q: "What is the difference between the Coexistence and Standard plans?",
    a: "Both plans include Template Management, Contact Book Management, Campaign Builder, Chatbot Automation and Public API Access. WhatsApp Coexistence lets you keep using the WhatsApp Business App alongside the WhatsApp Cloud API on the same number. WhatsApp Standard adds everything in Coexistence plus MCP access and full Chat Application access for viewing and managing conversations.",
  },
  {
    q: "Are the listed plan prices inclusive of GST?",
    a: "No. Every price on this page is exclusive of GST. Indian GST of 18% is added on top and always shown as a separate line item on the checkout summary and on your invoice.",
  },
  {
    q: "Is the setup fee charged on annual plans?",
    a: "No. Annual billing includes one-time setup at no additional charge. The setup fee applies to monthly billing only — ₹1,000 + GST for WhatsApp Coexistence and ₹2,000 + GST for WhatsApp Standard, charged once on the first payment.",
  },
  {
    q: "How much does the first monthly payment come to?",
    a: "On monthly billing the first payment covers the first month plus the one-time setup fee. WhatsApp Coexistence is ₹699 + ₹1,000 setup + ₹305.82 GST = ₹2,004.82, then ₹824.82 per month including GST. WhatsApp Standard is ₹949 + ₹2,000 setup + ₹530.82 GST = ₹3,479.82, then ₹1,119.82 per month including GST.",
  },
  {
    q: "Do these plans cover the cost of WhatsApp messages?",
    a: "No. Plan fees cover the Whats91 platform. WhatsApp message charges are separate and depend on Meta's current rate card and the billing arrangement stated in your order form or invoice.",
  },
  {
    q: "Can I claim input tax credit on the GST?",
    a: "GST-registered Indian businesses can generally claim the 18% GST charged on Whats91 invoices as Input Tax Credit. Your invoice shows the GST as a separate line so it can be reconciled directly. Check the treatment with your accountant for your specific registration.",
  },
];

/**
 * Offer schema for the four plan + billing-cycle combinations. Prices are
 * published exclusive of GST, so `valueAddedTaxIncluded` is explicitly false.
 */
const planSchema = {
  "@context": "https://schema.org",
  "@type": "Product",
  "@id": `${pageUrl}#whats91-platform-plans`,
  name: "Whats91 WhatsApp Platform Plans",
  description:
    "Whats91 platform subscription plans for Indian businesses on the WhatsApp Cloud API: WhatsApp Coexistence and WhatsApp Standard, on monthly or annual billing.",
  url: pageUrl,
  brand: { "@id": "https://whats91.com/#organization" },
  offers: planList.flatMap((plan) =>
    BILLING_CYCLES.map((billing) => ({
      "@type": "Offer",
      name: `${plan.name} — ${billing === "annual" ? "Annual" : "Monthly"}`,
      url: pageUrl,
      priceCurrency: "INR",
      price: String(planPrice(plan, billing)),
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "INR",
        price: String(planPrice(plan, billing)),
        valueAddedTaxIncluded: false,
        billingIncrement: 1,
        unitCode: billing === "annual" ? "ANN" : "MON",
      },
      description:
        billing === "annual"
          ? `${plan.name} billed annually. One-time setup included at no additional charge. Price excludes 18% GST.`
          : `${plan.name} billed monthly, plus a one-time setup fee of ${formatINR(plan.monthlySetupFee)}. Prices exclude 18% GST.`,
      seller: { "@id": "https://whats91.com/#organization" },
      availability: "https://schema.org/InStock",
      areaServed: { "@type": "Country", name: "India" },
    }))
  ),
};

export default function PlansPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <FAQJsonLD faqs={faqs.map((faq) => ({ question: faq.q, answer: faq.a }))} />
      <BreadcrumbJsonLD
        items={[
          { name: "Home", url: `${siteConfig.url}/` },
          { name: "Plans", url: pageUrl },
        ]}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(planSchema) }}
      />
      <Header />

      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        {/* Hero */}
        <Section tone="brand-soft" pad="lg">
          <Container className="text-center max-w-4xl">
            <Eyebrow icon={Wallet} className="mb-5">
              Whats91 Platform Plans
            </Eyebrow>
            <h1 className="heading-1 mb-5">Pick the plan that fits your WhatsApp setup</h1>
            <p className="text-lead measure-prose mx-auto mb-6">
              Two plans, one platform. Start with{" "}
              <strong className="text-text-primary">WhatsApp Coexistence</strong> to run the Business
              App and the Cloud API on one number, or take{" "}
              <strong className="text-text-primary">WhatsApp Standard</strong> for MCP access and the
              full chat application. All prices are{" "}
              <strong className="text-text-primary">exclusive of 18% GST</strong>.
            </p>
            <div className="flex flex-wrap justify-center gap-2.5">
              <TrustPill icon={Gift}>Setup free on annual billing</TrustPill>
              <TrustPill icon={Percent}>GST shown as a separate line</TrustPill>
              <TrustPill>Zero markup on message rates</TrustPill>
            </div>
          </Container>
        </Section>

        {/* Plan selector, cards and comparison */}
        <Section id="compare" tone="surface" className="scroll-mt-24" aria-labelledby="plans-heading">
          <Container>
            <SectionHeader
              eyebrow="Compare plans"
              eyebrowIcon={Layers}
              id="plans-heading"
              title="Choose monthly or annual billing"
              description="Annual billing covers twelve months and includes one-time setup at no additional charge. Monthly billing adds a one-time setup fee on the first payment only."
            />
            <PlansSelector />
          </Container>
        </Section>

        {/* Core capability band */}
        <Section aria-labelledby="core-heading">
          <Container>
            <SectionHeader
              eyebrow="In every plan"
              eyebrowIcon={ShieldCheck}
              id="core-heading"
              title="The core platform ships with both plans"
              description="Template Management, Contact Book Management, Campaign Builder, Chatbot Automation and Public API Access are included whichever plan you choose."
            />
            <div className="grid gap-6 md:grid-cols-3">
              {includedInEveryPlan.map((item) => (
                <div key={item.title} className="surface-card surface-card-hover p-6">
                  <IconBadge icon={item.icon} size="lg" className="mb-4" />
                  <h3 className="heading-4 mb-2">{item.title}</h3>
                  <p className="text-body-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* GST breakdown reference */}
        <Section tone="surface" aria-labelledby="gst-heading">
          <Container size="narrow">
            <SectionHeader
              eyebrow="Tax treatment"
              eyebrowIcon={Receipt}
              id="gst-heading"
              title="How 18% GST is applied"
              description="Listed prices never include GST. The 18% is calculated on the subtotal and itemised separately at checkout and on your invoice."
            />
            <div className="surface-card overflow-hidden">
              {/* `relative` keeps the absolutely positioned .sr-only caption
                  clipped inside the scroll container — see PlansSelector. */}
              <div className="relative overflow-x-auto">
                <table className="w-full min-w-[520px]">
                  <caption className="sr-only">
                    First payment for each plan and billing cycle, showing the subtotal excluding
                    GST, the 18% GST amount, and the total payable.
                  </caption>
                  <thead>
                    <tr className="bg-surface/80">
                      <th scope="col" className="p-4 text-left text-xs font-semibold uppercase text-text-muted">
                        Plan &amp; cycle
                      </th>
                      <th scope="col" className="p-4 text-center text-xs font-semibold uppercase text-text-muted">
                        Subtotal (excl. GST)
                      </th>
                      <th scope="col" className="p-4 text-center text-xs font-semibold uppercase text-text-muted">
                        GST @ 18%
                      </th>
                      <th scope="col" className="p-4 text-center text-xs font-semibold uppercase text-text-muted">
                        First payment
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {planList.flatMap((plan) =>
                      BILLING_CYCLES.map((billing) => {
                        const subtotal = planPrice(plan, billing) + setupFee(plan, billing);
                        const gst = gstOn(subtotal);
                        return (
                          <tr key={`${plan.id}-${billing}`} className="border-t border-border/60">
                            <th scope="row" className="p-4 text-left text-sm font-medium text-text-primary">
                              {plan.name}
                              <span className="block text-caption font-normal">
                                {billing === "annual"
                                  ? "Annual — setup included"
                                  : `Monthly — includes ${formatINR(plan.monthlySetupFee)} one-time setup`}
                              </span>
                            </th>
                            <td className="p-4 text-center text-sm text-text-secondary">
                              {formatINR(subtotal)}
                            </td>
                            <td className="p-4 text-center text-sm text-text-secondary">
                              {formatINR(gst)}
                            </td>
                            <td className="p-4 text-center text-sm font-bold text-text-primary">
                              {formatINR(subtotal + gst)}
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
            <p className="mt-4 text-caption text-center">
              GST is charged at {Math.round(GST_RATE * 100)}% on the subtotal. On monthly billing the
              setup fee appears on the first payment only; every payment after that is the monthly
              plan price plus GST.
            </p>

            <div className="mt-6 rounded-xl border border-brand-primary/20 bg-brand-primary/5 p-5 text-center">
              <p className="text-sm text-text-secondary">
                <strong className="text-text-primary">Message charges are separate.</strong> Plan fees
                cover the Whats91 platform. WhatsApp message charges depend on Meta&apos;s current rate
                card and the billing arrangement in your order form —{" "}
                <Link href="/pricing" className="font-semibold text-brand-primary hover:underline">
                  see the per-message rate card
                </Link>
                .
              </p>
            </div>
          </Container>
        </Section>

        {/* FAQ */}
        <Section aria-labelledby="faq-heading">
          <Container size="narrow">
            <SectionHeader id="faq-heading" title="Plan and billing questions" />
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={faq.q}
                  value={`plan-faq-${index}`}
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
        <Section tone="surface">
          <Container>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-primary via-brand-primary to-brand-accent p-7 sm:p-8 md:p-12 lg:p-16 shadow-xl">
              <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute -top-1/2 -right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="heading-2 !text-white mb-4">Not sure which plan you need?</h2>
                <p className="text-base sm:text-lg text-white/90 mb-8">
                  Tell us how your team uses WhatsApp today and we will point you at the right plan.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Link
                    href="#compare"
                    className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white text-brand-700 hover:bg-white/95 rounded-xl shadow-lg transition-colors w-full sm:w-auto"
                  >
                    Compare plans again
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center h-12 px-7 text-base font-semibold bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl transition-colors w-full sm:w-auto"
                  >
                    Talk to Sales
                  </Link>
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
