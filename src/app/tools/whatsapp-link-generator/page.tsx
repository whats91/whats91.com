import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { JsonLd } from "@/lib/seo/JsonLd";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo/config";
import { WhatsAppLinkGeneratorClient } from "./WhatsAppLinkGeneratorClient";

const pagePath = "/tools/whatsapp-link-generator";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "Free WhatsApp Link Generator (wa.me) | Whats91";
const seoDescription =
  "Create clickable WhatsApp links (wa.me) with pre-filled messages for business cards, email signatures, and marketing campaigns. 100% free, no signup.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "WhatsApp link generator",
      "wa.me link generator",
      "WhatsApp click to chat link",
      "free WhatsApp link",
      "WhatsApp pre-filled message link",
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
    name: "WhatsApp Link Generator",
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
  generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Free Tools", url: "/tools" },
    { name: "WhatsApp Link Generator", url: pagePath },
  ]),
];

export default function WhatsAppLinkGeneratorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={structuredData} />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <WhatsAppLinkGeneratorClient />
      </main>
      <Footer />
    </div>
  );
}
