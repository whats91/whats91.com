import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { projectLoader } from "./helpers/load-project-module.mjs";

const fixture = { slug: "fixture-post", title: "Fixture post", excerpt: "Synthetic website content", tags: [], category: "Fixture", readingTime: 1, seo: { keywords: [] }, isDraft: false };
const load = () => projectLoader(new Map([["@/lib/blog", { getAllPosts: () => [fixture], getPostBySlug: slug => slug === fixture.slug ? fixture : undefined }]]));
const routes = ["src/app/api/mcp/route.ts", "src/app/api/md/[slug]/route.ts", "src/app/api/mcp/pages/[slug]/route.ts", "src/app/.well-known/oauth-authorization-server/route.ts", "src/app/.well-known/protected-resource/route.ts"];
for (const path of routes) {
  test(`read-only method policy: ${path}`, async () => {
    const r = load()(path);
    const options = await r.OPTIONS();
    assert.equal(options.status, 204); assert.equal(await options.text(), "");
    assert.equal(options.headers.get("allow"), "GET, HEAD, OPTIONS");
    assert.equal(options.headers.get("access-control-allow-methods"), "GET, HEAD, OPTIONS");
    for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
      const response = await r[method](new Request("http://fixture.invalid/", { method, body: '{"jsonrpc":"2.0","method":"tools/call","params":{"name":"get_pricing"}}' }));
      assert.equal(response.status, 405); assert.equal(response.headers.get("allow"), "GET, HEAD, OPTIONS");
      assert.equal(response.headers.get("cache-control"), "no-store");
      assert.equal(response.headers.get("x-robots-tag"), "noindex");
      assert.equal((await response.json()).error, "Method not allowed");
    }
  });
}
test("catalogue contains concrete public resources and no executable or OAuth advertisements", async () => {
  const response = await load()(routes[0]).GET(); const data = await response.json();
  assert.equal(response.status, 200); assert.equal(data.kind, "website-content-catalogue");
  for (const key of ["tools", "capabilities", "protocolVersion", "authorization_servers", "issuer"]) assert.equal(Object.hasOwn(data, key), false);
  assert.deepEqual(data.allowed_methods, ["GET", "HEAD", "OPTIONS"]);
  assert.equal(data.passages.total, data.passages.pages.length);
  for (const uri of [...data.resources.map(r => r.uri), ...data.passages.pages.map(r => r.url)]) {
    const u = new URL(uri); assert.equal(u.origin, "https://whats91.com"); assert.match(u.pathname, /^\/api\/(?:md|mcp\/pages)\/[\w-]+$/);
  }
  assert.match(data.product_access.enquiry, /subject=Whats91%20MCP%20Access$/);
  assert.match(data.product_access.qualification, /20 July 2026/);
});
test("unsupported website OAuth metadata is retired without fabricated auth routes", async () => {
  for (const path of routes.slice(3)) {
    const response = await load()(path).GET(); assert.equal(response.status, 410);
    const data = await response.json(); assert.equal(data.status, "retired");
    for (const key of ["issuer", "authorization_endpoint", "token_endpoint", "jwks_uri", "scopes_supported", "authorization_servers", "resource"]) assert.equal(Object.hasOwn(data,key), false);
  }
  assert.equal(existsSync("public/.well-known/oauth-authorization-server"), false);
  assert.equal(existsSync("public/.well-known/protected-resource"), false);
});
test("MCP access alternate representations use the same qualifications and FAQ answers without invented dates", async () => {
  const l = load(), c = l("src/lib/mcp-contract.ts"), request = new Request("http://fixture.invalid/");
  const params = { params: Promise.resolve({ slug: "mcp" }) };
  const md = await l(routes[1]).GET(request, params), passages = await l(routes[2]).GET(request, params);
  const text = await md.text(), data = await passages.json();
  assert.equal(md.status, 200); assert.equal(md.headers.get("allow"), "GET, HEAD, OPTIONS"); assert.equal(md.headers.get("x-robots-tag"), "noindex"); assert.equal(passages.status, 200); assert.ok(text.includes(c.mcpMarkdown));
  assert.equal(data.sections[0].content, c.mcpMarkdown);
  for (const f of c.mcpFaqItems) assert.ok(data.sections.some(s => s.heading === f.q && s.content === f.a));
  assert.equal(data.updated_at, undefined); assert.equal(data.published_at, undefined);
  assert.equal(/publishedAt:|lastModified:/.test(text), false);
});
test("historical report retained while all card statuses require current access confirmation", () => {
  const l = load(), content = l("src/components/landing/mcp/mcpContent.ts");
  for (const list of [content.mcpClients, content.mcpCapabilities, content.mcpPrompts]) assert.ok(list.length && list.every(r => r.status === "confirm"));
  assert.match(readFileSync("src/components/landing/mcp/mcpContent.ts", "utf8"), /As of 2026-07-20 every capability and client below is confirmed/);
  assert.equal(content.mcpAccess.primaryHref, "/contact?subject=Whats91%20MCP%20Access");
});
