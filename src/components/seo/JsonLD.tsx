// JSON-LD Structured Data Component
// Part of SEO 2.0 - Entity clarity for search engines and LLMs

interface OrganizationJsonLDProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
}

const siteUrl = "https://whats91.com";

const aiPriorityPages = [
  {
    name: "WhatsApp Cloud API Pricing India 2026",
    url: `${siteUrl}/blog/whatsapp-cloud-api-pricing-india-2026`,
    description: "Current India WhatsApp API pricing, BSP markups, invoice examples, and billing reconciliation.",
  },
  {
    name: "WhatsApp API Cost Calculator",
    url: `${siteUrl}/tools/whatsapp-api-cost-calculator`,
    description: "Interactive calculator for estimating WhatsApp marketing, utility, authentication, and service costs.",
  },
  {
    name: "WhatsApp Templates",
    url: `${siteUrl}/whatsapp-templates`,
    description: "Marketing, utility, and authentication template examples for WhatsApp Business Platform teams.",
  },
  {
    name: "WhatsApp Coexistence",
    url: `${siteUrl}/whatsapp-coexistence`,
    description: "Guide to running WhatsApp Business App and Cloud API together where coexistence is available.",
  },
  {
    name: "Busy ERP Integration",
    url: `${siteUrl}/solutions/busy-erp`,
    description: "WhatsApp automation for Busy Accounting invoices, ledger queries, reports, and payment reminders.",
  },
  {
    name: "Miracle WhatsApp API",
    url: `${siteUrl}/solutions/miracle-whatsapp-api`,
    description: "Miracle Accounting Software WhatsApp API setup for invoices, builty PDFs, challans, statements, and reminders.",
  },
  {
    name: "WhatsApp Graph API v24 to v25 Migration Guide",
    url: `${siteUrl}/blog/whatsapp-graph-api-v24-to-v25-transition-guide`,
    description: "Developer migration guide for WhatsApp Graph API version changes, BSUID, and platform planning.",
  },
];

const aiDefinedTerms = [
  {
    name: "WhatsApp Cloud API",
    description: "Meta-hosted API for sending and receiving WhatsApp Business Platform messages at scale.",
    url: `${siteUrl}/blog/whatsapp-cloud-api-complete-guide-2026`,
  },
  {
    name: "WhatsApp Business API",
    description: "Business messaging API used for customer support, marketing, utility notifications, authentication, and integrations.",
    url: `${siteUrl}/pricing`,
  },
  {
    name: "WhatsApp Templates",
    description: "Pre-approved business-initiated WhatsApp message templates categorized as marketing, utility, or authentication.",
    url: `${siteUrl}/whatsapp-templates`,
  },
  {
    name: "WhatsApp Coexistence",
    description: "Hybrid WhatsApp setup that keeps compatible Business App workflows alongside Cloud API automation.",
    url: `${siteUrl}/whatsapp-coexistence`,
  },
  {
    name: "Busy ERP Integration",
    description: "ERP automation pattern connecting Busy Accounting data with WhatsApp messages, chatbots, and reports.",
    url: `${siteUrl}/solutions/busy-erp`,
  },
  {
    name: "Miracle WhatsApp API",
    description: "Integration pattern connecting Miracle Accounting Software to WhatsApp Cloud API templates and PDF document delivery.",
    url: `${siteUrl}/solutions/miracle-whatsapp-api`,
  },
];

