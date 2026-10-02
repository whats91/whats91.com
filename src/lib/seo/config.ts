import type { Metadata } from "next";
import { contentDates } from "@/lib/content/dates";

// Base site configuration
export const siteConfig = {
  name: "Whats91",
  description: "Enterprise WhatsApp Cloud API platform for Indian businesses",
  url: "https://whats91.com",
  ogImage: "https://whats91.com/og-image.png",
  twitterHandle: "@whats91",
  locale: "en_IN",
  language: "en",
  timezone: "Asia/Kolkata",
  author: "Whats91 Team",
  publisher: "Wilford Technology",
  email: "support@whats91.com",
  phone: "+919669823388",
} as const;

// Site navigation for breadcrumbs
export const siteNavigation = {
  main: [
    { name: "Home", href: "/" },
    { name: "Solutions", href: "/#solutions" },
    { name: "Busy ERP Integration", href: "/solutions/busy-erp" },
    { name: "Terms", href: "/terms" },
    { name: "Privacy", href: "/privacy" },
  ],
} as const;

// Keywords by category for SEO
export const seoKeywords = {
  primary: [
    "WhatsApp Cloud API",
    "WhatsApp Business API",
    "WhatsApp Cloud API Provider",
    "Enterprise WhatsApp",
    "WhatsApp API India",
  ],
  busy: [
    "Busy Accounting WhatsApp Integration",
    "Busy ERP WhatsApp",
    "Busy Accounting Automation",
    "WhatsApp Invoice Automation",
    "Busy Ledger Bot",
    "WhatsApp ERP Integration",
    "Accounting Software WhatsApp",
  ],
  features: [
    "WhatsApp Chatbot",
    "WhatsApp Automation",
    "WhatsApp Marketing",
    "WhatsApp CRM Integration",
    "WhatsApp Notifications",
    "Bulk WhatsApp Messaging",
  ],
  industry: [
    "WhatsApp for Business India",
    "Business Communication Platform",
    "Enterprise Messaging Solution",
    "WhatsApp Business Platform",
    "WhatsApp Cloud API Provider",
  ],
} as const;

// Page-specific SEO configurations
export const pageSeoConfigs = {
  home: {
    title: "WhatsApp Cloud API Platform for Indian Businesses - Whats91",
    description: "Connect WhatsApp Cloud API with ERP workflows, templates, webhooks, chatbots, automation, and consent-based customer messaging through Whats91.",
    keywords: [...seoKeywords.primary, ...seoKeywords.features, ...seoKeywords.industry],
    path: "/",
  },
  busyErp: {
    title: "Busy Accounting WhatsApp Workflows | Whats91",
    description: "Explore Busy Accounting messaging workflows, invoice documents and ledger requests. Confirm interface, account, permission and setup conditions before a pilot.",
    keywords: [...seoKeywords.busy, ...seoKeywords.primary],
    path: "/solutions/busy-erp",
  },
  terms: {
    title: "Terms and Conditions | Whats91 - WhatsApp Cloud API Platform",
    description: "Read the terms and conditions for using Whats91's WhatsApp Cloud API platform. Understand your rights, obligations, and our service policies.",
    keywords: ["Whats91 terms", "WhatsApp API terms", "service agreement", "usage policy"],
    path: "/terms",
  },
  privacy: {
    title: "Privacy Policy | Whats91 - WhatsApp Cloud API Platform",
    description: "Read the Whats91 privacy notice for processing roles, information uses, integrations, retention limits and ways to request help with your data.",
    keywords: ["Whats91 privacy", "data protection", "privacy policy", "WhatsApp data security"],
    path: "/privacy",
  },
} as const;

// Helper function to generate metadata
export function generatePageMetadata(config: {
  title: string;
  description: string;
  keywords?: string[];
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  authorPublicUse?: "approved";
}): Metadata {
  const {
    title,
    description,
    keywords,
    path,
    image = siteConfig.ogImage,
    type = "website",
    publishedTime,
    modifiedTime,
    author,
  } = config;

  const url = `${siteConfig.url}${path}`;
  const dates = contentDates({ publishedAt: publishedTime, updatedAt: modifiedTime });

  return {
    title,
    description,
    keywords: keywords?.join(", "),
    authors: author && config.authorPublicUse === "approved" ? [{ name: author }] : [],

    publisher: siteConfig.name,
    
    // Alternates for canonical URLs
    alternates: {
      canonical: url,
    },
    
    // Open Graph
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: type as "website" | "article",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(type === "article" && dates.published && { publishedTime: dates.published }),
      ...(type === "article" && dates.modified && { modifiedTime: dates.modified }),
    },
    
    // Twitter
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    
    // Robots directives
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    
    // Additional metadata
    category: "Technology",
    classification: "Business Communication Platform",
  };
}

// Generate JSON-LD structured data
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org", "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`, name: siteConfig.name,
    url: siteConfig.url, logo: `${siteConfig.url}/logo.svg`,
  };
}

export function generateWebSiteSchema() {
  return {
    "@context": "https://schema.org", "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`, name: siteConfig.name,
    url: siteConfig.url, inLanguage: siteConfig.language,
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function generateSoftwareApplicationSchema(config: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: config.name,
    description: config.description,
    url: config.url,
    applicationCategory: config.applicationCategory || "BusinessApplication",
    ...(config.operatingSystem && { operatingSystem: config.operatingSystem }),
    ...(config.offers && { offers: {
      "@type": "Offer",
      price: config.offers.price,
      priceCurrency: config.offers.priceCurrency,
    } }),
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteConfig.url}${item.url}`,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateServiceSchema(config: {
  name: string;
  description: string;
  url: string;
  provider?: string;
  areaServed?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: config.name,
    description: config.description,
    url: config.url,
    provider: config.provider ? { "@type": "Organization", name: config.provider } : { "@id": `${siteConfig.url}/#organization` },
    ...(config.areaServed && { areaServed: { "@type": "Country", name: config.areaServed } }),
    serviceType: "Business Communication Platform",
  };
}
