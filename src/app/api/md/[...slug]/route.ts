import { NextResponse } from "next/server";

/**
 * Catch-all route for MD endpoints with nested paths
 * Returns JSON 404 instead of HTML 404 for paths like /api/md/solutions/marketing
 * 
 * Available slugs are flat (no slashes):
 * - busy-erp
 * - miracle-whatsapp-api
 * - chat-shortcuts-conversation-automation
 * - whatsapp-templates
 * - whatsapp-coexistence
 * - tools
 * - pricing
 * - google-sheets-integration
 * - chatbot-flows
 * - blog-{post-slug}
 */

const availableSlugs = [
  "busy-erp",
  "miracle-whatsapp-api",
  "chat-shortcuts-conversation-automation",
  "whatsapp-templates",
  "whatsapp-coexistence",
  "tools",
  "pricing",
  "google-sheets-integration",
  "chatbot-flows",
];

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const fullPath = slug.join("/");

  // Return JSON 404 with helpful information
  return NextResponse.json(
    {
      error: "Page not found",
      requested_path: fullPath,
      message: "MD endpoints use flat slugs without slashes",
      available_pages: availableSlugs,
      hint: `Use /api/md/${availableSlugs[0]} instead of nested paths. For blog posts, use /api/md/blog-{post-slug}`,
      example: `/api/md/${availableSlugs[0]}`,
    },
    {
      status: 404,
      headers: {
        "Content-Type": "application/json",
        "X-Robots-Tag": "noindex",
      },
    }
  );
}