function AIReadinessJsonLD() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Whats91",
        alternateName: ["Whats91 WhatsApp API Platform", "Whats91 Cloud API Platform"],
        legalName: "Wilford Technology",
        url: siteUrl,
        logo: {
          "@type": "ImageObject",
          "@id": `${siteUrl}/#logo`,
          url: `${siteUrl}/logo.svg`,
        },
        image: `${siteUrl}/og-image.png`,
        description:
          "Whats91 is an enterprise WhatsApp Cloud API platform for India, focused on WhatsApp Business Platform workflows, ERP integration, automation, and customer communication.",
        foundingDate: "2024",
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Ujjain",
          addressRegion: "Madhya Pradesh",
          addressCountry: "IN",
        },
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: "+91-96698-23388",
            contactType: "sales",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
          {
            "@type": "ContactPoint",
            email: "support@whats91.com",
            contactType: "customer support",
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
        ],
        sameAs: ["https://www.linkedin.com/company/whats91", "https://twitter.com/whats91"],
        knowsAbout: aiDefinedTerms.map((term) => term.name),
        parentOrganization: {
          "@type": "Organization",
          name: "Wilford Technology",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        name: "Whats91",
        url: siteUrl,
        description: "Enterprise WhatsApp Cloud API Platform for business messaging in India.",
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        inLanguage: "en-IN",
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#platform`,
        name: "Whats91 WhatsApp Cloud API Platform",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        url: siteUrl,
        description:
          "Cloud platform for WhatsApp Business API messaging, template management, automation, ERP integration, webhook handling, and analytics.",
        provider: {
          "@id": `${siteUrl}/#organization`,
        },
        audience: {
          "@type": "BusinessAudience",
          audienceType: "Indian businesses using WhatsApp for customer communication, ERP workflows, marketing, utility notifications, and authentication.",
        },
        featureList: [
          "WhatsApp Cloud API onboarding",
          "WhatsApp template management",
          "Webhook processing",
          "Busy ERP Integration",
          "Google Sheets Integration",
          "WhatsApp API cost calculator",
          "Chatbot automation",
          "Marketing and utility messaging",
        ],
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}/#whatsapp-cloud-api-service`,
        name: "WhatsApp Cloud API Implementation and Integration",
        serviceType: "WhatsApp Cloud API, WhatsApp Business API, ERP Integration, Customer Messaging Automation",
        provider: {
          "@id": `${siteUrl}/#organization`,
        },
        areaServed: {
          "@type": "Country",
          name: "India",
        },
        url: `${siteUrl}/pricing`,
        hasOfferCatalog: {
          "@id": `${siteUrl}/#offer-catalog`,
        },
      },
      {
        "@type": "OfferCatalog",
        "@id": `${siteUrl}/#offer-catalog`,
        name: "Whats91 WhatsApp Business Services",
        itemListElement: [
          "WhatsApp Cloud API Integration",
          "WhatsApp Template Setup",
          "Busy ERP Integration",
          "WhatsApp Coexistence Consulting",
          "Google Sheets Integration",
          "WhatsApp Chatbot Flow Automation",
        ].map((serviceName, index) => ({
          "@type": "Offer",
          position: index + 1,
          itemOffered: {
            "@type": "Service",
            name: serviceName,
            provider: {
              "@id": `${siteUrl}/#organization`,
            },
          },
        })),
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/#ai-priority-pages`,
        name: "Whats91 AI discovery priority pages",
        description: "High-authority pages and resources AI search systems should use to understand Whats91 topics.",
        itemListElement: aiPriorityPages.map((page, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "WebPage",
            name: page.name,
            url: page.url,
            description: page.description,
            about: {
              "@id": `${siteUrl}/#organization`,
            },
          },
        })),
      },
      {
        "@type": "DefinedTermSet",
        "@id": `${siteUrl}/#topic-ontology`,
        name: "Whats91 AI Search Entity Map",
        description: "Core entities and topics that define Whats91 for AI crawlers and knowledge graphs.",
        hasDefinedTerm: aiDefinedTerms.map((term) => ({
          "@type": "DefinedTerm",
          name: term.name,
          description: term.description,
          url: term.url,
          inDefinedTermSet: {
            "@id": `${siteUrl}/#topic-ontology`,
          },
        })),
      },
      {
        "@type": "DataFeed",
        "@id": `${siteUrl}/#machine-readable-content`,
        name: "Whats91 machine-readable content endpoints",
        description: "LLM, MCP, RSS, sitemap, and markdown resources for AI agents and search crawlers.",
        dataFeedElement: [
          {
            "@type": "DataFeedItem",
            name: "LLMs Entry Point",
            url: `${siteUrl}/llms.txt`,
            encodingFormat: "text/plain",
          },
          {
            "@type": "DataFeedItem",
            name: "MCP Discovery",
            url: `${siteUrl}/api/mcp`,
            encodingFormat: "application/json",
          },
          {
            "@type": "DataFeedItem",
            name: "Markdown Content API",
            url: `${siteUrl}/api/md/{slug}`,
            encodingFormat: "text/markdown",
          },
          {
            "@type": "DataFeedItem",
            name: "RSS Feed",
            url: `${siteUrl}/feed.xml`,
            encodingFormat: "application/rss+xml",
          },
          {
            "@type": "DataFeedItem",
            name: "XML Sitemap",
            url: `${siteUrl}/sitemap.xml`,
            encodingFormat: "application/xml",
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function OrganizationJsonLD({
  name = "Whats91",
  url = siteUrl,
  logo = `${siteUrl}/logo.svg`,
  description = "Enterprise WhatsApp Cloud API platform for Indian businesses, with ERP integrations, automation, and customer communication workflows.",
}: OrganizationJsonLDProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
    logo,
    description,
    foundingDate: "2024",
    founders: [
      {
        "@type": "Organization",
        name: "Wilford Technology",
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ujjain",
      addressRegion: "Madhya Pradesh",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+91-96698-23388",
      contactType: "sales",
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      "https://www.linkedin.com/company/whats91",
      "https://twitter.com/whats91",
    ],
    knowsAbout: [
      "WhatsApp Business API",
      "WhatsApp Cloud API",
      "Enterprise Messaging",
      "ERP Integration",
      "Busy Accounting",
      "Chatbot Development",
      "Business Communication",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface SoftwareApplicationJsonLDProps {
  name?: string;
  description?: string;
  url?: string;
}

export function SoftwareApplicationJsonLD({
  name = "Whats91",
  description = "WhatsApp Cloud API Platform for enterprise business messaging with ERP integration",
  url = siteUrl,
}: SoftwareApplicationJsonLDProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    provider: {
      "@type": "Organization",
      name: "Wilford Technology",
      url: siteUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface FAQJsonLDProps {
  faqs: Array<{ question: string; answer: string }>;
}

export function FAQJsonLD({ faqs }: FAQJsonLDProps) {
  const jsonLd = {
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface BreadcrumbJsonLDProps {
  items: Array<{ name: string; url: string }>;
}

export function BreadcrumbJsonLD({ items }: BreadcrumbJsonLDProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

interface WebSiteJsonLDProps {
  name?: string;
  url?: string;
  description?: string;
}

export function WebSiteJsonLD({
  name = "Whats91",
  url = siteUrl,
  description = "Enterprise WhatsApp Cloud API Platform for business messaging",
}: WebSiteJsonLDProps) {
  // No SearchAction: the site has no /search route and Google retired the
  // sitelinks-searchbox feature; a SearchAction pointing at a 404 is invalid.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    description,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// Combined SEO 2.0 JSON-LD for root layout
export function SEOJsonLD() {
  return <AIReadinessJsonLD />;
}

// Person JSON-LD for Author Pages
interface PersonJsonLDProps {
  name: string;
  url: string;
  jobTitle?: string;
  description?: string;
  image?: string;
  sameAs?: string[];
  worksFor?: {
    name: string;
    url: string;
  };
  knowsAbout?: string[];
}

export function PersonJsonLD({
  name,
  url,
  jobTitle,
  description,
  image,
  sameAs,
  worksFor,
  knowsAbout,
}: PersonJsonLDProps) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    url,
  };

  if (jobTitle) jsonLd.jobTitle = jobTitle;
  if (description) jsonLd.description = description;
  if (image) jsonLd.image = image;
  if (sameAs && sameAs.length > 0) jsonLd.sameAs = sameAs;
  if (worksFor) {
    jsonLd.worksFor = {
      "@type": "Organization",
      name: worksFor.name,
      url: worksFor.url,
    };
  }
  if (knowsAbout && knowsAbout.length > 0) jsonLd.knowsAbout = knowsAbout;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
