import { Metadata } from "next";
import { siteConfig } from "@/lib/seo/config";

export const metadata: Metadata = {
  title: `WhatsApp Campaign to Google Sheets Integration | ${siteConfig.name}`,
  description:
    "Automatically sync WhatsApp campaign responses to Google Sheets. Capture button replies like Interested, Not Interested and push data in real-time for seamless automation.",
  keywords: [
    "WhatsApp Google Sheets integration",
    "WhatsApp campaign responses",
    "WhatsApp button replies to sheets",
    "WhatsApp automation Google Sheets",
    "campaign response tracking",
    "WhatsApp CRM integration",
    "real-time data sync",
    "WhatsApp webhook Google Sheets",
    "campaign analytics automation",
    "lead capture WhatsApp",
  ],
  openGraph: {
    title: "WhatsApp Campaign to Google Sheets Integration | Whats91",
    description:
      "Automatically sync WhatsApp campaign responses to Google Sheets. Capture button replies and push data in real-time for seamless automation.",
    url: `${siteConfig.url}/google-sheets-integration`,
    images: [
      {
        url: `${siteConfig.url}/og-google-sheets.png`,
        width: 1200,
        height: 630,
        alt: "WhatsApp Campaign to Google Sheets Integration",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp Campaign to Google Sheets Integration | Whats91",
    description:
      "Automatically sync WhatsApp campaign responses to Google Sheets. Capture button replies in real-time.",
    images: [`${siteConfig.url}/og-google-sheets.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/google-sheets-integration`,
  },
};

export default function GoogleSheetsIntegrationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
