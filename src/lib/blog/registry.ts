/**
 * Blog Post Registry - Lightweight metadata for blog listing
 * 
 * This file contains ONLY metadata for the blog listing page.
 * All actual content lives in each post's page.tsx file.
 * 
 * When adding a new blog post:
 * 1. Create /src/app/blog/your-post-slug/page.tsx with full content
 * 2. Add metadata entry to this registry
 */

export interface BlogPostMeta {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  authorId: string;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  isFeatured: boolean;
  isDraft?: boolean;
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
    id: "10",
    slug: "whatsapp-cloud-api-pricing-india-2026",
    title: "WhatsApp Cloud API Pricing India 2026: Complete Cost Breakdown for Businesses",
    excerpt: "Compare Meta direct INR rates, BSP markups, OTP costs, template categorization, billing reconciliation, hidden fees, and practical WhatsApp API cost estimates for India.",
    category: "WhatsApp API",
    tags: ["WhatsApp API", "Pricing", "India", "Cloud API", "2026"],
    authorId: "1",
    publishedAt: "2026-05-22",
    updatedAt: "2026-05-22",
    readingTime: 21,
    isFeatured: true,
    content: `# WhatsApp Cloud API Pricing India 2026

This guide explains WhatsApp Cloud API pricing for Indian businesses in 2026, including Meta direct INR rates, BSP markups, OTP costs, hidden infrastructure fees, and cost optimization patterns.

Pricing researched and updated on May 22, 2026 based on Meta documentation and Indian BSP market analysis.

## Current researched India rates

- Marketing templates: ₹0.8631 per delivered message.
- Utility templates: ₹0.1150 per delivered message outside eligible free service windows.
- Domestic authentication templates: ₹0.1150 per delivered message.
- Authentication-International traffic to India: ₹2.3000 base rate on the researched INR card.
- Service replies inside the customer service window: ₹0 in the researched model.

## Static cost estimator

| Monthly Messages | Mostly Utility | Mostly Marketing |
| --- | --- | --- |
| 10K | ₹2,646 (₹3,123 with GST) | ₹7,135 (₹8,419 with GST) |
| 50K | ₹13,231 (₹15,613 with GST) | ₹35,674 (₹42,095 with GST) |
| 1L | ₹26,462 (₹31,225 with GST) | ₹71,348 (₹84,191 with GST) |

Mostly utility assumes 80% utility and 20% marketing. Mostly marketing assumes 80% marketing and 20% utility. Estimates use direct researched Meta delivery rates before BSP platform fees, seats, add-ons, and implementation charges.

## How Meta decides marketing vs utility

Template intent matters. "Your order has shipped" is utility. "Your order shipped - get 20% off your next order" is marketing because the discount changes the intent. "Complete your payment" is utility when tied to an active transaction. "Special discount expires tonight" is marketing.

Promotional language, cross-sells, upsells, coupons, product discovery, and re-engagement hooks can move a template into marketing pricing.

## Planning notes

Marketing messages dominate monthly cost. Utility and domestic authentication are low-cost, but routing matters because utility messages sent inside an active 24-hour customer service window can be free. BSP invoices can also include message markups, monthly platform fees, agent seats, automation add-ons, CRM or ERP integrations, GST, media storage, and support.

Accepted or sent status should not be treated as final billing evidence. Reconcile billable counts against delivered webhooks, provider delivery exports, and the final BSP invoice. If a delivered webhook is delayed or missing, keep the record pending or unknown until reconciliation is complete.

## Recommended optimization

Segment marketing audiences, use quick replies to create customer interaction, route utility updates through active service windows, and implement WhatsApp-first OTP with SMS fallback. For developer teams, use queue-first webhook processing, idempotency, batched payload loops, and outbound throttling to keep billing and delivery data reliable.`,
    seo: {
      title: "WhatsApp Cloud API Pricing India 2026 | Complete Cost Breakdown",
      description: "Explore WhatsApp API pricing in India for 2026. Compare Meta direct fees, BSP markups, transactional OTP costs, hidden infrastructure fees, and optimization strategies.",
      keywords: ["WhatsApp Cloud API pricing India", "WhatsApp API cost India 2026", "Meta per message rates INR", "WhatsApp marketing message price India", "WhatsApp utility message price India", "WhatsApp OTP cost India", "WhatsApp BSP markup", "WhatsApp utility vs marketing templates", "WhatsApp template categorization", "WhatsApp accepted but no webhook billing"],
    },
  },
  {
    id: "9",
    slug: "whatsapp-cloud-api-restrictions-coexistence-framework-2026",
    title: "WhatsApp Cloud API Restrictions & Coexistence Framework: Complete 2026 Guide",
    excerpt: "Master the 24-hour and 48-hour restrictions, portfolio-level messaging limits, quality ratings, and the hybrid Coexistence Mode. Learn why chatbots get restricted and how to maintain Connected status.",
    category: "WhatsApp API",
    tags: ["WhatsApp API", "Cloud API", "Coexistence", "Restrictions", "2026"],
    authorId: "1",
    publishedAt: "2026-03-20",
    readingTime: 25,
    isFeatured: true,
    seo: {
      title: "WhatsApp Cloud API Restrictions & Coexistence Framework Guide 2026",
      description: "Complete guide to WhatsApp Cloud API restrictions, portfolio-level messaging limits, quality ratings, Coexistence Mode, AI policy changes, and best practices for maintaining Connected status in 2026.",
      keywords: ["WhatsApp Cloud API restrictions", "WhatsApp Coexistence Mode", "WhatsApp 24-hour restriction", "WhatsApp Quality Rating", "WhatsApp messaging limits 2026", "WhatsApp AI policy", "WhatsApp portfolio pacing"],
    },
  },
  {
    id: "8",
    slug: "busy-erp-google-sheets-integration-complete-guide",
    title: "Busy ERP Google Sheets Integration (Step-by-Step Guide + Automation)",
    excerpt: "Learn how to connect Busy ERP with Google Sheets for real-time reporting, automation, CRM integration, and WhatsApp workflows. Complete step-by-step guide for 2026.",
    category: "ERP Integration",
    tags: ["Busy ERP", "Google Sheets", "Integration", "Automation", "WhatsApp"],
    authorId: "1",
    publishedAt: "2026-03-15",
    readingTime: 22,
    isFeatured: true,
    seo: {
      title: "Busy ERP Google Sheets Integration (Step-by-Step Guide + Automation)",
      description: "Learn how to connect Busy ERP with Google Sheets for real-time reporting, automation, CRM integration, and WhatsApp workflows. Complete step-by-step guide for 2026.",
      keywords: ["Busy ERP Google Sheets integration", "Busy Accounting Google Sheets", "Busy ERP data export", "Busy ERP automation", "Busy WhatsApp integration", "Google Sheets ERP dashboard"],
    },
  },
  {
    id: "7",
    slug: "whatsapp-graph-api-v24-to-v25-transition-guide",
    title: "WhatsApp Graph API v24 to v25: Complete Migration Guide for Enterprise",
    excerpt: "The definitive analysis of Meta's Graph API transition. Learn about BSUID, Cloud API consolidation, 100K messaging baseline, pricing changes, and actionable migration strategies.",
    category: "WhatsApp API",
    tags: ["Graph API", "Cloud API", "BSUID", "Migration", "2026", "Developer"],
    authorId: "1",
    publishedAt: "2026-03-13",
    readingTime: 20,
    isFeatured: true,
    seo: {
      title: "WhatsApp Graph API v24 to v25 Migration Guide | BSUID, Cloud API, 100K Baseline",
      description: "Complete guide to migrating from WhatsApp Graph API v24.0 to v25.0. Learn about BSUID identity, Cloud API consolidation, 100K messaging limits, pricing changes, and developer optimization strategies.",
      keywords: ["WhatsApp Graph API v25", "BSUID migration", "WhatsApp Cloud API 2026", "100K messaging limit", "WhatsApp API pricing", "Graph API migration guide"],
    },
  },
  {
    id: "6",
    slug: "whatsapp-username-system-2026-complete-guide",
    title: "WhatsApp Username System 2026: The Complete Guide to Sovereign Identity",
    excerpt: "Meta is decoupling three billion users from phone numbers. Learn about BSUIDs, username PINs, developer migration paths, and what this means for businesses on WhatsApp Cloud API.",
    category: "WhatsApp API",
    tags: ["Username System", "BSUID", "Cloud API", "Privacy", "2026", "Developer"],
    authorId: "1",
    publishedAt: "2026-03-06",
    readingTime: 18,
    isFeatured: true,
    seo: {
      title: "WhatsApp Username System 2026: BSUID, PINs & Cloud API Migration Guide",
      description: "Complete guide to WhatsApp's 2026 username system. Learn about Business-Scoped User IDs (BSUID), username PIN security, 100K messaging limits, and developer migration strategies.",
      keywords: ["WhatsApp username 2026", "BSUID WhatsApp", "WhatsApp username PIN", "WhatsApp Cloud API migration", "WhatsApp identity system", "WhatsApp phone number alternative"],
    },
  },
  {
    id: "5",
    slug: "whatsapp-plus-launch-2026-premium-subscription-guide",
    title: "WhatsApp+ Launch 2026: Everything You Need to Know About the New Premium Subscription",
    excerpt: "Meta's first direct-to-consumer premium subscription for WhatsApp marks a pivotal shift in messaging monetization. Discover features, pricing, and what this means for businesses.",
    category: "Industry Insights",
    tags: ["WhatsApp+", "Premium Subscription", "Meta", "2026", "Features", "Pricing"],
    authorId: "1",
    publishedAt: "2026-03-06",
    readingTime: 15,
    isFeatured: true,
    seo: {
      title: "WhatsApp+ Launch 2026: Premium Subscription Features, Pricing & Guide",
      description: "Complete guide to WhatsApp+ premium subscription launching March 2026. Learn about custom themes, 20 pinned chats, Meta AI features, pricing in India, and security benefits over unofficial mods.",
      keywords: ["WhatsApp+ subscription", "WhatsApp premium 2026", "WhatsApp+ features", "WhatsApp+ pricing India", "WhatsApp themes", "Meta AI WhatsApp"],
    },
  },
  {
    id: "4",
    slug: "whatsapp-web-6-hour-logout-unofficial-api-migration-guide",
    title: "WhatsApp Web 6-Hour Logout: Impact on Unofficial APIs & Complete Migration Guide",
    excerpt: "How the new 6-hour logout rule affects unofficial WhatsApp APIs, and a complete guide to migrating to the official WhatsApp Cloud API with co-existing or brand name options.",
    category: "WhatsApp API",
    tags: ["WhatsApp API", "Cloud API", "Unofficial API", "Migration", "6-Hour Rule", "Official API"],
    authorId: "1",
    publishedAt: "2026-02-28",
    readingTime: 12,
    isFeatured: true,
    seo: {
      title: "WhatsApp Web 6-Hour Logout: Unofficial API Impact & Official Migration Guide",
      description: "Learn how the 6-hour logout rule affects unofficial WhatsApp APIs and discover two official Cloud API migration options: Co-Existing Mode and Brand Name Mode.",
      keywords: ["WhatsApp unofficial API", "WhatsApp Cloud API migration", "6-hour logout rule impact", "official WhatsApp API"],
    },
  },
  {
    id: "3",
    slug: "whatsapp-web-6-hour-logout-rule-india-2026",
    title: "WhatsApp Web 6-Hour Logout Rule in India: Complete Guide for Businesses",
    excerpt: "India's new DoT directive mandates automatic logout for WhatsApp Web and desktop sessions every 6 hours. Here's what your business needs to know and how to adapt.",
    category: "Industry Insights",
    tags: ["WhatsApp Web", "Compliance", "Security", "India", "Best Practices"],
    authorId: "1",
    publishedAt: "2026-02-26",
    readingTime: 10,
    isFeatured: true,
    seo: {
      title: "WhatsApp Web 6-Hour Logout Rule India 2026 | DoT Directive Explained",
      description: "Complete guide to India's new 6-hour WhatsApp Web logout rule. Learn about SIM-binding, compliance deadlines, impact on businesses, and workflow adaptation strategies.",
      keywords: ["WhatsApp Web logout rule India", "DoT 6-hour logout", "WhatsApp SIM binding India"],
    },
  },
  {
    id: "1",
    slug: "whatsapp-cloud-api-complete-guide-2026",
    title: "WhatsApp Cloud API: Complete Guide for Enterprises in 2026",
    excerpt: "Everything you need to know about implementing WhatsApp Cloud API for your business. From setup to scaling, learn how to leverage the official Meta platform for enterprise communication.",
    category: "WhatsApp API",
    tags: ["WhatsApp Cloud API", "Enterprise", "Best Practices", "India"],
    authorId: "1",
    publishedAt: "2026-01-15",
    readingTime: 12,
    isFeatured: true,
    seo: {
      title: "WhatsApp Cloud API Complete Guide 2026 | Setup, Features & Best Practices",
      description: "Comprehensive guide to WhatsApp Cloud API for enterprises. Learn setup, features, pricing, and best practices for implementing official WhatsApp Business Platform in 2026.",
      keywords: ["WhatsApp Cloud API guide", "WhatsApp Business API setup", "WhatsApp API pricing 2026"],
    },
  },
  {
    id: "2",
    slug: "busy-accounting-whatsapp-integration-benefits",
    title: "5 Ways WhatsApp Integration Transforms Busy Accounting Workflows",
    excerpt: "Discover how integrating WhatsApp with Busy Accounting Software automates invoice delivery, payment reminders, and customer inquiries. Real examples from Indian businesses.",
    category: "ERP Integration",
    tags: ["Busy Accounting", "ERP Integration", "Automation", "Chatbot"],
    authorId: "1",
    publishedAt: "2026-01-10",
    readingTime: 8,
    isFeatured: false,
    seo: {
      title: "Busy Accounting WhatsApp Integration: 5 Transformation Benefits | Whats91",
      description: "Learn how WhatsApp integration with Busy Accounting automates invoices, payment reminders, and customer inquiries. Real examples and ROI breakdown for Indian businesses.",
      keywords: ["Busy Accounting WhatsApp integration", "Busy ERP WhatsApp", "invoice automation WhatsApp"],
    },
  },
];

// Helper functions
export function getAllPosts(): BlogPostMeta[] {
  return blogPosts
    .filter((post) => !post.isDraft)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getPostBySlug(slug: string): BlogPostMeta | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getFeaturedPosts(): BlogPostMeta[] {
  return blogPosts.filter((post) => post.isFeatured);
}

export function getRelatedPosts(currentSlug: string, limit: number = 2): BlogPostMeta[] {
  const currentPost = getPostBySlug(currentSlug);
  if (!currentPost) return [];

  return blogPosts
    .filter((post) => post.slug !== currentSlug)
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
    .filter((post) => post.authorId === authorId)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

// Category colors for badges
export const categoryColors: Record<string, string> = {
  "WhatsApp API": "bg-green-100 text-green-700 border-green-200",
  "ERP Integration": "bg-blue-100 text-blue-700 border-blue-200",
  "Business Automation": "bg-purple-100 text-purple-700 border-purple-200",
  "Industry Insights": "bg-orange-100 text-orange-700 border-orange-200",
  "Product Updates": "bg-pink-100 text-pink-700 border-pink-200",
  "Tutorials": "bg-cyan-100 text-cyan-700 border-cyan-200",
  "Case Studies": "bg-amber-100 text-amber-700 border-amber-200",
};
