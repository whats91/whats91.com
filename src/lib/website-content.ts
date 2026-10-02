import { metaPricingDescription } from "@/lib/meta-pricing";
import { generateStaticPageMarkdown } from "./website-markdown";
import { templateResourceMarkdown, flowResourceMarkdown, messageExampleDescription, flowResourceDescription } from "@/lib/resource-content";
import { localTools, localToolPrivacy } from "@/lib/tool-catalogue";
import { automationPages, automationMarkdown } from "@/lib/automation-pages";
import { busySolutions, busyMarkdown } from "@/lib/busy-solutions";
import { setupScope, sceneCaption, setupCaptureScope, profileCaption, formatCaption } from "@/lib/product-media";
import { homeTitle, homeDescription, homeMarkdown, featuresMarkdown, homeFaqs } from "@/lib/home-content";
import { mcpTitle, mcpDescription, mcpMarkdown, mcpFaqItems } from "@/lib/mcp-contract";
import { compatibilityMarkdown, compatibilityQualification, compatibilityFAQs } from "@/lib/platform-compatibility";
import { calculatorMarkdown, pricingMarkdown, pricingFAQs, partnerMarkdown, partnerFAQs, coinsMarkdown, coinsFAQs } from "@/lib/pricing";
import { contentDates } from "@/lib/content/dates";
import { siteConfig } from "@/lib/seo/config";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

/**
 * MCP Passage Feed - Per-Page Structured Content
 * Part of SEO 2.0 - Machine-Consumable Passages for AI agents
 *
 * Each passage has stable IDs, structured sections, and plain text content
 * for easy consumption by LLMs without DOM parsing.
 */

interface MCPSession {
  id: string;
  heading: string;
  content: string;
  keywords?: string[];
}

interface MCPPage {
  url: string;
  title: string;
  description: string;
  published_at?: string;
  updated_at?: string;
  language: string;
  sections: MCPSession[];
}

