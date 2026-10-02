import { getFlowById } from "./registry";

export function createFlowExampleReader(read: (filename: string) => Promise<string>) {
  const cache = new Map<string, string>();
  return async (id: string) => {
    const meta = getFlowById(id);
    // Selection is allowlisted before cache lookup or filesystem capability use.
    if (!meta) return { status: 404 as const, error: "Flow not found" };
    try {
      let text = cache.get(meta.id);
      if (!text) {
        text = await read(`${meta.jsonFile}.json`);
        const data = JSON.parse(text);
        if (!data || typeof data !== "object" || Array.isArray(data) || !Array.isArray(data.nodes) || !Array.isArray(data.edges)) throw new Error("Invalid example record");
        cache.set(meta.id, text);
      }
      return { status: 200 as const, id: meta.id, text };
    } catch {
      return { status: 503 as const, error: "Example JSON unavailable. Retry later." };
    }
  };
}
