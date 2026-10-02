import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const slug = "whatsapp-cloud-api-restrictions-coexistence-framework-2026";
const root = path.resolve(`public/images/blog/${slug}`);
const sourceRoot = path.resolve("docs/evidence/restrictions-guide-redesign-2026-10-02");
const logo = await readFile("public/logo.svg");
const jobs = [
  { source: "source-cover-landscape.png", target: "cover-refined-2026-10-watermarked.webp", width: 1200, height: 630, mark: [1064, 516, 84] },
  { source: "source-cover.png", target: "cover-hero-square-2026-10-watermarked.webp", width: 1000, height: 1000, mark: [846, 854, 82] },
  { source: "source-coexistence-desktop.png", target: "coexistence-refined-2026-10-watermarked.webp", width: 1440, height: 810, mark: [1300, 682, 88] },
  { source: "source-coexistence-mobile.png", target: "coexistence-mobile-refined-2026-10-watermarked.webp", width: 900, height: 1125, mark: [774, 999, 76] },
];

async function watermark(size) {
  const { data, info } = await sharp(logo).resize(size, size).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let index = 3; index < data.length; index += 4) data[index] = Math.round(data[index] * 0.28);
  return sharp(data, { raw: info }).blur(0.6).png().toBuffer();
}

for (const job of jobs) {
  const [left, top, size] = job.mark;
  if (left + size > job.width || top + size > job.height) throw new Error(`Watermark outside ${job.target}`);
  const base = await sharp(path.join(sourceRoot, job.source)).resize(job.width, job.height, { fit: "cover" }).webp({ quality: 84, effort: 6 }).toBuffer();
  if (job.target.includes("hero-square")) {
    await sharp(base).toFile(path.join(root, "cover-hero-square-2026-10.webp"));
  }
  const output = path.join(root, job.target);
  await sharp(base).composite([{ input: await watermark(size), left, top }]).webp({ quality: 82, effort: 6 }).toFile(output);
  const metadata = await sharp(output).metadata();
  const bytes = (await stat(output)).size;
  if (metadata.width !== job.width || metadata.height !== job.height || bytes >= 200_000) throw new Error(`Invalid illustration ${output}: ${bytes} bytes`);
  process.stdout.write(`${output}: ${metadata.width}x${metadata.height}, ${bytes} bytes\n`);
}
