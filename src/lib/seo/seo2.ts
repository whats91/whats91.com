import { contentDates } from "@/lib/content/dates";
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

import { siteConfig, generateOrganizationSchema, generateWebSiteSchema } from "./config";

// ============================================
// ENTITY DEFINITIONS
// ============================================

export const entityDefinitions = {
  organization: generateOrganizationSchema(),
  website: generateWebSiteSchema(),
};

// ============================================
// AUTHOR SCHEMA FOR E-E-A-T
// ============================================

export function generateAuthorSchema(author: {
  publicUse?: "approved";
  name: string;
  role?: string;
  bio?: string;
  social?: {
    twitter?: string;
    linkedin?: string;
  };
}) {
  if (author.publicUse !== "approved") return undefined;
  return {
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
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
  publishedTime?: string;
  modifiedTime?: string;
  author: {
    publicUse?: "approved";
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
    ...(contentDates({ publishedAt: config.publishedTime, updatedAt: config.modifiedTime }).published && { datePublished: contentDates({ publishedAt: config.publishedTime, updatedAt: config.modifiedTime }).published }),
    ...(contentDates({ publishedAt: config.publishedTime, updatedAt: config.modifiedTime }).modified && { dateModified: contentDates({ publishedAt: config.publishedTime, updatedAt: config.modifiedTime }).modified }),
    ...(config.author.publicUse === "approved" ? { author: {
      "@type": "Person", name: config.author.name, jobTitle: config.author.role,
    } } : {}),
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
    ...(config.operatingSystem && { operatingSystem: config.operatingSystem }),
    offers: config.offers ? {
      "@type": "Offer",
      price: config.offers.price,
      priceCurrency: config.offers.priceCurrency,
    } : undefined,
    publisher: {
      "@id": `${siteConfig.url}/#organization`,
    },
    featureList: config.features?.join(", "),
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
    url: config.url,
    name: config.name,
    description: config.description,
    image: config.image || siteConfig.ogImage,
    brand: {
      "@type": "Brand",
      name: config.brand || siteConfig.name,
    },
    offers: config.offers ? {
      "@type": "Offer",
      url: config.url,
      priceCurrency: config.offers.priceCurrency,
      price: config.offers.price,
      priceValidUntil: config.offers.priceValidUntil,
      seller: {
        "@id": `${siteConfig.url}/#organization`,
      },
    } : undefined,
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
    cssSelector: config.cssSelector,
    xpath: config.xpath,
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
  author?: { publicUse?: "approved"; name: string; role?: string; bio?: string; social?: { twitter?: string; linkedin?: string } };
  publishedTime?: string;
  modifiedTime?: string;
  image?: string;
  keywords?: string[];
  category?: string;
}) {
  const schemas: object[] = [{
    "@context": "https://schema.org", "@type": "WebPage", "@id": config.url,
    name: config.title, description: config.description, url: config.url,
    isPartOf: { "@id": `${siteConfig.url}/#website` },
  }];

  switch (config.type) {
    case "home":

      break;
    case "service":

      break;
    case "blog":
      if (config.author) {
        schemas.push(
          generateArticleSchema({
            title: config.title,
            description: config.description,
            url: config.url,
            publishedTime: config.publishedTime,
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
        })
      );
      break;
    case "landing":

      break;
  }

  return schemas;
}
