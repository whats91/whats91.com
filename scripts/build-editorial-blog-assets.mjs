import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Run one slug at a time, after its generated sources and copy have been reviewed.
const jobs = {
  "busy-erp-google-sheets-integration-complete-guide": {
    evidence: "busy-erp-google-sheets-redesign-2026-10-02",
    cover: "cover.webp",
    body: "validate-rows.webp",
    bodyTarget: "validate-rows-refined-2026-10-watermarked.webp",
  },
  "whatsapp-graph-api-v24-to-v25-transition-guide": {
    evidence: "graph-api-migration-redesign-2026-10-02",
    cover: "cover.webp",
    body: "body-desktop.png",
    bodyEvidence: true,
    bodyTarget: "migration-gates-refined-2026-10-watermarked.webp",
  },
  "whatsapp-username-system-2026-complete-guide": {
    evidence: "username-guide-redesign-2026-10-02",
    cover: "cover.webp",
    body: "body-desktop.png",
    bodyEvidence: true,
    bodyTarget: "identity-mapping-refined-2026-10-watermarked.webp",
  },
  "whatsapp-plus-launch-2026-premium-subscription-guide": {
    evidence: "whatsapp-plus-redesign-2026-10-02",
    cover: "cover.webp",
    body: "offer-check.webp",
    bodyTarget: "offer-check-refined-2026-10-watermarked.webp",
  },
  "whatsapp-web-6-hour-logout-unofficial-api-migration-guide": {
    evidence: "web-to-api-migration-redesign-2026-10-02",
    cover: "cover-landscape.png",
    coverEvidence: true,
    body: "cutover-checks.webp",
    bodyTarget: "cutover-checks-refined-2026-10-watermarked.webp",
  },
  "whatsapp-web-6-hour-logout-rule-india-2026": {
    evidence: "logout-rule-redesign-2026-10-02",
    cover: "cover.webp",
    body: "session-investigation.webp",
    bodyTarget: "session-investigation-refined-2026-10-watermarked.webp",
  },
  "busy-accounting-whatsapp-integration-benefits": {
    evidence: "busy-accounting-benefits-redesign-2026-10-02",
    cover: "cover.webp",
    body: "invoice-checks.webp",
    bodyTarget: "invoice-checks-refined-2026-10-watermarked.webp",
  },
  "meta-whatsapp-pricing-october-2026-india": {
    rootDir: "meta-whatsapp-pricing-october-2026",
    evidence: "october-pricing-redesign-2026-10-02",
    cover: "meta-pricing-cover.webp",
    body: "service-and-free-entry-windows.webp",
    bodyTarget: "service-and-free-entry-windows-refined-2026-10-watermarked.webp",
    extra: "marginal-tiers-and-platform-fees.webp",
    extraTarget: "marginal-tiers-and-platform-fees-refined-2026-10-watermarked.webp",
  },
};

const slug = process.argv[2];
const job = jobs[slug];
if (!job) throw new Error(`Provide one configured blog slug; received ${slug || "none"}`);
const root = path.resolve("public/images/blog", job.rootDir ?? slug);
const evidence = path.resolve("docs/evidence", job.evidence);
const logo = await readFile("public/logo.svg");
const outputs = [
  { input: path.join(job.coverEvidence ? evidence : root, job.cover), output: "cover-refined-2026-10-watermarked.webp", width: 1200, height: 630, left: 1060, top: 502, mark: 88 },
  { input: path.join(evidence, "hero-square.png"), output: "cover-hero-square-2026-10-watermarked.webp", width: 1000, height: 1000, left: 862, top: 860, mark: 80, plain: "cover-hero-square-2026-10.webp" },
  { input: path.join(job.bodyEvidence ? evidence : root, job.body), output: job.bodyTarget, width: 1440, height: 810, left: 1302, top: 681, mark: 88 },
  { input: path.join(evidence, "body-mobile.png"), output: "body-mobile-refined-2026-10-watermarked.webp", width: 900, height: 1125, left: 774, top: 998, mark: 76 },
  ...(job.extra ? [{ input: path.join(root, job.extra), output: job.extraTarget, width: 1440, height: 810, left: 1302, top: 681, mark: 88 }] : []),
];

async function watermark(size) {
  const { data, info } = await sharp(logo).resize(size, size).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 3; i < data.length; i += 4) data[i] = Math.round(data[i] * 0.28);
  return sharp(data, { raw: info }).blur(0.6).png().toBuffer();
}

for (const item of outputs) {
  if (item.left + item.mark > item.width || item.top + item.mark > item.height) throw new Error(`Watermark outside ${item.output}`);
  const base = await sharp(item.input).resize(item.width, item.height, { fit: "cover" }).webp({ quality: 84, effort: 6 }).toBuffer();
  if (item.plain) await sharp(base).toFile(path.join(root, item.plain));
  const dest = path.join(root, item.output);
  await sharp(base).composite([{ input: await watermark(item.mark), left: item.left, top: item.top }]).webp({ quality: 82, effort: 6 }).toFile(dest);
  const meta = await sharp(dest).metadata(), bytes = (await stat(dest)).size;
  if (meta.width !== item.width || meta.height !== item.height || bytes >= 200_000) throw new Error(`Invalid output ${dest}: ${meta.width}x${meta.height}, ${bytes} bytes`);
  process.stdout.write(`${dest} ${meta.width}x${meta.height} ${bytes} bytes\n`);
}
