import { z } from "zod";
import { availableWebsiteSlugs } from "./website-content";

/** Public website content only. No authorisation or tool execution. */
export const contentMethods = "GET, HEAD, OPTIONS";
export function contentHeaders(cache = "public, max-age=3600, s-maxage=3600") {
  return {
    Allow: contentMethods,
    "X-Content-Type-Options": "nosniff",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": contentMethods,
    "Cache-Control": cache,
    "X-Robots-Tag": "noindex",
  };
}
export function contentOptions() {
  return new Response(null, { status: 204, headers: contentHeaders() });
}
export function contentMethodNotAllowed() {
  return Response.json({ error: "Method not allowed", allowed_methods: ["GET", "HEAD", "OPTIONS"], message: "This website endpoint does not execute MCP tools or authorise account access." }, { status: 405, headers: contentHeaders("no-store") });
}
export function retiredWebsiteOAuth() {
  return Response.json({ status: "retired", message: "Unsupported website OAuth metadata has been retired. This website does not advertise an OAuth issuer or protected account resource. Request verified product connection instructions from our team.", information: "/mcp", access_enquiry: "/contact?subject=Whats91%20MCP%20Access" }, { status: 410, headers: contentHeaders("no-store") });
}

export const contentSlug = z.string().max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
export function contentError(status: "not-found" | "unavailable", url?: string, hint?: string) {
  let available: string[] = [];
  try { available = availableWebsiteSlugs(); } catch { /* A source outage must still return a bounded error. */ }
  return Response.json({ error: status === "not-found" ? "Page not found" : "Content unavailable",
    status, available_pages: available, information: url || "/blog", ...(hint && { hint }),
    message: status === "unavailable" ? "The alternate content is unavailable. Read the canonical page or browse the website." : "Use a supported flat content key or browse the website.",
  }, { status: status === "not-found" ? 404 : 503, headers: {
    ...contentHeaders("no-store"), "Content-Type": "application/json; charset=utf-8", ...(url && { Link: `<${url}>; rel="canonical"` }),
  } });
}