// Page passage data - structured content for AI consumption
const pagePassages: Record<string, MCPPage> = {
  home: { url: `${siteConfig.url}/`, title: homeTitle, description: homeDescription, language: "en", sections: [{ id: "home__workflow_paths", heading: "Workflow paths and scope", content: homeMarkdown }, ...homeFaqs.map((faq, index) => ({ id: `home__faq_${index + 1}`, heading: faq.question, content: faq.answer }))] },
  features: { url: `${siteConfig.url}/features`, title: "Whats91 Features", description: "Explore Whats91 feature paths; confirm account eligibility and integration scope before launch.", language: "en", sections: [{ id: "features__paths", heading: "Feature paths and scope", content: featuresMarkdown }] },
  mcp: { url: `${siteConfig.url}/mcp`, title: mcpTitle, description: mcpDescription, language: "en", sections: [{ id: "mcp__access", heading: "MCP access and availability", content: mcpMarkdown }, ...mcpFaqItems.map(f => ({ id: `mcp__${f.id}`, heading: f.q, content: f.a }))] },
  ...Object.fromEntries(Object.values(busySolutions).map(solution => [solution.slug, {
    url: `${siteConfig.url}/solutions/${solution.slug}`,
    title: solution.title, description: solution.description, language: "en",
    ...(solution.slug === "busy-erp" ? { updated_at: "2026-03-03" } : {}),
    sections: [
      { id: `${solution.slug}__overview`, heading: "Workflow scope", content: busyMarkdown(solution) },
      // Preserve existing ERP passage identities while replacing unsupported promises.
      ...(solution.slug === "busy-erp" ? [
        { id: "busy-erp__invoice_automation", heading: "Outbound documents", content: solution.sections[0].text + " " + solution.sections[0].items![0].text },
        { id: "busy-erp__balance_inquiry", heading: "Customer account requests", content: solution.sections[1].text },
        { id: "busy-erp__payment_reminders", heading: "Reminder triggers and stopping", content: solution.sections[3].text },
        { id: "busy-erp__ledger_statements", heading: "Reports and vouchers", content: solution.sections[4].text + " " + solution.sections[4].items!.map(item => item.text).join(" ") },
        { id: "busy-erp__bilty_tracking", heading: "Bilty fields", content: "Scope mapped transport records and available bilty/dispatch fields; this does not establish live carrier tracking or a delivery result." },
        { id: "busy-erp__roi", heading: "Evaluation scope", content: "Evaluate a permitted pilot against equivalent document volumes, including staff time, failures, disputes and operating costs. No measured savings or collection improvement is supplied." },
      ] : []),
      ...solution.faqs.map((faq, index) => ({ id: `${solution.slug}__faq_${index + 1}`, heading: faq.question, content: faq.answer })),
    ],
  }])),
  "miracle-whatsapp-api": {
    url: `${siteConfig.url}/solutions/miracle-whatsapp-api`,
    title: "Miracle Accounting Software WhatsApp API Integration",
    description: "Connect Miracle Accounting Software with Whats91 Cloud API to send invoices, challans, builty PDFs, ledger statements, and payment reminders on WhatsApp without QR login.",
    updated_at: "2026-05-29",
    language: "en",
    sections: [
      { id: "miracle-whatsapp-api__example_scope", heading: "Setup and example scope", content: `${setupScope} ${sceneCaption} ${profileCaption} ${formatCaption} ${setupCaptureScope}` },
      {
        id: "miracle-whatsapp-api__overview",
        heading: "Overview",
        content: "Whats91 provides a custom Miracle WhatsApp API endpoint for Miracle Accounting Software users who need official WhatsApp Cloud API delivery for invoice PDFs, GST bills, challans, builty PDFs, ledger statements, receipts, and payment reminders.",
        keywords: ["Miracle WhatsApp API", "Miracle Accounting Software WhatsApp Integration", "Miracle Accounting WhatsApp Cloud API"],
      },
      {
        id: "miracle-whatsapp-api__web_api",
        heading: "What is Miracle Web API",
        content: "Miracle Web API is the external API configuration used by Miracle Accounting Software to send structured HTTP requests to another system. For WhatsApp delivery, Miracle sends accounting fields, recipient mobile, template values, and Base64 PDF attachment data to Whats91.",
        keywords: ["Miracle Web API", "Miracle API", "Miracle Accounting API", "Miracle ERP API", "Miracle Integration API"],
      },
      {
        id: "miracle-whatsapp-api__connection_flow",
        heading: "How Miracle Accounting Software Connects to WhatsApp",
        content: "The flow is Miracle -> API Request -> Whats91 -> WhatsApp Cloud API -> Customer. Miracle generates an invoice, GST invoice, challan, builty, ledger statement, receipt, or payment reminder. Miracle sends JSON to Whats91. Whats91 validates the token, template, recipient, variables, attachment, and sender, then sends the approved WhatsApp template and PDF through WhatsApp Cloud API.",
        keywords: ["Miracle invoice WhatsApp", "Miracle PDF WhatsApp", "Miracle payment reminder automation", "WhatsApp Cloud API"],
      },
      {
        id: "miracle-whatsapp-api__endpoint",
        heading: "Custom Endpoint",
        content: "Use POST https://graph.whats91.com/api/custom/miracle/send-template in Miracle's WhatsApp Web API profile. The endpoint accepts Miracle-style JSON fields, aliases, template arguments, and Base64 PDF attachments.",
        keywords: ["Miracle API endpoint", "Whats91 custom Miracle endpoint", "WhatsApp Web API profile"],
      },
      {
        id: "miracle-whatsapp-api__payload",
        heading: "Payload Requirements",
        content: "Required fields include auth_token, template_id or template_name, country_code, and send_to. For PDF attachments use media_url_type=base64, base64 mapped to Miracle's attachment Base64 field, and file_name mapped to Miracle's attachment file-name field.",
        keywords: ["auth_token", "template_name", "Base64 PDF attachment"],
      },
      {
        id: "miracle-whatsapp-api__implementation",
        heading: "Implementation Steps",
        content: "Create and approve the WhatsApp template, generate a Whats91 API token, add the Miracle Web API profile, paste the JSON body, map send_to to party mobile, choose PDF and Log With Attachment, then send a controlled test document and review Whats91 logs.",
        keywords: ["How to setup WhatsApp in Miracle Software", "Miracle WhatsApp setup", "Whats91 implementation"],
      },
      {
        id: "miracle-whatsapp-api__web_vs_cloud",
        heading: "Miracle WhatsApp API vs WhatsApp Web Sending",
        content: "WhatsApp Web sending requires QR login and an active browser session. Whats91 Cloud API delivery does not require QR login, uses approved templates, supports Base64 PDF attachments, provides delivery logs, supports automation, and is better suited for scalable ERP and accounting document delivery.",
        keywords: ["Miracle WhatsApp API vs WhatsApp Web", "official WhatsApp Cloud API", "QR login replacement"],
      },
      {
        id: "miracle-whatsapp-api__industries",
        heading: "Miracle Workflow Examples by Industry",
        content: "Illustrative use cases, not customer case studies or measured results. Examples include textile businesses, ceramic businesses, FMCG distributors, manufacturers, wholesalers, commission agents, petrol pumps, and pharmaceutical distributors. Workflows include GST invoice delivery, builty PDFs, challans, transport documents, ledger statements, payment reminders, receipts, credit control, and customer communication.",
        keywords: ["Miracle WhatsApp automation industries", "Miracle ERP WhatsApp integration", "accounting document automation"],
      },
      {
        id: "miracle-whatsapp-api__workflow",
        heading: "Miracle WhatsApp API Workflow",
        content: "Miracle invoice generated -> Miracle Web API trigger -> Whats91 endpoint -> template validation -> Base64 PDF attachment check -> WhatsApp Cloud API -> customer receives PDF. Logs cover missing tokens, invalid phone numbers, missing templates, invalid Base64, missing file names, sender health, and Cloud API delivery responses.",
        keywords: ["Miracle WhatsApp API workflow", "Base64 PDF attachments", "template validation", "delivery logs"],
      },
      {
        id: "miracle-whatsapp-api__security",
        heading: "Token Security",
        content: "Never publish a live Whats91 token in screenshots, website content, or public documentation. Use YOUR_WHATS91_API_TOKEN in examples and rotate any token that was exposed in setup material.",
        keywords: ["Whats91 token security", "auth_token", "API token rotation"],
      },
    ],
  },
  "chat-shortcuts-conversation-automation": {
    url: `${siteConfig.url}/features/chat-shortcuts-conversation-automation`,
    title: "WhatsApp Chat Shortcuts, Ice Breakers and Slash Commands",
    description: "Use WhatsApp Ice Breakers and Slash Commands to start chatbots, Flow Builder, ERP, support, sales, demo, and order tracking automations.",
    updated_at: "2026-05-29",
    language: "en",
    sections: [
      { id: "chat-shortcuts-conversation-automation__example_scope", heading: "Setup and example scope", content: `${setupScope} ${sceneCaption}` },
      {
        id: "chat-shortcuts__overview",
        heading: "Overview",
        content: "Whats91 Chat Shortcuts lets businesses configure Meta WhatsApp conversational components for connected phone numbers. Customers see WhatsApp Ice Breakers and WhatsApp Slash Commands inside WhatsApp, while Whats91 handles the automation after those selections arrive as normal webhook text.",
        keywords: ["WhatsApp Chat Shortcuts", "WhatsApp Ice Breakers", "WhatsApp Slash Commands"],
      },
      {
        id: "chat-shortcuts__ice_breakers",
        heading: "What are WhatsApp Ice Breakers",
        content: "WhatsApp Ice Breakers are quick-start prompts, also called WhatsApp Quick Start Prompts or WhatsApp Conversation Starters. Meta displays prompts such as Track My Order, Talk to Support, Request Invoice, and Book Demo inside WhatsApp. When tapped, Whats91 receives the prompt as incoming text and routes it into WhatsApp Business Automation.",
        keywords: ["WhatsApp Ice Breakers", "WhatsApp Quick Start Prompts", "WhatsApp Conversation Starters"],
      },
      {
        id: "chat-shortcuts__slash_commands",
        heading: "What are WhatsApp Slash Commands",
        content: "WhatsApp Slash Commands are typed commands such as /support, /orders, /ledger, and /demo. The command arrives as webhook text, and Whats91 can match it as a stable automation trigger for chatbots, Flow Builder, ERP workflows, CRM updates, order tracking, or human handoff.",
        keywords: ["WhatsApp Slash Commands", "WhatsApp Business Commands", "WhatsApp Automation Commands", "WhatsApp Conversational Automation"],
      },
      {
        id: "chat-shortcuts__how_it_works",
        heading: "How It Works",
        content: "Teams configure prompts and commands in Whats91, push them to Meta, customers tap or type them inside WhatsApp, and Whats91 routes the received text into Chatbots, Flow Builder, ERP workflows, custom handlers, or human handoff.",
        keywords: ["Flow Builder integration", "WhatsApp chatbot shortcuts", "webhook automation"],
      },
      {
        id: "chat-shortcuts__chatbots_comparison",
        heading: "WhatsApp Chat Shortcuts vs WhatsApp Chatbots",
        content: "Chat Shortcuts are visible conversation starters and command triggers. Chatbots run after a message is received. A shortcut can start a chatbot, but it is not the chatbot itself. Shortcuts do not require AI and work with Flow Builder, ERP workflows, and support routing.",
        keywords: ["WhatsApp Chat Shortcuts vs WhatsApp Chatbots", "Can Chat Shortcuts start chatbots", "Flow Builder triggers"],
      },
      {
        id: "chat-shortcuts__use_cases",
        heading: "Business Use Cases",
        content: "Common use cases include customer support automation, order tracking automation, ERP automation, accounting automation, lead generation, sales automation, and demo booking. Example shortcuts include Track My Order, Talk to Support, Request Invoice, Book Demo, /ledger, /orders, /support, and /demo.",
        keywords: ["WhatsApp customer support automation", "WhatsApp accounting automation", "WhatsApp order tracking automation"],
      },
      {
        id: "chat-shortcuts__limits",
        heading: "Existing setup values to confirm",
        content: "The existing setup example lists up to 4 prompts, 80 characters per prompt, 30 commands, 32 characters per name and 256 characters per description, with emoji and duplicate checks. These are not confirmed current provider limits or account entitlements. Confirm the supported limits and enabled configuration before use.",
        keywords: ["Meta conversational automation limits", "WhatsApp prompt limits", "slash command limits"],
      },
      {
        id: "chat-shortcuts__scope",
        heading: "Security And Scope",
        content: "Chat Shortcuts is separate from AI MetaBot, does not use WABA Bot ID APIs, does not depend on an AI runtime, and keeps configuration scoped to the selected WhatsApp phone number.",
        keywords: ["AI MetaBot separate", "WABA Bot ID", "WhatsApp number configuration"],
      },
    ],
  },
  "whatsapp-templates": { url: `${siteConfig.url}/whatsapp-templates`, title: "WhatsApp Message Examples", description: messageExampleDescription, updated_at: "2026-03-03", language: "en", sections: [{ id: "templates__examples", heading: "Message examples and approval scope", content: templateResourceMarkdown, keywords: ["Message examples", "Account approval"] }] },
  "whatsapp-coexistence": { url: siteConfig.url + "/whatsapp-coexistence", title: "WhatsApp Coexistence: Account Conditions", description: compatibilityQualification, updated_at: "2026-03-03", language: "en", sections: [{ id: "coexistence__conditions", heading: "Standard and hybrid conditions", content: compatibilityMarkdown }, ...compatibilityFAQs.map((row, index) => ({ id: "coexistence__question_" + index, heading: row.question, content: row.answer }))] },
  "whatsapp-api-cost-calculator": { url: siteConfig.url + "/tools/whatsapp-api-cost-calculator", title: "WhatsApp API Cost Calculator", description: metaPricingDescription, language: "en", sections: [{ id: "calculator__schedule", heading: "Effective schedule and calculation conditions", content: calculatorMarkdown }] },
  "pricing": { url: siteConfig.url + "/pricing", title: "WhatsApp API Pricing India", description: metaPricingDescription, updated_at: "2026-03-03", language: "en", sections: [{ id: "pricing__conditions", heading: "Commercial conditions", content: pricingMarkdown }, ...pricingFAQs.map((item, index) => ({ id: "pricing__question_" + index, heading: item.question, content: item.answer }))] },
  "partners": { url: siteConfig.url + "/partners", title: "Whats91 Partner Program", description: "Public plan prices are listed separately; Partner and Tech Partner rates and add-on terms require a written agreement.", updated_at: "2026-06-06", language: "en", sections: [{ id: "partners__conditions", heading: "Commercial conditions", content: partnerMarkdown }, ...partnerFAQs.map((item, index) => ({ id: "partners__question_" + index, heading: item.question, content: item.answer }))] },
  "whats91-coins": { url: siteConfig.url + "/partners/whats91-coins", title: "Whats91 Coins", description: "Partner quantities and wallet conditions; current conversion, deduction and recharge amounts unavailable.", updated_at: "2026-06-06", language: "en", sections: [{ id: "whats91-coins__conditions", heading: "Commercial conditions", content: coinsMarkdown }, ...coinsFAQs.map((item, index) => ({ id: "whats91-coins__question_" + index, heading: item.question, content: item.answer }))] },
  ...Object.fromEntries(Object.values(automationPages).map(page => [page.slug, {
    url: siteConfig.url + page.path, title: page.title, description: page.description, language: "en",
    ...(page.slug === "google-sheets-integration" ? { updated_at: "2026-03-03" } : {}),
    sections: [
      { id: `${page.slug}__workflow`, heading: "Workflow and conditions", content: automationMarkdown(page) },
      // Preserve inherited Sheet passage IDs and declared date; technical work supplies no historical approval.
      ...(page.slug === "google-sheets-integration" ? [
        { id: "sheets__overview", heading: "Integration scope", content: page.intro + " " + page.scope },
        { id: "sheets__how_it_works", heading: "Reply to row", content: page.sections[1].text },
        { id: "sheets__button_types", heading: "Response events", content: page.sections[2].text },
        { id: "sheets__data_fields", heading: "Candidate fields", content: page.sections[4].text + " " + page.sections[4].table!.rows.map(row => row.join(": ")).join("; ") },
        { id: "sheets__use_cases", heading: "Illustrative tasks", content: page.sections[5].text },
      ] : []),
      ...page.faqs.map((faq,index) => ({ id: `${page.slug}__faq_${index+1}`, heading: faq.question, content: faq.answer })),
    ],
  }])),
  "chatbot-flows": { url: `${siteConfig.url}/chatbot-flows`, title: "Chatbot Flow JSON Examples", description: flowResourceDescription, updated_at: "2026-03-03", language: "en", sections: [{ id: "flows__examples", heading: "Example downloads and import requirements", content: flowResourceMarkdown, keywords: ["JSON examples", "Downloads", "Import requirements"] }] },
  tools: {
    url: `${siteConfig.url}/tools`, title: "Free Tools - WhatsApp Business Resources",
    description: "Local link and PNG generators, message-volume planning and user-assumption ROI scenarios.", language: "en",
    sections: [...localTools.map((tool, index) => ({ id: `tools__item_${index + 1}`, heading: tool.title, content: `${tool.description} ${tool.href}` })), { id: "tools__privacy", heading: "Privacy and browser requirements", content: localToolPrivacy + " Interactive controls require JavaScript and relevant browser capabilities; reload with local scripts enabled if they do not respond. /privacy" }],
  },
};


