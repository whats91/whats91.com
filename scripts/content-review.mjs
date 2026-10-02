import { readFileSync, readdirSync, existsSync } from "node:fs";
import { resolve, relative, dirname } from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";
import { projectLoader } from "../tests/helpers/load-project-module.mjs";

const root = resolve(import.meta.dirname, "..");
const load = projectLoader();
const { fingerprint, publicRecord, reviewState } = load("src/lib/content/review.ts");
const { contentDates } = load("src/lib/content/dates.ts");

// Conservative source closure, normalized by the TS printer. Only governance is
// excluded; public publication/material dates and strings stay in the snapshot.
export function normalizedSource(filename, source) {
  const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
  const result = ts.transform(ast, [context => node => {
    const visit = current => {
      if (ts.isPropertyAssignment(current) && (ts.isIdentifier(current.name) || ts.isStringLiteral(current.name)) && current.name.text === "editorial") return undefined;
      if (ts.isImportDeclaration(current) && current.importClause?.isTypeOnly) return undefined;
      return ts.visitEachChild(current, visit, context);
    };
    return ts.visitNode(node, visit);
  }]);
  const text = ts.createPrinter({ removeComments: true }).printFile(result.transformed[0]);
  result.dispose();
  return text;
}
function resolveSource(from, specifier) {
  const base = specifier.startsWith("@/") ? resolve(root, "src", specifier.slice(2)) : specifier.startsWith(".") ? resolve(dirname(from), specifier) : undefined;
  if (!base) return;
  return [base, `${base}.ts`, `${base}.tsx`, resolve(base, "index.ts"), resolve(base, "index.tsx")].find(file => existsSync(file) && /\.(?:ts|tsx|css)$/.test(file));
}
export function sourceClosure(starts) {
  const parts = {};
  function visit(filename) {
    filename = resolve(root, filename);
    const key = relative(root, filename);
    if (key === "src/lib/content/review.ts" || key in parts) return;
    const source = readFileSync(filename, "utf8");
    if (filename.endsWith(".css")) { parts[key] = fingerprint(source); return; }
    parts[key] = fingerprint(normalizedSource(filename, source));
    const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
    function imports(node) {
      if (ts.isImportDeclaration(node) && node.importClause?.isTypeOnly) return;
      const specifier = (ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) ? node.moduleSpecifier : ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword ? node.arguments[0] : undefined;
      if (specifier && ts.isStringLiteral(specifier)) {
        const dependency = resolveSource(filename, specifier.text);
        if (dependency) visit(dependency);
        else if (specifier.text.startsWith("@/") || specifier.text.startsWith(".")) throw new Error(`Unresolved source dependency: ${key}: ${specifier.text}`);
      }
      ts.forEachChild(node, imports);
    }
    imports(ast);
  }
  starts.forEach(visit);
  return parts;
}
function mediaFiles(directory = resolve(root, "public")) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? mediaFiles(resolve(directory, entry.name)) : [resolve(directory, entry.name)]);
}
function sourceFiles(directory = resolve(root, "src")) {
  return readdirSync(directory, { withFileTypes: true }).flatMap(entry => entry.isDirectory() ? sourceFiles(resolve(directory, entry.name)) : /\.(ts|tsx)$/.test(entry.name) ? [resolve(directory, entry.name)] : []);
}
// Reverse import closure locates existing consumers rather than asking editors
// to maintain a second occurrence list for canonical structured records.
export function consumerGraph() {
  const imports = new Map();
  for (const file of sourceFiles()) {
    const ast = ts.createSourceFile(file, readFileSync(file, "utf8"), ts.ScriptTarget.Latest, true);
    const dependencies = [];
    function walk(node) {
      if (ts.isImportDeclaration(node) && node.importClause?.isTypeOnly) return;
      if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier && ts.isStringLiteral(node.moduleSpecifier)) {
        const dependency = resolveSource(file, node.moduleSpecifier.text);
        if (dependency) dependencies.push(dependency);
      }
      ts.forEachChild(node, walk);
    }
    walk(ast); imports.set(file, dependencies);
  }
  return canonical => {
    const reached = new Set([resolve(root, canonical)]);
    let changed = true;
    while (changed) {
      changed = false;
      for (const [file, dependencies] of imports) if (!reached.has(file) && dependencies.some(dependency => reached.has(dependency))) { reached.add(file); changed = true; }
    }
    return [...reached].map(file => relative(root, file)).filter(file => file !== canonical).sort();
  };
}
const blogConsumers = ["src/lib/blog/metadata.ts", "src/app/sitemap.ts", "src/app/feed.xml/route.ts", "src/app/api/md/[slug]/route.ts", "src/app/api/mcp/pages/[slug]/route.ts", "src/components/blog/BlogCard.tsx"];

