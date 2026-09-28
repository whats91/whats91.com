import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/seo/config";
import { getAllPosts } from "@/lib/blog";

/**
 * MCP Server Discovery Endpoint
 * Returns available tools, resources, and passage feeds for AI agents
 * Part of SEO 2.0 - Model Context Protocol implementation
 */

export async function GET() {
  const baseUrl = siteConfig.url;

  // Available passage pages
  const passagePages = [
    { slug: "busy-erp", title: "Busy ERP Integration", priority: "high" },
    { slug: "chat-shortcuts-conversation-automation", title: "Chat Shortcuts and Conversation Automation", priority: "high" },
    { slug: "whatsapp-templates", title: "WhatsApp Templates Library", priority: "high" },
    { slug: "whatsapp-coexistence", title: "WhatsApp Coexistence Guide", priority: "high" },
    { slug: "pricing", title: "WhatsApp API Pricing", priority: "high" },
    { slug: "partners", title: "Whats91 Partner Program", priority: "high" },
    { slug: "whats91-coins", title: "Whats91 Coins Wallet", priority: "high" },
    { slug: "google-sheets-integration", title: "Google Sheets Integration", priority: "high" },
    { slug: "chatbot-flows", title: "Chatbot Flow Library", priority: "high" },
    { slug: "tools", title: "Free Tools", priority: "medium" },
  ];

  // Add blog posts
  const blogPosts = getAllPosts().slice(0, 10);
  const blogPassages = blogPosts.map((post) => ({
    slug: `blog-${post.slug}`,
    title: post.title,
    priority: "medium" as const,
  }));

  const allPassages = [...passagePages, ...blogPassages];

  const mcpCapabilities = {
    name: "Whats91 MCP Server",
    version: "1.1.0",
    description: "WhatsApp Cloud API Platform - Agent-accessible tools and passage feeds for business messaging",
    protocolVersion: "2024-11-05",
    publisher: {
      name: "Wilford Technology",
      url: "https://whats91.com",
    },
    capabilities: {
      tools: {},
      resources: {},
      prompts: {},
      passages: {},
    },
    tools: [
      {
        name: "get_pricing",
        description: "Get WhatsApp Cloud API pricing information by country and message category",
        inputSchema: {
          type: "object",
          properties: {
            country: {
              type: "string",
              description: "Country code (e.g., 'IN' for India, 'US' for United States)",
            },
            category: {
              type: "string",
              enum: ["marketing", "utility", "authentication", "service"],
              description: "Message category for pricing lookup",
            },
          },
        },
      },
      {
        name: "get_template",
        description: "Get a pre-approved WhatsApp message template by category and industry",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              enum: ["marketing", "utility", "authentication"],
              description: "Template category",
            },
            industry: {
              type: "string",
              description: "Industry type (e.g., 'retail', 'real_estate', 'healthcare')",
            },
          },
        },
      },
      {
        name: "calculate_cost",
        description: "Calculate monthly WhatsApp messaging costs based on volume",
        inputSchema: {
          type: "object",
          properties: {
            country: {
              type: "string",
              description: "Country code",
            },
            monthlyMessages: {
              type: "number",
              description: "Expected monthly message volume",
            },
            category: {
              type: "string",
              enum: ["marketing", "utility", "authentication", "service"],
              description: "Primary message category",
            },
          },
          required: ["country", "monthlyMessages"],
        },
      },
      {
        name: "check_coexistence",
        description: "Check if WhatsApp Coexistence mode is available for a given phone number",
        inputSchema: {
          type: "object",
          properties: {
            countryCode: {
              type: "string",
              description: "Country code for the phone number",
            },
          },
          required: ["countryCode"],
        },
      },
      {
        name: "get_blog_content",
        description: "Retrieve blog articles about WhatsApp API and ERP integration",
        inputSchema: {
          type: "object",
          properties: {
            slug: {
              type: "string",
              description: "Blog post slug (optional, returns all posts if not provided)",
            },
            category: {
              type: "string",
              description: "Filter by category (e.g., 'WhatsApp API', 'ERP Integration')",
            },
          },
        },
      },
    ],
    resources: [
      {
        uri: "whats91://templates",
        name: "WhatsApp Message Templates",
        description: "Pre-approved message templates for marketing, utility, and authentication",
        mimeType: "application/json",
      },
      {
        uri: "whats91://pricing",
        name: "WhatsApp API Pricing",
        description: "Current pricing by country and message category",
        mimeType: "application/json",
      },
      {
        uri: "whats91://coexistence-guide",
        name: "WhatsApp Coexistence Guide",
        description: "Implementation guide for using both Business App and Cloud API",
        mimeType: "text/markdown",
      },
    ],
    passages: {
      description: "Structured content passages for LLM consumption without DOM parsing",
      format: "application/json",
      pages: allPassages.map((page) => ({
        slug: page.slug,
        title: page.title,
        priority: page.priority,
        url: `${baseUrl}/api/mcp/pages/${page.slug}`,
      })),
      total: allPassages.length,
    },
    links: {
      documentation: `${baseUrl}/llms.txt`,
      sitemap: `${baseUrl}/sitemap.xml`,
      rss: `${baseUrl}/feed.xml`,
      markdown_content: `${baseUrl}/api/md/{slug}`,
      passage_feeds: `${baseUrl}/api/mcp/pages/{slug}`,
    },
  };

  return NextResponse.json(mcpCapabilities, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      // Machine-readable capability doc for agents, not a search result.
      "X-Robots-Tag": "noindex",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
