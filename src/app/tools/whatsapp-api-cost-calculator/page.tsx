import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { FAQJsonLD, BreadcrumbJsonLD } from "@/components/seo/JsonLD";
import { generatePageMetadata, siteConfig } from "@/lib/seo/config";
import { CostCalculatorClient } from "./CostCalculatorClient";

const calculatorFAQs = [
  {
    q: "What is a WhatsApp API cost calculator?",
    a: "A WhatsApp API cost calculator estimates monthly spend by message category, country, and volume so teams can compare marketing, utility, authentication, and service traffic before committing budget.",
  },
  {
    q: "Why are service messages usually free?",
    a: "Service replies are customer-initiated support messages sent inside the active customer service window. They are usually free compared with business-initiated templates.",
  },
  {
    q: "Are these WhatsApp API prices final invoices?",
    a: "No. Calculator output is an estimate. Final invoices can include Meta rate changes, BSP platform fees, GST, add-ons, seats, and integration support charges.",
  },
  {
    q: "How can I reduce WhatsApp API costs?",
    a: "Use utility templates for transactional updates, avoid promotional copy in utility templates, encourage customer replies, and reconcile billing against delivered message statuses.",
  },
];

const pagePath = "/tools/whatsapp-api-cost-calculator";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "Free WhatsApp API Cost Calculator | Whats91";
const seoDescription =
  "Calculate your WhatsApp Business API costs accurately. Estimate spending by message type, volume, and country with official Meta pricing across 20 countries.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "WhatsApp API cost calculator",
      "WhatsApp Business API pricing",
      "WhatsApp message cost estimator",
      "Meta WhatsApp pricing calculator",
      "WhatsApp API cost by country",
    ],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

function CostCalculatorAIJsonLD() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${pageUrl}#software`,
    name: "WhatsApp API Cost Calculator",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: pageUrl,
    description: seoDescription,
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
    },
    featureList: [
      "WhatsApp API cost estimation",
      "Marketing message cost planning",
      "Utility message cost planning",
      "Authentication message cost planning",
      "Service message cost planning",
      "Volume-based estimate comparison",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function WhatsAppAPICostCalculatorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <FAQJsonLD faqs={calculatorFAQs.map((faq) => ({ question: faq.q, answer: faq.a }))} />
      <BreadcrumbJsonLD
        items={[
          { name: "Home", url: `${siteConfig.url}/` },
          { name: "Tools", url: `${siteConfig.url}/tools` },
          { name: "WhatsApp API Cost Calculator", url: pageUrl },
        ]}
      />
      <CostCalculatorAIJsonLD />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <CostCalculatorClient />
      </main>
      <Footer />
    </div>
  );
}
