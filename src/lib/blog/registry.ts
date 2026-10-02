import { cloudGuide, migrationGuide, indiaPricingGuide } from "./billing-guides";
import { octoberPricingGuide, octoberPricingImages } from "./october-pricing-guide";
import { sheetsGuide, benefitsGuide, guideMarkdown } from "./erp-guides";
import { rolloutGuides } from "./rollout-guides";
import { contentDates } from "@/lib/content/dates";
import type { EditorialRecord } from "@/lib/content/review";
/**
 * Blog Post Registry - Lightweight metadata for blog listing
 * 
 * The registry joins canonical guide content with preserved metadata/history.
 * Listings, route metadata and machine-readable consumers share this record.
 * 
 * When adding a new blog post:
 * 1. Create /src/app/blog/your-post-slug/page.tsx with full content
 * 2. Add metadata entry to this registry
 */

export interface BlogPostMeta {
  /** Internal provenance; omitted from public metadata. No human review is inferred. */
  editorial?: EditorialRecord;
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  authorId: string;
  publishedAt?: string;
  updatedAt?: string;
  readingTime: number;
  coverImage?: string;
  thumbnailImage?: string;
  coverAlt?: string;
  coverCaption?: string;
  isFeatured: boolean;
  isDraft?: boolean;
  /** Temporary evidence hold; route and qualified machine-readable explanation remain available. */
  indexHold?: boolean;
  content?: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

// All posts metadata - lightweight for listing page
export const blogPosts: BlogPostMeta[] = [
  {
    id: "11",
    editorial: { stage: "pending-human-review", evidenceCheckedAt: "2026-09-29", mediaCapturedAt: "2026-09-29", history: [] },
    slug: octoberPricingGuide.slug,
    title: octoberPricingGuide.title,
    excerpt: octoberPricingGuide.description,
    category: "WhatsApp API",
    tags: ["WhatsApp API", "Pricing", "India", "Meta rates", "2026"],
    authorId: "1",
    readingTime: 11,
    isFeatured: true,
    coverImage: octoberPricingImages.cover.src,
    thumbnailImage: "/images/blog/meta-whatsapp-pricing-october-2026/listing-thumbnail-v3-2026-10.webp",
    coverAlt: octoberPricingImages.cover.alt,
    coverCaption: octoberPricingImages.cover.caption,
    content: guideMarkdown(octoberPricingGuide),
    seo: {
      title: "Meta WhatsApp Pricing from 1 October 2026: India Rates & Examples",
      description: octoberPricingGuide.description,
      keywords: ["Meta WhatsApp pricing October 2026", "WhatsApp API pricing India 2026", "India WhatsApp message rates INR", "Meta Service message free tier", "WhatsApp Utility pricing 24 hour window", "WhatsApp Authentication international pricing", "Whats91 Meta charges no markup"],
    },
  },
  {
    id: "10",
    editorial: { stage: "pending-human-review", history: [] },
    slug: "whatsapp-cloud-api-pricing-india-2026",
    title: indiaPricingGuide.title,
    excerpt: indiaPricingGuide.description,
    coverImage: indiaPricingGuide.cover?.src,
    thumbnailImage: "/images/blog/whatsapp-cloud-api-pricing-india-2026/listing-thumbnail-v3-2026-10.webp",
    coverAlt: indiaPricingGuide.cover?.alt,
    coverCaption: indiaPricingGuide.cover?.caption,
    category: "WhatsApp API",
    tags: ["WhatsApp API", "Pricing", "India", "Cloud API", "2026"],
    authorId: "1",
    publishedAt: "2026-05-22",
    updatedAt: "2026-05-22",
    readingTime: 8,
    isFeatured: true,
    content: guideMarkdown(indiaPricingGuide),
    seo: {
      title: indiaPricingGuide.title,
      description: indiaPricingGuide.description,
      keywords: ["WhatsApp Cloud API pricing India", "WhatsApp API cost India 2026", "Meta per message rates INR", "WhatsApp marketing message price India", "WhatsApp utility message price India", "WhatsApp OTP cost India", "WhatsApp BSP markup", "WhatsApp utility vs marketing templates", "WhatsApp template categorization", "WhatsApp accepted but no webhook billing"],
    },
  },
  {
    id: "9",
    editorial: { stage: "pending-human-review", history: [] },
    slug: "whatsapp-cloud-api-restrictions-coexistence-framework-2026",
    title: rolloutGuides[0].title,
    excerpt: rolloutGuides[0].description,
    coverImage: rolloutGuides[0].cover?.src,
    thumbnailImage: "/images/blog/whatsapp-cloud-api-restrictions-coexistence-framework-2026/listing-thumbnail-v3-2026-10.webp",
    coverAlt: rolloutGuides[0].cover?.alt,
    coverCaption: rolloutGuides[0].cover?.caption,
    category: "WhatsApp API",
    tags: ["WhatsApp API", "Cloud API", "Coexistence", "Restrictions", "2026"],
    authorId: "1",
    publishedAt: "2026-03-20",
    readingTime: 10,
    isFeatured: true,
    indexHold: rolloutGuides[0].indexHold,
    content: guideMarkdown(rolloutGuides[0]),
    seo: {
      title: rolloutGuides[0].title,
      description: rolloutGuides[0].description,
      keywords: ["WhatsApp Cloud API restrictions", "WhatsApp Coexistence Mode", "WhatsApp 24-hour restriction", "WhatsApp Quality Rating", "WhatsApp messaging limits 2026", "WhatsApp AI policy", "WhatsApp portfolio pacing"],
    },
  },
  {
    id: "8",
    editorial: { stage: "pending-human-review", history: [] },
    slug: "busy-erp-google-sheets-integration-complete-guide",
    title: sheetsGuide.title,
    excerpt: sheetsGuide.description,
    coverImage: sheetsGuide.cover?.src,
    thumbnailImage: "/images/blog/busy-erp-google-sheets-integration-complete-guide/listing-thumbnail-v3-2026-10.webp",
    coverAlt: sheetsGuide.cover?.alt,
    coverCaption: sheetsGuide.cover?.caption,
    content: guideMarkdown(sheetsGuide),
    category: "ERP Integration",
    tags: ["Busy ERP", "Google Sheets", "Integration", "Automation", "WhatsApp"],
    authorId: "1",
    publishedAt: "2026-03-15",
    readingTime: 12,
    isFeatured: true,
    seo: {
      title: sheetsGuide.title,
      description: sheetsGuide.description,
      keywords: ["Busy ERP Google Sheets integration", "Busy Accounting Google Sheets", "Busy ERP data export", "Busy ERP automation", "Busy WhatsApp integration", "Google Sheets ERP dashboard"],
    },
  },
  {
    id: "7",
    editorial: { stage: "pending-human-review", history: [] },
    slug: "whatsapp-graph-api-v24-to-v25-transition-guide",
    title: rolloutGuides[1].title,
    excerpt: rolloutGuides[1].description,
    coverImage: rolloutGuides[1].cover?.src,
    thumbnailImage: "/images/blog/whatsapp-graph-api-v24-to-v25-transition-guide/listing-thumbnail-v3-2026-10.webp",
    coverAlt: rolloutGuides[1].cover?.alt,
    coverCaption: rolloutGuides[1].cover?.caption,
    category: "WhatsApp API",
    tags: ["Graph API", "Cloud API", "BSUID", "Migration", "2026", "Developer"],
    authorId: "1",
    publishedAt: "2026-03-13",
    readingTime: 8,
    isFeatured: true,
    indexHold: rolloutGuides[1].indexHold,
    content: guideMarkdown(rolloutGuides[1]),
    seo: {
      title: rolloutGuides[1].title,
      description: rolloutGuides[1].description,
      keywords: ["WhatsApp Graph API v25", "BSUID migration", "WhatsApp Cloud API 2026", "account messaging limits", "WhatsApp API pricing", "Graph API migration guide"],
    },
  },
  {
    id: "6",
    editorial: { stage: "pending-human-review", history: [] },
    slug: "whatsapp-username-system-2026-complete-guide",
    title: rolloutGuides[3].title,
    excerpt: rolloutGuides[3].description,
    coverImage: rolloutGuides[3].cover?.src,
    thumbnailImage: "/images/blog/whatsapp-username-system-2026-complete-guide/listing-thumbnail-v3-2026-10.webp",
    coverAlt: rolloutGuides[3].cover?.alt,
    coverCaption: rolloutGuides[3].cover?.caption,
    category: "WhatsApp API",
    tags: ["Username System", "BSUID", "Cloud API", "Privacy", "2026", "Developer"],
    authorId: "1",
    publishedAt: "2026-03-06",
    readingTime: 7,
    isFeatured: true,
    indexHold: rolloutGuides[3].indexHold,
    content: guideMarkdown(rolloutGuides[3]),
    seo: {
      title: rolloutGuides[3].title,
      description: rolloutGuides[3].description,
      keywords: ["WhatsApp username 2026", "BSUID WhatsApp", "WhatsApp username PIN", "WhatsApp Cloud API migration", "WhatsApp identity system", "WhatsApp phone number alternative"],
    },
  },
  {
    id: "5",
    editorial: { stage: "pending-human-review", history: [] },
    slug: "whatsapp-plus-launch-2026-premium-subscription-guide",
    title: rolloutGuides[2].title,
    excerpt: rolloutGuides[2].description,
    coverImage: rolloutGuides[2].cover?.src,
    thumbnailImage: "/images/blog/whatsapp-plus-launch-2026-premium-subscription-guide/listing-thumbnail-v3-2026-10.webp",
    coverAlt: rolloutGuides[2].cover?.alt,
    coverCaption: rolloutGuides[2].cover?.caption,
    category: "Industry Insights",
    tags: ["WhatsApp+", "Premium Subscription", "Meta", "2026", "Features", "Pricing"],
    authorId: "1",
    publishedAt: "2026-03-06",
    readingTime: 6,
    isFeatured: true,
    indexHold: rolloutGuides[2].indexHold,
    content: guideMarkdown(rolloutGuides[2]),
    seo: {
      title: rolloutGuides[2].title,
      description: rolloutGuides[2].description,
      keywords: ["WhatsApp+ subscription", "WhatsApp premium 2026", "WhatsApp+ features", "WhatsApp+ pricing India", "WhatsApp themes", "Meta AI WhatsApp"],
    },
  },
  {
    id: "4",
    editorial: { stage: "pending-human-review", history: [] },
    slug: "whatsapp-web-6-hour-logout-unofficial-api-migration-guide",
    content: guideMarkdown(migrationGuide),
    title: migrationGuide.title,
    excerpt: migrationGuide.description,
    coverImage: migrationGuide.cover?.src,
    thumbnailImage: "/images/blog/whatsapp-web-6-hour-logout-unofficial-api-migration-guide/listing-thumbnail-v3-2026-10.webp",
    coverAlt: migrationGuide.cover?.alt,
    coverCaption: migrationGuide.cover?.caption,
    category: "WhatsApp API",
    tags: ["WhatsApp API", "Cloud API", "Unofficial API", "Migration", "6-Hour Rule", "Official API"],
    authorId: "1",
    publishedAt: "2026-02-28",
    readingTime: 9,
    isFeatured: true,
    seo: {
      title: migrationGuide.title,
      description: migrationGuide.description,
      keywords: ["WhatsApp unofficial API", "WhatsApp Cloud API migration", "6-hour logout rule impact", "official WhatsApp API"],
    },
  },
  {
    id: "3",
    editorial: { stage: "pending-human-review", history: [] },
    slug: "whatsapp-web-6-hour-logout-rule-india-2026",
    title: rolloutGuides[4].title,
    excerpt: rolloutGuides[4].description,
    coverImage: rolloutGuides[4].cover?.src,
    thumbnailImage: "/images/blog/whatsapp-web-6-hour-logout-rule-india-2026/listing-thumbnail-v3-2026-10.webp",
    coverAlt: rolloutGuides[4].cover?.alt,
    coverCaption: rolloutGuides[4].cover?.caption,
    category: "Industry Insights",
    tags: ["WhatsApp Web", "Compliance", "Security", "India", "Best Practices"],
    authorId: "1",
    publishedAt: "2026-02-26",
    readingTime: 6,
    isFeatured: true,
    indexHold: rolloutGuides[4].indexHold,
    content: guideMarkdown(rolloutGuides[4]),
    seo: {
      title: rolloutGuides[4].title,
      description: rolloutGuides[4].description,
      keywords: ["WhatsApp Web logout rule India", "DoT 6-hour logout", "WhatsApp SIM binding India"],
    },
  },
  {
    id: "1",
    editorial: { stage: "pending-human-review", history: [] },
    slug: "whatsapp-cloud-api-complete-guide-2026",
    content: guideMarkdown(cloudGuide),
    title: cloudGuide.title,
    excerpt: cloudGuide.description,
    coverImage: cloudGuide.cover?.src,
    thumbnailImage: "/images/blog/whatsapp-cloud-api-complete-guide-2026/listing-thumbnail-v3-2026-10.webp",
    coverAlt: cloudGuide.cover?.alt,
    coverCaption: cloudGuide.cover?.caption,
    category: "WhatsApp API",
    tags: ["WhatsApp Cloud API", "Enterprise", "Best Practices", "India"],
    authorId: "1",
    publishedAt: "2026-01-15",
    readingTime: 9,
    isFeatured: true,
    seo: {
      title: cloudGuide.title,
      description: cloudGuide.description,
      keywords: ["WhatsApp Cloud API guide", "WhatsApp Business API setup", "WhatsApp API pricing 2026"],
    },
  },
  {
    id: "2",
    editorial: { stage: "pending-human-review", history: [] },
    slug: "busy-accounting-whatsapp-integration-benefits",
    title: benefitsGuide.title,
    excerpt: benefitsGuide.description,
    coverImage: benefitsGuide.cover?.src,
    thumbnailImage: "/images/blog/busy-accounting-whatsapp-integration-benefits/listing-thumbnail-v3-2026-10.webp",
    coverAlt: benefitsGuide.cover?.alt,
    coverCaption: benefitsGuide.cover?.caption,
    content: guideMarkdown(benefitsGuide),
    category: "ERP Integration",
    tags: ["Busy Accounting", "ERP Integration", "Automation", "Chatbot"],
    authorId: "1",
    publishedAt: "2026-01-10",
    readingTime: 8,
    isFeatured: false,
    seo: {
      title: benefitsGuide.title,
      description: benefitsGuide.description,
      keywords: ["Busy Accounting WhatsApp integration", "Busy ERP WhatsApp", "invoice automation WhatsApp"],
    },
  },
];

// Helper functions
export function getAllPosts(): BlogPostMeta[] {
  return blogPosts
    .filter((post) => !post.isDraft)
    .sort((a, b) => (Date.parse(contentDates(b).published || "") || 0) - (Date.parse(contentDates(a).published || "") || 0));
}

export function getPostBySlug(slug: string): BlogPostMeta | undefined {
  return blogPosts.find((post) => post.slug === slug && !post.isDraft);
}

export function getFeaturedPosts(): BlogPostMeta[] {
  return blogPosts.filter((post) => post.isFeatured && !post.isDraft);
}

export function getRelatedPosts(currentSlug: string, limit: number = 2): BlogPostMeta[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  return blogPosts
    .filter((post) => post.slug !== currentSlug && !post.isDraft)
    .map((post) => {
      let score = 0;
      const matchingTags = post.tags.filter((tag) => currentPost.tags.includes(tag));
      score += matchingTags.length * 2;
      if (post.category === currentPost.category) score += 1;
      return { post, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}

export function getAllCategories(): string[] {
  const categories = new Set(blogPosts.map((post) => post.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  blogPosts.forEach((post) => post.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags);
}

export function getPostsByAuthor(authorId: string): BlogPostMeta[] {
  return blogPosts
    .filter((post) => post.authorId === authorId && !post.isDraft)
    .sort((a, b) => (Date.parse(contentDates(b).published || "") || 0) - (Date.parse(contentDates(a).published || "") || 0));
}

// Category colors for badges
export const categoryColors: Record<string, string> = {
  "WhatsApp API": "bg-green-100 text-green-700 border-green-200",
  "ERP Integration": "bg-brand-100 text-brand-700 border-brand-200",
  "Business Automation": "bg-purple-100 text-purple-700 border-purple-200",
  "Industry Insights": "bg-orange-100 text-orange-700 border-orange-200",
  "Product Updates": "bg-pink-100 text-pink-700 border-pink-200",
  "Tutorials": "bg-cyan-100 text-cyan-700 border-cyan-200",
  "Case Studies": "bg-amber-100 text-amber-700 border-amber-200",
};
