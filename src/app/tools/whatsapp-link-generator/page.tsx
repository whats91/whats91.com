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
        <section aria-label="Local tool guidance" className="max-w-[1200px] mx-auto px-4 pt-6 text-sm space-y-3">
          <p>Link generation and copying run in your browser. QR page query URLs can contain a supplied link, phone number and message; page requests can include that URL. Opening or sharing a destination transfers its content. Avoid sensitive input and see our <a className="text-primary underline" href="/privacy">privacy policy</a> for page requests and site preferences.</p>
          <p>Interactive controls require JavaScript and local scripts. If they do not respond, reload with those enabled; keep your input separately.</p>
          <noscript><p>Generating, copying and downloading require JavaScript and local scripts. Keep your input separately and enable them to use this tool; no generated output is available without them.</p></noscript>
        </section>
        <WhatsAppLinkGeneratorClient />
      </main>
      <Footer />
    </div>
  );
}
