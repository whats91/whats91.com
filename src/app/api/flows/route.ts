import { NextResponse } from "next/server";
import { flowRegistry, flowCategories } from "@/lib/flows/registry";

// GET /api/flows - List all flows metadata
export async function GET() {
  return NextResponse.json({
    categories: flowCategories,
    flows: flowRegistry,
    totalFlows: flowRegistry.length,
    totalCategories: flowCategories.length,
  });
}
