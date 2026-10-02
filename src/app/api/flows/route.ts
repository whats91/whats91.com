import { NextResponse } from "next/server";
import { flowRegistry, flowCategories } from "@/lib/flows/registry";
import { flowResourceScope } from "@/lib/resource-content";

export async function GET() {
  try {
    return NextResponse.json({ categories: flowCategories, flows: flowRegistry, totalFlows: flowRegistry.length, totalCategories: flowCategories.length, scope: flowResourceScope }, { headers: { "Cache-Control": "public, max-age=300, must-revalidate", "X-Content-Type-Options": "nosniff" } });
  } catch {
    return NextResponse.json({ error: "Example catalogue unavailable" }, { status: 503, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
  }
}
