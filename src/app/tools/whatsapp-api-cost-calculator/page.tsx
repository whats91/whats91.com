import { metaPricingDescription } from "@/lib/meta-pricing";
import { pricingFAQs } from "@/lib/pricing";
import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { FAQJsonLD, BreadcrumbJsonLD } from "@/components/seo/JsonLD";
import { generatePageMetadata, siteConfig } from "@/lib/seo/config";
import { CostCalculatorClient } from "./CostCalculatorClient";



const pagePath = "/tools/whatsapp-api-cost-calculator";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "Free WhatsApp API Cost Calculator | Whats91";
const seoDescription =
  metaPricingDescription;

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
      "WhatsApp monthly volume planning",
      "Marketing message cost planning",
      "Utility message cost planning",
      "Authentication message cost planning",
      "Service message cost planning",
      "Official INR schedule, marginal tiers, monthly Service allowance and confirmed free-entry exclusions",
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
      <FAQJsonLD faqs={pricingFAQs} />
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
