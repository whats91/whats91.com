import { generateMarkdownHeader } from "@/lib/website-markdown";
import { getWebsiteContent } from "@/lib/website-content";
import { contentHeaders, contentOptions, contentMethodNotAllowed, contentError, contentSlug } from "@/lib/website-content-http";
import { NextResponse } from "next/server";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const parsed = contentSlug.safeParse((await params).slug);
    if (!parsed.success) return contentError("not-found");
    const result = getWebsiteContent(parsed.data);
    if (result.status !== "available") return contentError(result.status, result.status === "unavailable" ? result.url : undefined);
    const page = result.page;
    return new NextResponse(generateMarkdownHeader(page) + page.content, { headers: {
      ...contentHeaders(), "Content-Type": "text/markdown; charset=utf-8", Link: `<${page.url}>; rel="canonical"`,
    } });
  } catch { return contentError("unavailable"); }
}
export const OPTIONS = contentOptions;
export const POST = contentMethodNotAllowed;
export const PUT = contentMethodNotAllowed;
export const PATCH = contentMethodNotAllowed;
export const DELETE = contentMethodNotAllowed;
