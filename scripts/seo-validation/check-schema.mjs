#!/usr/bin/env node
// Parse every JSON-LD block on every sitemap page as strict JSON, and assert
// the homepage entity policy:
//   exactly one top-level Organization / WebSite / WebPage / SoftwareApplication
//   / FAQPage; zero Product entities; zero price:"0" offers; zero SearchAction;
//   zero `award`; no duplicate @id; @id references resolve within the graph;
//   visible FAQ questions match the FAQPage JSON-LD.
// Usage: node scripts/seo-validation/check-schema.mjs [base_url]
// Exit code: 0 = pass, 1 = failures. Uses only Node built-ins (global fetch).

const BASE = process.argv[2] || "http://localhost:3000";
const PROD = "https://whats91.com";
let failures = 0;
const fail = (msg) => { failures++; console.log("FAIL " + msg); };

const sm = await (await fetch(`${BASE}/sitemap.xml`)).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
if (urls.length === 0) { console.log("FATAL: empty sitemap"); process.exit(1); }

const extractJsonLd = (html) =>
  [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);

// ---- 1. every block on every page parses as JSON ----
let blockCount = 0;
for (const prodUrl of urls) {
  const path = prodUrl.replace(PROD, "") || "/";
  const html = await (await fetch(BASE + path)).text();
  for (const [i, raw] of extractJsonLd(html).entries()) {
    blockCount++;
    try { JSON.parse(raw); } catch (e) { fail(`${path} JSON-LD block ${i} unparseable: ${e.message}`); }
  }
}
console.log(`parsed ${blockCount} JSON-LD blocks across ${urls.length} pages`);

// ---- 2. homepage entity policy ----
const home = await (await fetch(BASE + "/")).text();
const roots = [];
for (const raw of extractJsonLd(home)) {
  try {
    const obj = JSON.parse(raw);
    if (Array.isArray(obj["@graph"])) roots.push(...obj["@graph"]);
    else if (Array.isArray(obj)) roots.push(...obj);
    else roots.push(obj);
  } catch { /* counted above */ }
}
const topCounts = {};
for (const r of roots) topCounts[r["@type"]] = (topCounts[r["@type"]] || 0) + 1;
console.log("homepage top-level entities:", JSON.stringify(topCounts));

for (const [type, expected] of [
  ["Organization", 1], ["WebSite", 1], ["WebPage", 1], ["SoftwareApplication", 1], ["FAQPage", 1],
]) {
  if ((topCounts[type] || 0) !== expected) fail(`homepage top-level ${type}: ${topCounts[type] || 0}, expected ${expected}`);
}

const homeStr = JSON.stringify(roots);
if (homeStr.includes('"@type":"Product"')) fail("homepage contains a Product entity");
if (/"price":"0"/.test(homeStr)) fail('homepage contains a price:"0" offer');
if (homeStr.includes("SearchAction")) fail("homepage contains a SearchAction");
if (homeStr.includes('"award"')) fail("homepage contains an award assertion");

// duplicate @id detection (top-level entities)
const ids = roots.map((r) => r["@id"]).filter(Boolean);
const dupIds = ids.filter((id, i) => ids.indexOf(id) !== i);
if (dupIds.length) fail("duplicate top-level @id: " + [...new Set(dupIds)].join(", "));

// @id reference resolution within the homepage graph
const defined = new Set(ids);
const refs = new Set();
const collectRefs = (node) => {
  if (Array.isArray(node)) return node.forEach(collectRefs);
  if (node && typeof node === "object") {
    const keys = Object.keys(node);
    if (keys.length === 1 && keys[0] === "@id") refs.add(node["@id"]);
    keys.forEach((k) => collectRefs(node[k]));
  }
};
roots.forEach((r) => Object.values(r).forEach(collectRefs));
for (const ref of refs) if (!defined.has(ref)) fail(`@id reference does not resolve in graph: ${ref}`);

// ---- 3. visible FAQ text matches FAQPage JSON-LD ----
const faqEntity = roots.find((r) => r["@type"] === "FAQPage");
if (faqEntity) {
  for (const q of faqEntity.mainEntity || []) {
    const name = q.name || "";
    if (!home.includes(name.replace(/&/g, "&amp;")) && !home.includes(name))
      fail(`FAQ question in JSON-LD not found in visible HTML: "${name}"`);
  }
  console.log(`FAQ sync: ${(faqEntity.mainEntity || []).length} questions checked against visible HTML`);
}

console.log("---");
console.log("failures: " + failures);
process.exit(failures === 0 ? 0 : 1);
