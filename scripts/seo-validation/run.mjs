import { readFileSync, writeFileSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { PROD, parseDocument, textContent, inventory, identity, metadata, schemas, internalLinks, result, exitCode, fetchEvidence } from "./evidence.mjs";

const MODES = ["all", "crawl", "links", "schema", "endpoints", "readiness"];
export async function validate({ base, expected, mode = "all", fetchImpl = fetch, timeoutMs = 10000 }) {
  const rows = [], requests = [], cache = new Map(), pages = new Map();
  const wants = (name) => mode === "all" || mode === name || mode === "readiness" && name === "schema";
  const add = (check, target, pass, detail) => rows.push(result(check, target, pass ? "pass" : "fail", detail));
  const get = async (path, options = {}) => {
    // Every URL is remapped to the authorized loopback origin. No external fetches.
    const url = new URL(path, base);
    if (url.origin !== new URL(base).origin) throw new Error("External fetch refused");
    const key = `${url.href}:${JSON.stringify(options)}`;
    if (!cache.has(key)) {
      const promise = fetchEvidence(url.href, { fetchImpl, timeoutMs, ...options });
      cache.set(key, promise);
      try {
        const response = await promise;
        requests.push({ url: url.href, status: response.status, contentType: response.contentType, bytes: typeof response.body === "string" ? Buffer.byteLength(response.body) : response.body.length });
      } catch (e) { requests.push({ url: url.href, error: e.message }); throw e; }
    }
    return cache.get(key);
  };
  const unavailable = (check, target, error) => rows.push(result(check, target, "unavailable", error.message));
  const blocked = (detail) => {
    for (const check of MODES.filter((n) => n !== "all" && wants(n))) rows.push(result(check, base, "not-checked", detail));
  };
  let home;
  try {
    if (!expected?.trim()) throw new Error("Expected build ID is required");
    home = parseDocument((await get("/", { type: /text\/html/i })).body);
    const proof = identity(home, expected, base);
    rows.push(proof);
    if (proof.status !== "pass") { blocked("Build identity was not confirmed"); return { base, expectedBuildId: expected, mode, rows, requests }; }
  } catch (e) { unavailable("build-identity", base, e); blocked("Homepage/build identity unavailable"); return { base, expectedBuildId: expected, mode, rows, requests }; }
  let urls;
  try { urls = inventory((await get("/sitemap.xml", { type: /(?:application|text)\/(?:xml|.+\+xml)/i })).body); add("sitemap-inventory", base, true, { urls: urls.length }); }
  catch (e) { unavailable("sitemap-inventory", base, e); blocked("Required sitemap inventory unavailable"); return { base, expectedBuildId: expected, mode, rows, requests }; }
  const titles = new Map(), links = new Set();
  // Endpoint-only mode still checks a nonempty sitemap; other modes inspect HTML.
  if (mode !== "endpoints") for (const url of urls) {
    const path = new URL(url).pathname;
    try {
      const doc = path === "/" ? home : parseDocument((await get(path, { type: /text\/html/i })).body);
      const proof = identity(doc, expected, url); rows.push(proof);
      if (proof.status !== "pass") { rows.push(result("page-evidence", url, "not-checked", "Page build identity not confirmed")); continue; }
      pages.set(path, doc);
      add("html-structure", url, !doc.errors.length, doc.errors);
      add("page-fetch", url, true, "HTTP 200, nonempty HTML, confirmed build");
      if (wants("crawl")) {
        rows.push(...metadata(doc, url));
        const title = doc.elements.find((n) => n.tag === "title");
        if (title) { const value = textContent(title).trim(); titles.set(value, [...(titles.get(value) ?? []), url]); }
      }
      // FAQBrowser renders one active category. Missing filtered entries require
      // a browser check, not a claim that their content is absent from the site.
      if (wants("schema")) rows.push(...schemas(doc, url, { filteredFaqs: path === "/faq" }).rows);
      if (wants("links")) for (const path of internalLinks(doc, url)) links.add(path);
    } catch (e) { unavailable("page-evidence", url, e); }
  }
  if (wants("crawl")) add("unique-page-titles", base, titles.size > 0 && [...titles.values()].every((urls) => urls.length === 1), [...titles.entries()].filter(([, urls]) => urls.length > 1));
  if (wants("links")) {
    add("internal-link-inventory", base, links.size > 0, { paths: links.size });
    for (const path of [...links].sort()) {
      try { await get(path); add("internal-link-get", path, true, "HTTP 200, nonempty body; fragments, external destinations and hydrated links not checked"); }
      catch (e) { unavailable("internal-link-get", path, e); }
    }
  }
  if (wants("schema")) {
    rows.push(result("schema-semantic-certification", base, "not-checked", "Basic structure and FAQ/server-text consistency are checked. Full Schema.org vocabulary, factual truth, ratings/prices/brand claims and browser visibility require independent evidence."));
    rows.push(result("search-feature-eligibility", base, "not-checked", "Valid JSON and local consistency do not establish Google rich-result eligibility, ranking or AI discovery."));
  }
  if (wants("endpoints") || wants("readiness")) {
    const checkEndpoint = async (path, check, options, assertion) => {
      try { const response = await get(path, options); const detail = assertion(response); add(check, path, detail.pass, detail.detail); }
      catch (e) { unavailable(check, path, e); }
    };
    await checkEndpoint("/robots.txt", "robots-policy", { type: /text\/plain/i }, ({ body }) => {
      const lines = body.split(/\r?\n/).map((s) => s.trim());
      const expected = ["Allow: /api/md/", "Allow: /api/mcp", "Disallow: /api/", `Sitemap: ${PROD}/sitemap.xml`];
      const missing = expected.filter((s) => !lines.includes(s));
      return { pass: !missing.length, detail: { missing, scope: "Presence of project policy lines, not full user-agent precedence evaluation" } };
    });
    for (const [slug, path] of [["busy-erp", "/solutions/busy-erp"], ["miracle-whatsapp-api", "/solutions/miracle-whatsapp-api"], ["chat-shortcuts-conversation-automation", "/features/chat-shortcuts-conversation-automation"], ["whats91-coins", "/partners/whats91-coins"], ["whatsapp-templates", "/whatsapp-templates"], ["pricing", "/pricing"], ["blog-whatsapp-cloud-api-complete-guide-2026", "/blog/whatsapp-cloud-api-complete-guide-2026"]]) {
      await checkEndpoint(`/api/md/${slug}`, "markdown-twin", { type: /text\/markdown/i }, ({ body, headers }) => {
        const canonical = `${PROD}${path}`;
        const matches = [...(headers.link ?? "").matchAll(/<([^>]+)>\s*;\s*rel="?canonical"?/gi)].map((m) => m[1]);
        return { pass: matches.length === 1 && matches[0] === canonical && !/\bindex\b/i.test(headers["x-robots-tag"] ?? ""), detail: { canonical, observed: matches, bytes: Buffer.byteLength(body), xRobotsTag: headers["x-robots-tag"] ?? null } };
      });
    }
    for (const path of ["/api/mcp", "/api/mcp/pages/busy-erp"]) await checkEndpoint(path, "mcp-evidence", { type: /application\/json/i }, ({ body, headers }) => {
      const data = JSON.parse(body);
      return { pass: !!data && typeof data === "object" && Object.keys(data).length > 0 && /\bnoindex\b/i.test(headers["x-robots-tag"] ?? "") && headers["access-control-allow-origin"] === "*", detail: { jsonKeys: Object.keys(data ?? {}), noindex: headers["x-robots-tag"], cors: headers["access-control-allow-origin"] } };
    });
    await checkEndpoint("/og-image.png", "og-image", { type: /^image\/png(?:;|$)/i, binary: true }, ({ body }) => ({ pass: Buffer.from(body.slice(0, 8)).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])), detail: { bytes: body.length, scope: "PNG signature, not visual quality" } }));
    await checkEndpoint("/api/seo-check", "retired-seo-route", { status: 405, allowEmpty: true }, ({ headers }) => ({ pass: /no-store/i.test(headers["cache-control"] ?? ""), detail: "GET remains 405/private no-store; POST is not exercised" }));
    rows.push(result("remote-seo-scoring", "/api/seo-check", "unavailable", "B03 intentionally retired this capability; unavailable is expected and excluded from the local-check exit gate"));
  }
  if (wants("readiness")) {
    for (const [path, required] of [["/", ["Organization", "WebSite", "WebPage", "FAQPage"]], ["/pricing", ["FAQPage", "BreadcrumbList"]], ["/tools/whatsapp-api-cost-calculator", ["FAQPage", "BreadcrumbList", "SoftwareApplication"]]]) {
      const doc = pages.get(path);
      if (!doc) { rows.push(result("readiness-types", path, "unavailable", "Required page missing from inventory or evidence unavailable")); continue; }
      const nodes = schemas(doc, path).nodes;
      const types = new Set(nodes.flatMap((n) => n["@type"] ?? []));
      add("readiness-types", path, required.every((type) => types.has(type)), { required, observed: [...types], scope: "Current page-scoped entity contract; no Service, Product, price, rating or BSP assertion is manufactured" });
    }
    const calc = pages.get("/tools/whatsapp-api-cost-calculator");
    if (calc) {
      const numericInputs = calc.elements.filter((n) => n.tag === "input" && (n.attrs.type === "number" || n.attrs.type === "text" && n.attrs.inputmode === "numeric") && !!n.attrs.id && calc.elements.some(label => label.tag === "label" && label.attrs.for === n.attrs.id)).length;
      const categories = ["Marketing", "Utility", "Authentication", "Service"].map((name) => ({ name, found: textContent(calc.root, true).includes(name) }));
      add("calculator-rendered-controls", "/tools/whatsapp-api-cost-calculator", numericInputs === 4 && categories.every((c) => c.found), { numericInputs, categories, scope: "Four labelled numeric quantity controls (native number or B23 validated text/numeric-inputmode); calculations and rates are not certified" });
    }
    try {
      const response = await get("/llms.txt", { type: /text\/plain/i });
      const required = ["/tools/whatsapp-api-cost-calculator", "/blog/whatsapp-cloud-api-pricing-india-2026"];
      const links = [...response.body.matchAll(/\]\(([^)\s]+)\)/g)].map((m) => new URL(m[1], PROD).href);
      add("llms-discovery-links", "/llms.txt", required.every((path) => links.includes(`${PROD}${path}`)), { required, scope: "Markdown links resolved relative to production origin; claims not verified" });
    } catch (e) { unavailable("llms-discovery-links", "/llms.txt", e); }
    rows.push(result("current-pricing-and-ai-readiness", base, "not-checked", "Rates, official-status claims, model behavior and search readiness need dated owner/provider evidence; endpoint presence is not a score."));
  }
  return { base, expectedBuildId: expected, mode, sitemapUrls: urls.length, htmlPages: pages.size, internalLinks: links.size, rows, requests };
}
export function reportExitCode(report) {
  return exitCode(report.rows.filter((r) => r.check !== "remote-seo-scoring"));
}
export async function main(forcedMode) {
  const args = process.argv.slice(2), mode = forcedMode ?? args.shift();
  const base = args[0]?.startsWith("http") ? args.shift() : "http://127.0.0.1:4305";
  let expected, output, timeoutMs = 10000;
  try {
    if (!MODES.includes(mode)) throw new Error(`Mode must be ${MODES.join(", ")}`);
    const url = new URL(base);
    if (url.protocol !== "http:" || !["127.0.0.1", "localhost", "[::1]"].includes(url.hostname) || url.pathname !== "/" || url.search || url.hash || url.username || url.password) throw new Error("Only an HTTP loopback origin is permitted");
    while (args.length) {
      const flag = args.shift(), value = args.shift();
      if (!value) throw new Error(`Missing value for ${flag}`);
      if (flag === "--expected-build-id") expected = value;
      else if (flag === "--output") output = value;
      else if (flag === "--timeout-ms") timeoutMs = Number(value);
      else throw new Error(`Unknown argument ${flag}`);
    }
    if (!Number.isInteger(timeoutMs) || timeoutMs <= 0) throw new Error("Positive timeout required");
    expected ??= readFileSync(".next/BUILD_ID", "utf8").trim();
    const report = await validate({ base, expected, mode, timeoutMs });
    report.startedAgainst = "Production-mode App Router bootstrap build identity; not a source-to-build or deployment proof";
    report.completedAt = new Date().toISOString();
    report.exitCode = reportExitCode(report);
    report.counts = Object.fromEntries(["pass", "fail", "not-checked", "unavailable"].map((status) => [status, report.rows.filter((r) => r.status === status).length]));
    if (output) writeFileSync(output, JSON.stringify(report, null, 2) + "\n");
    for (const row of report.rows.filter((r) => r.status !== "pass")) console.log(`${row.status.toUpperCase()} ${row.check} ${row.target}: ${JSON.stringify(row.detail)}`);
    console.log(JSON.stringify({ mode, base, expectedBuildId: expected, sitemapUrls: report.sitemapUrls, htmlPages: report.htmlPages, counts: report.counts, exitCode: report.exitCode }));
    process.exitCode = report.exitCode;
    return report;
  } catch (e) { console.error(`UNAVAILABLE validator configuration: ${e.message}`); process.exitCode = 1; }
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
