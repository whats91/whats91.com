import { retiredWebsiteOAuth, contentOptions, contentMethodNotAllowed } from "@/lib/website-content-http";

// Retired unsupported website advertisement; this is not an OAuth service.
export const GET = retiredWebsiteOAuth;
export const OPTIONS = contentOptions;
export const POST = contentMethodNotAllowed;
export const PUT = contentMethodNotAllowed;
export const PATCH = contentMethodNotAllowed;
export const DELETE = contentMethodNotAllowed;
