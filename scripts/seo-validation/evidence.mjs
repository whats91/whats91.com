// A bounded structural parser for server-emitted HTML/XML. It builds elements,
// attributes and text nodes; it does not execute JS or implement browser layout.
const VOID = new Set("area base br col embed hr img input link meta param source track wbr".split(" "));
const RAW = new Set(["script", "style"]);
const OMIT_TEXT = new Set(["script", "style", "template", "head"]);
const BLOCK_TEXT = new Set("p div section article header footer main h1 h2 h3 h4 h5 h6 li ul ol table tr td th dl dt dd br".split(" "));
export const PROD = "https://whats91.com";
export function decode(text) {
  const named = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
  return text.replace(/&(#x[\da-f]+|#\d+|amp|lt|gt|quot|apos|nbsp);/gi, (all, key) => {
    if (key[0] !== "#") return named[key.toLowerCase()] ?? all;
    const n = key[1].toLowerCase() === "x" ? parseInt(key.slice(2), 16) : Number(key.slice(1));
    return n > 0 && n <= 0x10ffff ? String.fromCodePoint(n) : "\ufffd";
  });
}
export function parseDocument(html) {
  const root = { tag: "#document", attrs: {}, children: [] };
  const stack = [root], elements = [], errors = [];
  let i = 0;
  const addText = (s) => stack.at(-1).children.push({ text: s });
  while (i < html.length) {
    const parent = stack.at(-1);
    if (RAW.has(parent.tag)) {
      const close = new RegExp(`</${parent.tag}\\s*>`, "ig");
      close.lastIndex = i;
      const m = close.exec(html);
      if (!m) { errors.push(`Unclosed ${parent.tag}`); addText(html.slice(i)); break; }
      addText(html.slice(i, m.index)); i = close.lastIndex; stack.pop(); continue;
    }
    if (html.startsWith("<!--", i)) {
      const end = html.indexOf("-->", i + 4);
      if (end < 0) { errors.push("Unclosed comment"); break; }
      i = end + 3; continue;
    }
    if (html[i] !== "<") {
      const end = html.indexOf("<", i);
      addText(html.slice(i, end < 0 ? html.length : end));
      i = end < 0 ? html.length : end; continue;
    }
    // Scan a tag with quote awareness, so > inside an attribute is not a boundary.
    let end = i + 1, quote = "";
    for (; end < html.length; end++) {
      const c = html[end];
      if (quote) { if (c === quote) quote = ""; }
      else if (c === '"' || c === "'") quote = c;
      else if (c === ">") break;
    }
    if (end === html.length) { errors.push("Unclosed tag"); break; }
    const token = html.slice(i + 1, end); i = end + 1;
    if (/^[!?]/.test(token)) continue;
    const match = /^(\/?)\s*([\w:-]+)([\s\S]*)$/.exec(token);
    if (!match) { errors.push("Unsupported tag token"); continue; }
    const tag = match[2].toLowerCase();
    if (match[1]) {
      const at = stack.findLastIndex((node) => node.tag === tag);
      if (at <= 0) errors.push(`Unmatched closing ${tag}`);
      else { if (at !== stack.length - 1) errors.push(`Misnested closing ${tag}`); stack.length = at; }
      continue;
    }
    const attrs = {};
    const rest = match[3].replace(/\/\s*$/, "");
    const pattern = /([^\s=/'"<>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s'"=<>]+)))?/g;
    let attr;
    while ((attr = pattern.exec(rest))) {
      const name = attr[1].toLowerCase();
      if (Object.hasOwn(attrs, name)) errors.push(`Duplicate attribute ${name}`);
      attrs[name] = decode(attr[2] ?? attr[3] ?? attr[4] ?? "");
    }
    const node = { tag, attrs, children: [], parent };
    parent.children.push(node); elements.push(node);
    if (!VOID.has(tag) && !/\/\s*$/.test(token)) stack.push(node);
  }
  if (stack.length > 1) errors.push(`Unclosed elements: ${stack.slice(1).map((n) => n.tag).join(", ")}`);
  return { root, elements, errors };
}
export function textContent(node, contentOnly = false) {
  if (node.text !== undefined) return decode(node.text);
  if (contentOnly && (OMIT_TEXT.has(node.tag) || Object.hasOwn(node.attrs, "hidden") || node.attrs["aria-hidden"] === "true")) return "";
  const children = contentOnly && node.tag === "details" && !Object.hasOwn(node.attrs, "open")
    ? node.children.filter((child) => child.tag === "summary") : node.children;
  const text = children.map((child) => textContent(child, contentOnly)).join("");
  return contentOnly && BLOCK_TEXT.has(node.tag) ? `\n${text}\n` : text;
}
const normalize = (s) => decode(s).replace(/\s+/g, " ").trim();
export const result = (check, target, status, detail) => ({ check, target, status, detail });
const assertion = (check, target, pass, detail) => result(check, target, pass ? "pass" : "fail", detail);
export function inventory(xml) {
  const doc = parseDocument(xml);
  if (doc.errors.length) throw new Error(`Sitemap parse: ${doc.errors.join("; ")}`);
  const roots = doc.root.children.filter((n) => n.tag);
  if (roots.length !== 1 || roots[0].tag !== "urlset") throw new Error("Expected one root urlset (sitemap indexes are unsupported)");
  const records = roots[0].children.filter((n) => n.tag === "url");
  if (!records.length) throw new Error("Empty sitemap inventory");
  const urls = records.map((record) => {
    const loc = record.children.filter((n) => n.tag === "loc");
    if (loc.length !== 1) throw new Error("Sitemap URL must have exactly one loc");
    const value = normalize(textContent(loc[0]));
    const url = new URL(value);
    if (url.origin !== PROD || url.username || url.password || url.search || url.hash || /^\/api(?:\/|$)|^\/(?:llms\.txt|feed\.xml)$/.test(url.pathname)) throw new Error(`Invalid sitemap URL ${value}`);
    return value;
  });
  if (new Set(urls.map((s) => new URL(s).href)).size !== urls.length) throw new Error("Duplicate sitemap URLs");
  return urls;
}
// Decode only JSON array arguments of Next's bootstrap calls; never evaluate JS.
export function buildIds(doc) {
  let stream = "";
  for (const script of doc.elements.filter((n) => n.tag === "script" && !n.attrs.src)) {
    const raw = script.children.map((n) => n.text ?? "").join("");
    for (const match of raw.matchAll(/self\.__next_f\.push\((\[1,"(?:\\.|[^"\\])*"\])\)/g)) {
      stream += JSON.parse(match[1])[1];
    }
  }
  const ids = [];
  for (const match of stream.matchAll(/0:\{/g)) {
    const start = match.index + 2;
    let depth = 0, quoted = false, escaped = false;
    for (let i = start; i < stream.length; i++) {
      const c = stream[i];
      if (quoted) { if (escaped) escaped = false; else if (c === "\\") escaped = true; else if (c === '"') quoted = false; }
      else if (c === '"') quoted = true;
      else if (c === "{") depth++;
      else if (c === "}" && --depth === 0) {
        const payload = JSON.parse(stream.slice(start, i + 1));
        if (typeof payload.b === "string" && Array.isArray(payload.f) && Array.isArray(payload.c)) ids.push(payload.b);
        break;
      }
    }
  }
  return [...new Set(ids)];
}
export function identity(doc, expected, target) {
  const ids = buildIds(doc);
  return result("build-identity", target, !ids.length ? "unavailable" : ids.length === 1 && ids[0] === expected ? "pass" : "fail", { expected, observed: ids });
}
export function metadata(doc, canonical) {
  const out = [], elements = doc.elements;
  const single = (label, nodes, value, expected) => {
    const values = nodes.map(value);
    let matches = expected === undefined;
    if (expected !== undefined) try { matches = new URL(values[0]).href === new URL(expected).href; } catch { matches = false; }
    out.push(assertion(label, canonical, values.length === 1 && !!values[0]?.trim() && matches, { count: values.length, values, ...(expected ? { expected } : {}) }));
  };
  single("canonical", elements.filter((n) => n.tag === "link" && (n.attrs.rel ?? "").toLowerCase().split(/\s+/).includes("canonical")), (n) => n.attrs.href ?? "", canonical);
  single("title", elements.filter((n) => n.tag === "title"), (n) => normalize(textContent(n)));
  single("h1", elements.filter((n) => n.tag === "h1"), (n) => normalize(textContent(n, true)));
  for (const [key, attribute] of [["description", "name"], ["og:title", "property"], ["og:image", "property"], ["twitter:card", "name"]]) {
    single(key, elements.filter((n) => n.tag === "meta" && n.attrs[attribute]?.toLowerCase() === key), (n) => n.attrs.content ?? "");
  }
  for (const n of elements.filter((n) => n.tag === "meta" && n.attrs.name === "google-site-verification")) {
    out.push(assertion("verification-token-placeholder", canonical, !!n.attrs.content && !/placeholder|your[-_ ]|replace[-_ ]/i.test(n.attrs.content), "Only obvious placeholders checked; ownership not verified"));
  }
  return out;
}
export function schemas(doc, target, { filteredFaqs = false } = {}) {
  const scripts = doc.elements.filter((n) => n.tag === "script" && n.attrs.type?.toLowerCase() === "application/ld+json");
  const rows = [assertion("schema-inventory", target, scripts.length > 0, { blocks: scripts.length })], nodes = [];
  scripts.forEach((script, index) => {
    const raw = script.children.map((n) => n.text ?? "").join("");
    try {
      const value = JSON.parse(raw);
      rows.push(result("schema-json-syntax", `${target}#block-${index + 1}`, "pass", "Valid JSON (not a schema certification)"));
      const roots = Array.isArray(value) ? value : [value];
      const typed = [];
      let contexts = true;
      for (const root of roots) {
        if (!root || typeof root !== "object" || !["https://schema.org", "http://schema.org", "https://schema.org/", "http://schema.org/"].includes(root["@context"])) contexts = false;
        typed.push(...(Array.isArray(root?.["@graph"]) ? root["@graph"] : [root]));
      }
      const meaningful = (n) => {
        if (!n || typeof n !== "object") return false;
        const types = Array.isArray(n["@type"]) ? n["@type"] : [n["@type"]];
        const descriptive = new Set(["name", "url", "description", "mainEntity", "itemListElement", "headline", "hasDefinedTerm"]);
        return types.length > 0 && types.every((t) => typeof t === "string" && /^[A-Za-z][A-Za-z0-9]*$/.test(t)) && Object.entries(n).some(([k, v]) => descriptive.has(k) && v !== null && v !== "" && (typeof v !== "object" || Object.keys(v).length > 0));
      };
      rows.push(assertion("schema-basic-structure", `${target}#block-${index + 1}`, contexts && typed.length > 0 && typed.every(meaningful), "Schema.org context, typed roots, and nonempty descriptive properties; vocabulary/factual validation remains not-checked"));
      nodes.push(...typed.filter((n) => n && typeof n === "object"));
    } catch (e) { rows.push(result("schema-json-syntax", `${target}#block-${index + 1}`, "fail", e.message)); }
  });
  const ids = nodes.map((n) => n["@id"]).filter(Boolean);
  rows.push(assertion("schema-root-id-uniqueness", target, ids.length === new Set(ids).size, ids));
  const defined = new Set(), references = new Set();
  const walk = (value) => {
    if (!value || typeof value !== "object") return;
    if (typeof value["@id"] === "string") {
      if (Object.keys(value).length === 1) references.add(value["@id"]);
      else defined.add(value["@id"]);
    }
    for (const child of Object.values(value)) if (Array.isArray(child)) child.forEach(walk); else if (child && typeof child === "object") walk(child);
  };
  nodes.forEach(walk);
  const unresolved = [...references].filter((id) => id.startsWith(PROD) && id.includes("#") && !defined.has(id));
  rows.push(assertion("schema-local-graph-references", target, !unresolved.length, { unresolved, scope: "Same-site fragment references must have a definition in this document; external references not fetched" }));
  const content = normalize(textContent(doc.root, true));
  const hasType = (n, type) => Array.isArray(n["@type"]) ? n["@type"].includes(type) : n["@type"] === type;
  for (const faq of nodes.filter((n) => hasType(n, "FAQPage"))) {
    const questions = faq.mainEntity;
    rows.push(assertion("faq-structure", target, Array.isArray(questions) && questions.length > 0 && questions.every((q) => hasType(q, "Question") && !!q.name && hasType(q.acceptedAnswer ?? {}, "Answer") && !!q.acceptedAnswer.text), "Nonempty questions and answers required"));
    if (Array.isArray(questions)) for (const q of questions) {
      const question = normalize(String(q.name ?? "")), answer = normalize(String(q.acceptedAnswer?.text ?? ""));
      const questionFound = !!question && content.includes(question), answerFound = !!answer && content.includes(answer);
      const isQuestionControl = (n) => n.tag === "button" && n.attrs["aria-expanded"] !== "true" || n.tag === "summary" && doc.elements.some((parent) => parent.tag === "details" && parent.children.includes(n));
      const questionButton = doc.elements.some((n) => isQuestionControl(n) && normalize(textContent(n, true)) === question);
      const filteredInventory = filteredFaqs && questions.some((other) => doc.elements.some((n) => isQuestionControl(n) && normalize(textContent(n, true)) === normalize(String(other.name ?? ""))));
      const status = questionFound && answerFound ? "pass" : !!question && !!answer && (questionFound && questionButton || !questionFound && filteredInventory) ? "not-checked" : "fail";
      rows.push(result("faq-content-consistency", target, status, { question, questionFound, answerFound, questionButton, filteredInventory, scope: status === "not-checked" ? "Question control or source-declared category filter found; disclosure expansion/category selection required (not verified)" : "Server text excluding scripts/styles/templates/hidden attributes; browser visibility not checked" }));
    }
  }
  return { rows, nodes, blocks: scripts.length };
}
export function internalLinks(doc, page) {
  const paths = new Set();
  for (const n of doc.elements.filter((n) => n.tag === "a" && n.attrs.href)) {
    const url = new URL(n.attrs.href, page);
    if (url.origin === PROD && !url.pathname.startsWith("/_next/") && !url.pathname.startsWith("/api/")) paths.add(url.pathname + url.search);
  }
  return [...paths];
}
export function exitCode(rows) {
  return rows.length && !rows.some((r) => ["fail", "unavailable"].includes(r.status)) && rows.some((r) => r.status === "pass") ? 0 : 1;
}
export async function fetchEvidence(url, { fetchImpl = fetch, timeoutMs = 10000, status = 200, type, allowEmpty = false, binary = false } = {}) {
  const controller = new AbortController();
  let timer;
  const timeout = new Promise((_, reject) => { timer = setTimeout(() => { controller.abort(); reject(new Error(`Timeout after ${timeoutMs}ms`)); }, timeoutMs); });
  try {
    const work = (async () => {
      const response = await fetchImpl(url, { signal: controller.signal, redirect: "manual", method: "GET" });
      if (response.status !== status) throw new Error(`HTTP ${response.status}, expected ${status}`);
      const contentType = response.headers.get("content-type") ?? "";
      if (type && !type.test(contentType)) throw new Error(`Unexpected content-type ${contentType}`);
      const body = binary ? new Uint8Array(await response.arrayBuffer()) : await response.text();
      if (!allowEmpty && (binary ? body.length === 0 : !body.trim())) throw new Error("Empty response body");
      return { body, headers: Object.fromEntries(response.headers), status: response.status, contentType };
    })();
    return await Promise.race([work, timeout]);
  } finally { clearTimeout(timer); }
}
