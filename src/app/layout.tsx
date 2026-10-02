import type { Metadata } from "next";
import "./globals.css";
import { CookieConsent } from "@/components/landing/CookieConsent";
import { SEOJsonLD } from "@/components/seo/JsonLD";

export const metadata: Metadata = {
  metadataBase: new URL("https://whats91.com"),
  title: "Whats91 | WhatsApp Cloud API Platform for ERP & Automation",
  description: "Whats91 is a WhatsApp Cloud API platform for Indian businesses using ERP, Busy Accounting, chatbots, automation, templates, webhooks, and consent-based customer messaging.",
  keywords: ["WhatsApp Business API", "WhatsApp Cloud API", "Busy Accounting", "WhatsApp Integration", "Enterprise Messaging", "WhatsApp Business Platform", "India", "Chatbot", "Webhook", "CRM Integration"],
  icons: {
    icon: "/logo.svg",
  },
  // No `alternates.canonical` here: a canonical set on the root layout is
  // inherited by every page that lacks its own metadata, which made dozens of
  // pages canonicalize to the homepage. Each page declares its own canonical.
  openGraph: {
    title: "Whats91 | WhatsApp Cloud API Platform",
    description: "Enterprise WhatsApp Cloud API platform for ERP, Busy Accounting, AI automation, templates, webhooks, and customer messaging in India.",
    url: "https://whats91.com",
    siteName: "Whats91",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Whats91 — WhatsApp Cloud API Platform" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Whats91 | WhatsApp Cloud API Platform",
    description: "WhatsApp Cloud API platform for ERP, Busy Accounting, AI automation, and customer messaging in India.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <SEOJsonLD />
        <link rel="alternate" type="application/rss+xml" title="Whats91 Blog RSS Feed" href="/feed.xml" />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
