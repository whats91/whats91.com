import { z } from "zod";
import { websiteContentInventory } from "@/lib/website-content";
import { contentOptions, contentMethodNotAllowed, contentError } from "@/lib/website-content-http";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string[] }> }) {
  try {
    const parsed = z.array(z.string().min(1).max(180)).min(1).max(10).safeParse((await params).slug);
    if (!parsed.success) return contentError("not-found");
    const path = "/" + parsed.data.join("/");
    const page = websiteContentInventory().find(item => new URL(item.url).pathname === path);
    return contentError("not-found", undefined, page ? `Use /api/md/${page.slug}; canonical reader: ${page.url}` : "MD endpoints use flat keys without slashes. Use /api/md/home or a listed key.");
  } catch { return contentError("unavailable"); }
}
export const OPTIONS = contentOptions;
export const POST = contentMethodNotAllowed;
export const PUT = contentMethodNotAllowed;
export const PATCH = contentMethodNotAllowed;
export const DELETE = contentMethodNotAllowed;
