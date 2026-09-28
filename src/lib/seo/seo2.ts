/**
 * SEO 2.0 Schema Definitions for Whats91
 * Optimized for AI agents, LLMs, and Generative Engine Optimization
 *
 * This module provides:
 * - Entity ontology definitions
 * - AI-optimized structured data
 * - Author authority signals
 * - Content attribution schemas
 */

import { siteConfig } from "./config";

// ============================================
// ENTITY DEFINITIONS
// ============================================

export const entityDefinitions = {
  organization: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: "Whats91 WhatsApp API Platform",
    description: siteConfig.description,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: `${siteConfig.url}/logo.svg`,
      width: 200,
      height: 60,
    },
    image: `${siteConfig.url}/og-image.png`,
    foundingDate: "2024",
    founders: [
      {
        "@type": "Organization",
        name: siteConfig.publisher,
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressLocality: "India",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.phone,
      contactType: "customer support",
      email: siteConfig.email,
      availableLanguage: ["English", "Hindi"],
    },
    sameAs: [
      `https://twitter.com/${siteConfig.twitterHandle.replace("@", "")}`,
      "https://www.linkedin.com/company/whats91",
    ],
    // Entity relationships
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.publisher,
    },
    // Business credentials
    knowsAbout: [
      "WhatsApp Cloud API",
      "WhatsApp Business API",
      "Enterprise Messaging",
      "Business Communication",
      "ERP Integration",
      "Busy Accounting Software",
      "Chatbot Development",
      "Marketing Automation",
    ],
  },

  website: {
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    inLanguage: siteConfig.language,
  },

  service: {
    "@type": "Service",
    "@id": `${siteConfig.url}/#service`,
    name: "WhatsApp Cloud API Platform",
    description: "Enterprise WhatsApp messaging platform with Cloud API integration, ERP connectivity, and automation solutions.",
    provider: {
      "@id": `${siteConfig.url}/#organization`,
    },
    serviceType: "Business Communication Platform",
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "WhatsApp Business Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "WhatsApp Cloud API Integration",
            description: "Official Meta Cloud API integration for enterprise messaging",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Busy ERP Integration",
            description: "WhatsApp integration with Busy Accounting Software",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "WhatsApp Chatbot",
            description: "AI-powered WhatsApp chatbot for customer support",
          },
        },
      ],
    },
  },
};

// ============================================
// AUTHOR SCHEMA FOR E-E-A-T
// ============================================

export function generateAuthorSchema(author: {
  name: string;
  role?: string;
  bio?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}) {
  return {
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    worksFor: {
      "@id": `${siteConfig.url}/#organization`,
    },
    knowsAbout: [
      "WhatsApp Business API",
      "Enterprise Messaging",
      "Business Automation",
    ],
    sameAs: [
      author.social?.twitter && `https://twitter.com/${author.social.twitter.replace("@", "")}`,
      author.social?.linkedin,
    ].filter(Boolean),
  };
}

// ============================================
// ARTICLE SCHEMA FOR BLOG POSTS
// ============================================

export function generateArticleSchema(config: {
  title: string;
  description: string;
  url: string;
  publishedTime: string;
  modifiedTime?: string;
  author: {
    name: string;
    role?: string;
    bio?: string;
    social?: { twitter?: string; linkedin?: string };
  };
  image?: string;
  keywords?: string[];
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": config.url,
    headline: config.title,
    description: config.description,
    image: config.image || siteConfig.ogImage,
    datePublished: config.publishedTime,
    dateModified: config.modifiedTime || config.publishedTime,
    author: {
      "@type": "Person",
      name: config.author.name,
      jobTitle: config.author.role,
      worksFor: {
        "@id": `${siteConfig.url}/#organization`,
      },
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": config.url,
    },
    inLanguage: siteConfig.language,
    articleSection: config.category,
    keywords: config.keywords?.join(", "),
    // AI-optimized fields
    wordCount: config.description.split(" ").length * 10, // Estimate
    isAccessibleForFree: true,
  };
}

// ============================================
// HOW-TO SCHEMA FOR TUTORIALS
// ============================================

