import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Keep original illustrations intact. The final article/metadata paths point at
// these versioned files, so downloaded images also contain the actual mark.
const root = path.resolve("public/images/blog");
const logo = path.resolve("public/logo.svg");
const opacity = 0.28;
const jobs = [
  { dir: "whatsapp-cloud-api-complete-guide-2026", source: "cover-refined-v2-2026-10.webp", target: "cover-refined-v2-2026-10-watermarked.webp", size: 92, left: 1083, top: 561 },
  { dir: "whatsapp-cloud-api-complete-guide-2026", source: "cover-hero-square-refined-2026-10.webp", target: "cover-hero-square-refined-2026-10-watermarked.webp", size: 82, left: 60, top: 872 },
  { dir: "whatsapp-cloud-api-complete-guide-2026", source: "operating-model-refined-2026-10.webp", target: "operating-model-refined-2026-10-watermarked.webp", size: 104, left: 1295, top: 682 },
  { dir: "whatsapp-cloud-api-complete-guide-2026", source: "operating-model-mobile-refined-2026-10.webp", target: "operating-model-mobile-refined-2026-10-watermarked.webp", size: 84, left: 58, top: 984 },
  { dir: "whatsapp-cloud-api-pricing-india-2026", source: "cover-refined-2026-10.webp", target: "cover-refined-2026-10-watermarked.webp", size: 86, left: 240, top: 523 },
  { dir: "whatsapp-cloud-api-pricing-india-2026", source: "cover-hero-square-2026-10.webp", target: "cover-hero-square-2026-10-watermarked.webp", size: 72, left: 228, top: 778 },
  { dir: "whatsapp-cloud-api-pricing-india-2026", source: "reconciliation-refined-2026-10.webp", target: "reconciliation-refined-2026-10-watermarked.webp", size: 100, left: 1260, top: 674, light: true },
  { dir: "whatsapp-cloud-api-pricing-india-2026", source: "reconciliation-mobile-refined-2026-10.webp", target: "reconciliation-mobile-refined-2026-10-watermarked.webp", size: 68, left: 624, top: 981 },
];

async function watermark(size, light) {
  const svg = light
    ? (await readFile(logo, "utf8")).replaceAll("#45BC96", "#FFFFFF")
    : await readFile(logo);
  const { data, info } = await sharp(typeof svg === "string" ? Buffer.from(svg) : svg).resize(size, size).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let index = 3; index < data.length; index += 4) data[index] = Math.round(data[index] * opacity);
  return sharp(data, { raw: info }).blur(0.6).png().toBuffer();
}

for (const job of jobs) {
  const source = path.join(root, job.dir, job.source);
  const target = path.join(root, job.dir, job.target);
  const metadata = await sharp(source).metadata();
  if (job.left < 0 || job.top < 0 || job.left + job.size > metadata.width || job.top + job.size > metadata.height) {
    throw new Error(`Watermark position exceeds ${source}`);
  }
  await sharp(source)
    .composite([{ input: await watermark(job.size, job.light), left: job.left, top: job.top, blend: "over" }])
    .webp({ quality: 84, effort: 6 })
    .toFile(target);
  const result = await sharp(target).metadata();
  const bytes = (await stat(target)).size;
  if (result.width !== metadata.width || result.height !== metadata.height || bytes >= 200_000) {
    throw new Error(`Invalid watermark output ${target}: ${result.width}x${result.height}, ${bytes} bytes`);
  }
  process.stdout.write(`${target} ${result.width}x${result.height} ${bytes} bytes\n`);
}
