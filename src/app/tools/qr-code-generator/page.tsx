import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { JsonLd } from "@/lib/seo/JsonLd";
import { generateBreadcrumbSchema, generatePageMetadata, siteConfig } from "@/lib/seo/config";
import { QRCodeGeneratorClient } from "./QRCodeGeneratorClient";

const pagePath = "/tools/qr-code-generator";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "Free QR Code Generator | URL, WhatsApp, WiFi, Email | Whats91";
const seoDescription =
  "Generate high-resolution QR codes for URLs, WhatsApp links, email, phone numbers, and WiFi. Download as PNG without watermarks — 100% free, no signup.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: [
      "QR code generator",
      "free QR code generator",
      "WhatsApp QR code",
      "WiFi QR code generator",
      "URL QR code",
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
    name: "QR Code Generator",
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
    { name: "QR Code Generator", url: pagePath },
  ]),
];

export default function QRCodeGeneratorPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <JsonLd data={structuredData} />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <QRCodeGeneratorClient />
      </main>
      <Footer />
    </div>
  );
}
