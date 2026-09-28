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
  {
    question: "What is lead qualification ROI?",
    answer: "Lead qualification ROI measures the return on investment from qualifying leads using different methods (AI, self-built systems, or human agents). It compares costs and qualification rates to determine the most cost-effective approach.",
  },
  {
    question: "How accurate is the AI qualification rate?",
    answer: "AI qualification rates typically range from 70-90% depending on the quality of training data and the complexity of qualification criteria. Modern AI systems can match or exceed human qualification accuracy while processing leads at scale.",
  },
  {
    question: "What costs should I include in cost per lead?",
    answer: "Cost per lead should include all direct costs: labor costs (for human qualification), software/platform fees (for AI or self-built), infrastructure costs, and any overhead allocated to the qualification process.",
  },
  {
    question: "Why is AI qualification more cost-effective?",
    answer: "AI qualification is more cost-effective because it processes leads 24/7 without fatigue, handles higher volumes without additional staffing, maintains consistent accuracy, and reduces the cost per qualified lead significantly compared to human agents.",
  },
];

const pagePath = "/tools/lead-qualification-roi-calculator";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "Free Lead Qualification ROI Calculator | AI vs Human | Whats91";
const seoDescription =
  "Compare the true cost of AI-powered lead qualification vs human agents and self-built systems. Calculate your monthly savings and ROI instantly, 100% free.";

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
        <ROICalculatorClient />
      </main>
      <Footer />
    </div>
  );
}