export function inventory() {
  const posts = load("src/lib/blog/registry.ts").blogPosts;
  const authors = load("src/lib/blog/authors.ts").authors;
  const plans = Object.values(load("src/lib/plans.ts").plans);
  const legal = Object.entries(load("src/lib/legal/documents.ts")).filter(([, value]) => value?.sections && value?.effectiveDate);
  const records = [
    ...posts.map(record => ({ id: `blog:${record.slug}`, canonical: "src/lib/blog/registry.ts", record, consumers: [...blogConsumers, `src/app/blog/${record.slug}/page.tsx`, ...(existsSync(resolve(root, `src/app/blog/${record.slug}/layout.tsx`)) ? [`src/app/blog/${record.slug}/layout.tsx`] : [])] })),
    ...authors.map(record => ({ id: `author:${record.slug}`, canonical: "src/lib/blog/authors.ts", record, consumers: ["src/app/authors/[slug]/page.tsx", "src/app/authors/page.tsx", "src/app/sitemap.ts", ...blogConsumers] })),
    ...plans.map(record => ({ id: `plan:${record.id}`, canonical: "src/lib/plans.ts", record, consumers: ["src/app/plans/page.tsx", "src/app/checkout/page.tsx"] })),
    ...legal.map(([id, record]) => ({ id: `legal:${id}`, canonical: "src/lib/legal/documents.ts", record, consumers: ["src/components/legal/LegalDocument.tsx", "src/app/legal/page.tsx"] })),
  ];
  const consumersOf = consumerGraph();
  // Includes all local public assets conservatively, including assets whose URL
  // is computed. Remote media URL/name/alt/caption identity remains in sources.
  const media = Object.fromEntries(mediaFiles().map(file => [relative(root, file), fingerprint(readFileSync(file).toString("base64"))]));
  return {
    contract: "B10 source snapshot v1; read-only; no human event creation",
    fingerprintRule: "Public record plus root-layout and transitive consumer source plus all local public asset bytes. TS printer excludes internal editorial objects/type-only imports/comments/formatting; CSS bytes conservatively included. Public publication/material dates included. Remote media identities/alt/captions covered by source; remote bytes unverified. Shared-source/media coverage is conservative and can invalidate multiple records. No automatic freshness refresh.",
    records: records.map(({ id, canonical, record, consumers }) => {
      consumers = [...new Set([...consumers, ...consumersOf(canonical)])].sort();
      const source = sourceClosure(["src/app/layout.tsx", canonical, ...consumers]);
      const parts = { record: fingerprint(publicRecord(record)), ...Object.fromEntries(Object.entries(source).map(([path, hash]) => [`source:${path}`, hash])), ...Object.fromEntries(Object.entries(media).map(([path, hash]) => [`media:${path}`, hash])) };
      return { id, canonical, consumers, dates: contentDates(record), declaredDateAuthority: "Existing source labels; historical publication/material-update evidence and OI12 ownership remain pending", state: reviewState(record.editorial, parts), fingerprint: fingerprint(parts), parts, sourceHashes: source, mediaHashes: media, humanEvents: record.editorial?.history.length || 0, pendingClaims: record.editorial?.claims?.filter(claim => claim.status === "PENDING").map(claim => claim.id) || [] };
    }),
  };
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) process.stdout.write(`${JSON.stringify(inventory(), null, 2)}\n`);
