import { readFileSync, existsSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve, dirname } from "node:path";
import ts from "typescript";

// Load actual TypeScript helpers with capability-free mocks, not duplicated logic.
export function projectLoader(mocks = new Map(), transform = (_filename, source) => source) {
  const root = resolve(import.meta.dirname, "../..");
  const cache = new Map();
  function load(relative) {
    let filename = resolve(root, relative);
    if (!existsSync(filename)) filename += ".ts";
    if (cache.has(filename)) return cache.get(filename).exports;
    const compiledModule = { exports: {} }; cache.set(filename, compiledModule);
    const source = transform(filename, readFileSync(filename, "utf8"));
    const code = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true }, fileName: filename }).outputText;
    const nativeRequire = createRequire(filename);
    const require = (name) => mocks.has(name) ? mocks.get(name) : name.startsWith("@/") ? load(`src/${name.slice(2)}`) : name.startsWith(".") ? load(resolve(dirname(filename), name)) : nativeRequire(name);
    new Function("require", "module", "exports", code)(require, compiledModule, compiledModule.exports);
    return compiledModule.exports;
  }
  return load;
}