export interface WebsiteContent {
  slug: string; url: string; title: string; description: string; content: string;
  keywords: string[]; category?: string; publishedAt?: string; lastModified?: string;
  declaredSourceDate?: string; indexHold?: boolean; sections: MCPSession[];
}
export type ContentResult = { status: "available"; page: WebsiteContent } | { status: "unavailable"; url: string } | { status: "not-found" };

/** A missing body is distinct from an unknown/draft record and never becomes empty success. */
export function getWebsiteContent(slug: string): ContentResult {
  if (slug.startsWith("blog-")) {
    const post = getPostBySlug(slug.slice(5));
    if (!post || post.isDraft) return { status: "not-found" };
    const url = `${siteConfig.url}/blog/${post.slug}`;
    if (!post.content?.trim()) return { status: "unavailable", url };
    const dates = contentDates(post);
    const compatibility = ["whatsapp-cloud-api-restrictions-coexistence-framework-2026", "whatsapp-cloud-api-complete-guide-2026", "whatsapp-web-6-hour-logout-unofficial-api-migration-guide", "whatsapp-graph-api-v24-to-v25-transition-guide", "whatsapp-username-system-2026-complete-guide"].includes(post.slug);
    const suffix = compatibility ? "compatibility" : post.slug === "whatsapp-cloud-api-pricing-india-2026" ? "pricing_conditions" : "guide";
    return { status: "available", page: { slug, url, title: post.title, description: post.excerpt, content: post.content,
      keywords: post.seo.keywords, category: post.category, publishedAt: dates.published, lastModified: dates.modified, indexHold: post.indexHold,
      sections: [{ id: `${slug}__summary`, heading: "Summary", content: post.excerpt, keywords: post.seo.keywords },
        { id: `${slug}__${suffix}`, heading: "Guide, examples and conditions", content: post.content },
        { id: `${slug}__tags`, heading: "Topics Covered", content: `This article covers: ${post.tags.join(", ")}. Category: ${post.category}. Reading time: ${post.readingTime} minutes.`, keywords: post.seo.keywords }],
    } };
  }
  if (!Object.hasOwn(pagePassages, slug)) return { status: "not-found" };
  const passage = pagePassages[slug], body = generateStaticPageMarkdown(slug);
  if (!body?.content.trim()) return { status: "unavailable", url: passage.url };
  const sections = passage.sections.map(section => ({ ...section }));
  // These two legacy guides had independent machine paragraphs. The full maintained body
  // now leads their passages, retaining stable passage IDs and setup qualifications.
  if (["miracle-whatsapp-api", "chat-shortcuts-conversation-automation"].includes(slug)) {
    sections[0].content = body.content;
    for (const section of sections.slice(1)) section.content = `${setupScope} ${section.content}`;
  }
  return { status: "available", page: { ...body, slug, declaredSourceDate: passage.updated_at, sections } };
}

/** Historical21 plus later maintained sources, with actual body availability. Drafts stay private. */
export function websiteContentInventory() {
  const slugs = [...Object.keys(pagePassages), ...getAllPosts().filter(post => !post.isDraft).map(post => `blog-${post.slug}`)];
  return slugs.map(slug => {
    const result = getWebsiteContent(slug);
    return result.status === "available" ? { slug, title: result.page.title, url: result.page.url, status: result.status, indexHold: !!result.page.indexHold }
      : { slug, title: "Content unavailable", url: result.status === "unavailable" ? result.url : `${siteConfig.url}/blog`, status: result.status, indexHold: false };
  });
}
export function availableWebsiteSlugs() { return websiteContentInventory().filter(item => item.status === "available").map(item => item.slug); }
export function websitePassages(page: WebsiteContent) {
  return { url: page.url, title: page.title, description: page.description, language: "en",
    content_format: "text/markdown", content: page.content,
    published_at: page.publishedAt, updated_at: page.declaredSourceDate || page.lastModified,
    ...(page.declaredSourceDate && { date_status: "inherited-source-declaration", date_note: "Preserved declared source date; not a verified material update or a human review." }),
    ...(page.indexHold && { index_status: "canonical-reader-index-hold" }), sections: page.sections };
}
