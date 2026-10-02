import { contentDates } from "@/lib/content/dates";
import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/config";
import { getAllPosts } from "@/lib/blog";
import { getAllAuthors } from "@/lib/blog/authors";

// The sitemap deliberately contains only canonical, indexable HTML pages.
// Non-HTML endpoints (/api/md/* markdown twins, /api/mcp*, /llms.txt,
// /feed.xml) are intentionally excluded: robots.txt disallows /api/ for most
// crawlers, and sitemap entries must be self-canonical HTML URLs. The
// markdown twins now declare a canonical Link header to their HTML page and
// stay discoverable via /llms.txt.
//
// Static pages carry no lastModified on purpose — a build-time timestamp
// claims every page changed on every deploy, which teaches crawlers to
// distrust the value. Blog entries use declared content dates; profile joining dates are not page changes.
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const blogPosts = getAllPosts().filter(post => !post.indexHold);
  const authors = getAllAuthors();

  // ============================================
  // STATIC PAGES - Core website pages
  // ============================================
  const corePages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/pricing`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/plans`, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/partners`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/partners/whats91-coins`, changeFrequency: "weekly", priority: 0.75 },
  ];

  // ============================================
  // BLOG PAGES
  // ============================================
  const blogPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/blog`, changeFrequency: "daily", priority: 0.9 },
    ...blogPosts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      ...(contentDates(post).lastModified && { lastModified: contentDates(post).lastModified }),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];

  // ============================================
  // SOLUTIONS PAGES
  // ============================================
  const solutionsPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/flow-builder`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/solutions/busy-erp`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/solutions/miracle-whatsapp-api`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/solutions/busy-reports`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/solutions/busy-google-sheet`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/solutions/busy-api`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/solutions/payment-reminders`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/solutions/marketing`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/solutions/utility`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/solutions/busy-ecommerce`, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/solutions/busy-ai-agent`, changeFrequency: "weekly", priority: 0.95 },
  ];

  // ============================================
  // FEATURE PAGES
  // ============================================
  const featurePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/features`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/features/chat-shortcuts-conversation-automation`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/mcp`, changeFrequency: "weekly", priority: 0.9 },
  ];

  // ============================================
  // FREE TOOLS PAGES
  // ============================================
  const toolsPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/tools`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tools/whatsapp-link-generator`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/tools/qr-code-generator`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/tools/whatsapp-api-cost-calculator`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/tools/lead-qualification-roi-calculator`, changeFrequency: "weekly", priority: 0.8 },
  ];

  // ============================================
  // WHATSAPP RESOURCES
  // ============================================
  const resourcePages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/whatsapp-templates`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/whatsapp-coexistence`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/whatsapp-business-calling`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/chatbot-flows`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/google-sheets-integration`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/faq`, changeFrequency: "weekly", priority: 0.8 },
  ];

  // ============================================
  // LEGAL PAGES
  // ============================================
  const legalPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/legal`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/terms`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/acceptable-use`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/data-rights`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/compliance`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/trust/security`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/sla`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/refund`, changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/cookies`, changeFrequency: "yearly", priority: 0.2 },
  ];

  // ============================================
  // AUTHOR PAGES
  // ============================================
  const authorPages: MetadataRoute.Sitemap = [
    ...authors.filter(author => author.publicUse !== "pending").map((author) => ({
      url: `${baseUrl}/authors/${author.slug}`,
      ...(contentDates(author).lastModified && { lastModified: contentDates(author).lastModified }),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  // ============================================
  // COMBINE ALL PAGES
  // ============================================
  return [
    ...corePages,
    ...blogPages,
    ...solutionsPages,
    ...featurePages,
    ...toolsPages,
    ...resourcePages,
    ...legalPages,
    ...authorPages,
  ];
}
