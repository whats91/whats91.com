import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import Module from "node:module";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const routePath = resolve(projectRoot, "src/app/api/seo-check/route.ts");
const blockedModules = new Set([
  "dns",
  "http",
  "https",
  "net",
  "node:dns",
  "node:http",
  "node:https",
  "node:net",
  "node:tls",
  "tls",
  "undici",
]);

function loadRetiredSEOCheckRoute() {
  const source = readFileSync(routePath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: routePath,
  });

  const forbiddenImports = [];
  const originalLoad = Module._load;
  Module._load = function blockNetworkCapabilities(request, parent, isMain) {
    if (blockedModules.has(request)) {
      forbiddenImports.push(request);
      throw new Error(`Retired SEO check imported network capability: ${request}`);
    }
    return originalLoad.call(this, request, parent, isMain);
  };

  try {
    const routeModule = new Module(routePath);
    routeModule.filename = routePath;
    routeModule.paths = Module._nodeModulePaths(dirname(routePath));
    routeModule._compile(transpiled.outputText, routePath);
    return { handlers: routeModule.exports, forbiddenImports, source };
  } finally {
    Module._load = originalLoad;
  }
}

function assertNoStore(response) {
  assert.equal(response.headers.get("cache-control"), "private, no-store, max-age=0");
  assert.equal(response.headers.get("pragma"), "no-cache");
  assert.equal(response.headers.get("allow"), "POST, OPTIONS");
}

async function assertUnavailable(handler, request) {
  const response = await handler(request);
  assert.equal(response.status, 410);
  assertNoStore(response);
  assert.equal(response.headers.get("content-type"), "application/json; charset=utf-8");
  assert.deepEqual(await response.json(), {
    success: false,
    error: "SEO check is unavailable",
  });
}

test("retired SEO check never performs network access or fabricates results", { concurrency: false }, async () => {
  const networkCalls = [];
  const messages = [];
  const originalFetch = globalThis.fetch;
  const originalError = console.error;
  const originalLog = console.log;

  globalThis.fetch = async (...args) => {
    networkCalls.push(args);
    throw new Error("Network access is blocked in this test");
  };
  console.error = (...args) => messages.push(["error", ...args]);
  console.log = (...args) => messages.push(["log", ...args]);

  try {
    const { handlers, forbiddenImports, source } = loadRetiredSEOCheckRoute();

    assert.equal(typeof handlers.GET, "function");
    assert.equal(typeof handlers.HEAD, "function");
    assert.equal(typeof handlers.POST, "function");
    assert.equal(typeof handlers.OPTIONS, "function");

    const postRequests = [
      new Request("https://whats91.test/api/seo-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: "http://127.0.0.1:4010/private" }),
      }),
      new Request("https://whats91.test/api/seo-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: "http://169.254.169.254/latest/meta-data" }),
      }),
      new Request("https://whats91.test/api/seo-check", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "url=https%3A%2F%2Fuser%3Asecret%40example.test%2Fredirect",
      }),
      new Request("https://whats91.test/api/seo-check", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: "not valid JSON",
      }),
      new Request("https://whats91.test/api/seo-check", { method: "POST" }),
    ];

    for (const request of postRequests) {
      await assertUnavailable(handlers.POST, request);
    }

    const getResponse = await handlers.GET(
      new Request("https://whats91.test/api/seo-check?url=http://127.0.0.1/private"),
    );
    assert.equal(getResponse.status, 405);
    assertNoStore(getResponse);
    assert.equal(getResponse.headers.get("content-type"), null);
    assert.equal(await getResponse.text(), "");

    const headResponse = await handlers.HEAD(
      new Request("https://whats91.test/api/seo-check", { method: "HEAD" }),
    );
    assert.equal(headResponse.status, 405);
    assertNoStore(headResponse);
    assert.equal(headResponse.headers.get("content-type"), null);
    assert.equal(await headResponse.text(), "");

    const optionsResponse = await handlers.OPTIONS();
    assert.equal(optionsResponse.status, 204);
    assertNoStore(optionsResponse);
    assert.equal(optionsResponse.headers.get("content-type"), null);
    assert.equal(await optionsResponse.text(), "");

    assert.deepEqual(networkCalls, []);
    assert.deepEqual(forbiddenImports, []);
    assert.deepEqual(messages, []);
    assert.doesNotMatch(source, /\bfetch\b|AbortSignal|User-Agent|request\.(json|formData|text|arrayBuffer)\s*\(/);
    assert.doesNotMatch(source, /overallScore|recommendations|checks|loadTime/);
  } finally {
    globalThis.fetch = originalFetch;
    console.error = originalError;
    console.log = originalLog;
  }
});