export function generateHowToSchema(config: {
  name: string;
  description: string;
  steps: { name: string; text: string; image?: string }[];
  totalTime?: string;
  estimatedCost?: { currency: string; value: string };
  tools?: string[];
  supplies?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: config.name,
    description: config.description,
    totalTime: config.totalTime,
    estimatedCost: config.estimatedCost && {
      "@type": "MonetaryAmount",
      currency: config.estimatedCost.currency,
      value: config.estimatedCost.value,
    },
    tool: config.tools?.map((tool) => ({
      "@type": "HowToTool",
      name: tool,
    })),
    supply: config.supplies?.map((supply) => ({
      "@type": "HowToSupply",
      name: supply,
    })),
    step: config.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
    })),
  };
}

// ============================================
// SOFTWARE APPLICATION SCHEMA
// ============================================

export function generateSoftwareAppSchema(config: {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
  features?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: config.name,
    description: config.description,
    url: config.url,
    applicationCategory: config.applicationCategory || "BusinessApplication",
    operatingSystem: config.operatingSystem || "Web, Cloud API",
    offers: {
      "@type": "Offer",
      price: config.offers?.price || "0",
      priceCurrency: config.offers?.priceCurrency || "INR",
    },
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    featureList: config.features?.join(", "),
    // AI-optimized
    softwareVersion: "2.0",
    releaseNotes: "Enterprise WhatsApp Cloud API Platform",
  };
}

// ============================================
// PRODUCT SCHEMA FOR SERVICES
// ============================================

export function generateProductSchema(config: {
  name: string;
  description: string;
  url: string;
  image?: string;
  brand?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    priceValidUntil?: string;
  };
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: config.name,
    description: config.description,
    image: config.image || siteConfig.ogImage,
    brand: {
      "@type": "Brand",
      name: config.brand || siteConfig.name,
    },
    offers: {
      "@type": "Offer",
      url: config.url,
      priceCurrency: config.offers?.priceCurrency || "INR",
      price: config.offers?.price || "0",
      priceValidUntil: config.offers?.priceValidUntil || "2026-12-31",
      availability: "https://schema.org/InStock",
      seller: {
        "@id": `${siteConfig.url}/#organization`,
      },
    },
    aggregateRating: config.aggregateRating && {
      "@type": "AggregateRating",
      ratingValue: config.aggregateRating.ratingValue,
      reviewCount: config.aggregateRating.reviewCount,
    },
  };
}

// ============================================
// SPEAKABLE SPECIFICATION FOR VOICE SEARCH
// ============================================

export function generateSpeakableSchema(config: {
  url: string;
  cssSelector?: string[];
  xpath?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SpeakableSpecification",
    url: config.url,
    cssSelector: config.cssSelector || [".speakable-content", "h1", ".hero-description"],
    xpath: config.xpath || [
      "/html/body/main/article/header/h1",
      "/html/body/main/article/section[@class='speakable-content']",
    ],
  };
}

// ============================================
// COMBINED SCHEMA FOR PAGES
// ============================================

export function generatePageSchemas(config: {
  type: "home" | "service" | "blog" | "tool" | "landing";
  title: string;
  description: string;
  url: string;
  author?: { name: string; role?: string; bio?: string; social?: { twitter?: string; linkedin?: string } };
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
  keywords?: string[];
  category?: string;
}) {
  const schemas: object[] = [
    entityDefinitions.organization,
    entityDefinitions.website,
  ];

  switch (config.type) {
    case "home":
      schemas.push(entityDefinitions.service);
      break;
    case "service":
      schemas.push(entityDefinitions.service);
      break;
    case "blog":
      if (config.author) {
        schemas.push(
          generateArticleSchema({
            title: config.title,
            description: config.description,
            url: config.url,
            publishedTime: config.publishedTime || new Date().toISOString(),
            modifiedTime: config.modifiedTime,
            author: config.author,
            image: config.image,
            keywords: config.keywords,
            category: config.category,
          })
        );
      }
      break;
    case "tool":
      schemas.push(
        generateSoftwareAppSchema({
          name: config.title,
          description: config.description,
          url: config.url,
          applicationCategory: "UtilityApplication",
          offers: { price: "0", priceCurrency: "INR" },
        })
      );
      break;
    case "landing":
      schemas.push(entityDefinitions.service);
      break;
  }

  return schemas;
}
