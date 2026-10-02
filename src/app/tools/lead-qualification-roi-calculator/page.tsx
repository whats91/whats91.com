import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { JsonLd } from "@/lib/seo/JsonLd";
import {
  generateBreadcrumbSchema,
  generateFAQSchema,
  generatePageMetadata,
  siteConfig,
} from "@/lib/seo/config";
import { ROICalculatorClient } from "./ROICalculatorClient";

const calculatorFAQs = [
  { question: "What does this scenario compare?", answer: "It compares entered per-lead costs and qualification rates for human, AI and self-built approaches. Use the same currency and period. Savings can be negative; the result is not a quote or a guarantee." },
  { question: "What happens at zero qualification?", answer: "Zero percent produces zero qualified leads. Cost per qualified lead is unavailable when its lead count is zero. ROI and comparison percentages are unavailable when their denominator is zero." },
  { question: "Which assumptions should I enter?", answer: "Use measured or explicitly hypothetical lead volume, costs and qualification rates. Include relevant labour, software and infrastructure costs. No default AI accuracy or commercial rate is supplied." },
];

const pagePath = "/tools/lead-qualification-roi-calculator";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "Free Lead Qualification ROI Calculator | AI vs Human | Whats91";
const seoDescription =
  "Compare lead qualification costs using your own assumptions. See scenario savings and ROI, with explicit zero and unavailable results. Free local calculator.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "lead qualification ROI calculator",
      "AI lead qualification cost",
      "lead qualification cost comparison",
      "AI vs human agents cost",
      "cost per qualified lead calculator",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${pageUrl}#software`,
    name: "Lead Qualification ROI Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: pageUrl,
    description: seoDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  },
  generateFAQSchema(calculatorFAQs),
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Free Tools", url: "/tools" },
    { name: "Lead Qualification ROI Calculator", url: pagePath },
  ]),
];

export default function LeadQualificationROICalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <JsonLd data={structuredData} />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <article className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto py-12 space-y-8">
          <header><h1 className="heading-1">Lead Qualification ROI Calculator</h1><p className="text-body mt-4">Compare costs using your own assumptions. This scenario does not promise savings or qualification accuracy.</p></header>
          <p className="text-body-sm">Interactive calculation requires JavaScript. If controls do not respond, reload with local scripts enabled. The method and limitations below remain readable.</p>
          <noscript><p className="surface-card p-4">Calculations require JavaScript. The method and limitations below remain readable; no result is available without entering valid assumptions.</p></noscript>
          <ROICalculatorClient />
          <section aria-labelledby="roi-faq"><h2 id="roi-faq" className="heading-2 mb-4">Method and limitations</h2>{calculatorFAQs.map(item => <details key={item.question} className="surface-card p-4 mb-3"><summary className="cursor-pointer font-semibold">{item.question}</summary><p className="text-body-sm mt-3">{item.answer}</p></details>)}</section>
          <p className="text-body-sm">Inputs are calculated in this page’s browser state. See our <a className="text-primary underline" href="/privacy">privacy policy</a> for page requests and site preferences. <a className="text-primary underline" href="/tools">Explore other tools</a>.</p>
        </article>
      </main>
      <Footer />
    </div>
  );
}
