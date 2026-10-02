import { NextResponse } from "next/server";
import { websiteApiHeaders, websiteReadOnlyError } from '@/lib/website-policy';

export async function GET() {
  return NextResponse.json({ status: 'retired', message: 'This debug endpoint is retired. Public website content discovery is available separately.', information: '/api/mcp' }, { status: 410, headers: websiteApiHeaders() });
}
export function OPTIONS() { return new Response(null, { status: 204, headers: websiteApiHeaders() }); }
export const POST = websiteReadOnlyError;
export const PUT = websiteReadOnlyError;
export const PATCH = websiteReadOnlyError;
export const DELETE = websiteReadOnlyError;
