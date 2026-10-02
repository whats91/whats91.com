import { releaseReadiness } from '@/lib/release-readiness';
import { websiteApiHeaders, websiteReadOnlyError } from '@/lib/website-policy';
export const runtime='nodejs';
export const dynamic='force-dynamic';
export async function GET() {
  try { return Response.json(await releaseReadiness(),{headers:websiteApiHeaders()}); }
  catch { return Response.json({status:'unavailable'},{status:503,headers:websiteApiHeaders()}); }
}
export function OPTIONS() { return new Response(null,{status:204,headers:websiteApiHeaders()}); }
export const POST=websiteReadOnlyError;
export const PUT=websiteReadOnlyError;
export const PATCH=websiteReadOnlyError;
export const DELETE=websiteReadOnlyError;
