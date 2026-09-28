import fs from "fs";
import path from "path";

/**
 * Reads version.txt from the project root. Checks a few candidate paths
 * because process.cwd() differs between `next dev` (repo root) and the
 * standalone production server (.next/standalone, see ecosystem.config.cjs
 * and next.config.ts's outputFileTracingIncludes for version.txt).
 */
export function getAppVersion(): string {
  const candidates = [
    path.join(process.cwd(), "version.txt"),
    path.join(process.cwd(), "..", "..", "version.txt"),
  ];

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      const version = fs.readFileSync(candidate, "utf-8").trim();
      if (version) return version;
    }
  }

  return "0.0.0";
}
