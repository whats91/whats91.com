import { metaPricingDescription } from "@/lib/meta-pricing";
import { contentHeaders, contentOptions, contentMethodNotAllowed, contentError } from "@/lib/website-content-http";
import { mcpQualification, mcpResourceNote } from "@/lib/mcp-contract";
import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/seo/config";
import { websiteContentInventory } from "@/lib/website-content";

/**
 * GET website content catalogue. Not a JSON-RPC/MCP execution endpoint.
 * Resource URLs resolve to public website representations.
 */

export async function GET() {
  try {
  const baseUrl = siteConfig.url;

  const allPassages = websiteContentInventory();

  const catalogue = {
    name: "Whats91 Website Content Catalogue",
    version: "2.0.0",
    kind: "website-content-catalogue",
    description: mcpResourceNote,
    allowed_methods: ["GET", "HEAD", "OPTIONS"],
    product_access: { status: "confirmation-required", information: `${baseUrl}/mcp`, qualification: mcpQualification, enquiry: `${baseUrl}/contact?subject=Whats91%20MCP%20Access` },
    resources: [
      { uri: `${baseUrl}/api/mcp/pages/whatsapp-templates`, name: "WhatsApp Template Examples", description: "Website examples; approval for your business is not assumed", mimeType: "application/json" },
      { uri: `${baseUrl}/api/mcp/pages/pricing`, name: "Message Pricing Conditions", description: metaPricingDescription, mimeType: "application/json" },
      { uri: `${baseUrl}/api/mcp/pages/whatsapp-api-cost-calculator`, name: "Message Cost Calculator Rules", description: metaPricingDescription, mimeType: "application/json" },
      { uri: `${baseUrl}/api/md/whatsapp-coexistence`, name: "Coexistence Conditions", description: "Website guide; not an account eligibility check", mimeType: "text/markdown" },
      { uri: `${baseUrl}/api/md/mcp`, name: "MCP Access and Availability", description: mcpQualification, mimeType: "text/markdown" },
    ],
    passages: {
      description: "Structured content passages for LLM consumption without DOM parsing",
      format: "application/json",
      pages: allPassages.map((page) => ({
        slug: page.slug,
        title: page.title,
        status: page.status,
        canonical: page.url,
        ...(page.indexHold && { index_status: "canonical-reader-index-hold" }),
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

  return NextResponse.json(catalogue, { headers: { ...contentHeaders(), "Content-Type": "application/json; charset=utf-8" } });
  } catch { return contentError("unavailable"); }
}
export const OPTIONS = contentOptions;
export const POST = contentMethodNotAllowed;
export const PUT = contentMethodNotAllowed;
export const PATCH = contentMethodNotAllowed;
export const DELETE = contentMethodNotAllowed;
