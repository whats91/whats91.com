import { getWebsiteContent, websitePassages } from "@/lib/website-content";
import { contentHeaders, contentOptions, contentMethodNotAllowed, contentError, contentSlug } from "@/lib/website-content-http";
import { NextResponse } from "next/server";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const parsed = contentSlug.safeParse((await params).slug);
    if (!parsed.success) return contentError("not-found");
    const result = getWebsiteContent(parsed.data);
    if (result.status !== "available") return contentError(result.status, result.status === "unavailable" ? result.url : undefined);
    return NextResponse.json(websitePassages(result.page), { headers: {
      ...contentHeaders(), "Content-Type": "application/json; charset=utf-8", Link: `<${result.page.url}>; rel="canonical"`,
    } });
  } catch { return contentError("unavailable"); }
}
export const OPTIONS = contentOptions;
export const POST = contentMethodNotAllowed;
export const PUT = contentMethodNotAllowed;
export const PATCH = contentMethodNotAllowed;
export const DELETE = contentMethodNotAllowed;
