import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { createFlowExampleReader } from "@/lib/flows/read-example";

const idSchema = z.string().min(1).max(80);
const readExample = createFlowExampleReader(filename => fs.readFile(path.join(process.cwd(), "src/lib/flows/json", filename), "utf-8"));
export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const parsed = idSchema.safeParse((await params).id);
    const result = parsed.success ? await readExample(parsed.data) : { status: 404 as const, error: "Flow not found" };
    if (result.status !== 200) return NextResponse.json({ error: result.error }, { status: result.status, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
    return new NextResponse(result.text, { headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Content-Disposition": `attachment; filename="${result.id}.json"`,
      "Cache-Control": "public, max-age=300, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    } });
  } catch {
    return NextResponse.json({ error: "Example JSON unavailable. Retry later." }, { status: 503, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
  }
}
