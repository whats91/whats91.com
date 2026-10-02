import { NextResponse } from 'next/server';
import { publicBuildVersion, websiteApiHeaders, websiteReadOnlyError } from '@/lib/website-policy';

export async function GET() {
  try {
    const version = publicBuildVersion(process.env.NEXT_PUBLIC_APP_VERSION);
    if (!version) return NextResponse.json({ error: 'Version unavailable' }, { status: 503, headers: websiteApiHeaders() });
    return NextResponse.json({ version }, { headers: websiteApiHeaders() });
  } catch {
    return NextResponse.json({ error: 'Version unavailable' }, { status: 503, headers: websiteApiHeaders() });
  }
}
export function OPTIONS() { return new Response(null, { status: 204, headers: websiteApiHeaders() }); }
export const POST = websiteReadOnlyError;
export const PUT = websiteReadOnlyError;
export const PATCH = websiteReadOnlyError;
export const DELETE = websiteReadOnlyError;
