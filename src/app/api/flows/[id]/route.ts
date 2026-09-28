import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { getFlowById, FlowMetadata } from "@/lib/flows/registry";

// Cache for loaded flows
const flowCache = new Map<string, unknown>();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // Get flow metadata
  const flowMeta: FlowMetadata | undefined = getFlowById(id);
  
  if (!flowMeta) {
    return NextResponse.json(
      { error: "Flow not found", message: `No flow exists with id: ${id}` },
      { status: 404 }
    );
  }

  try {
    // Check cache first
    if (flowCache.has(id)) {
      return NextResponse.json(flowCache.get(id));
    }

    // Load JSON file
    const jsonPath = path.join(process.cwd(), "src/lib/flows/json", `${flowMeta.jsonFile}.json`);
    const fileContent = await fs.readFile(jsonPath, "utf-8");
    const flowData = JSON.parse(fileContent);

    // Cache the result
    flowCache.set(id, flowData);

    return NextResponse.json(flowData);
  } catch (error) {
    console.error(`Error loading flow ${id}:`, error);
    return NextResponse.json(
      { error: "Failed to load flow", message: "Could not read flow JSON file" },
      { status: 500 }
    );
  }
}

// GET /api/flows - List all flows metadata
export async function LIST() {
  const { flowRegistry } = await import("@/lib/flows/registry");
  return NextResponse.json(flowRegistry);
}
