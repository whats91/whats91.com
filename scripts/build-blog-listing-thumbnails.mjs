import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

// Dedicated 1200:536 listing art. Article covers remain separate, while the
// listing serves these already-compressed WebP files directly at card size.
const width = 1200;
const height = 536;
const panelWidth = 570;
const imageWidth = width - panelWidth;
const root = path.resolve("public/images/blog");
const logoPath = path.resolve("public/logo.svg");
const jobs = [
  {
    dir: "whatsapp-business-tools-mcp-onboarding-2026",
    source: "cover-hero-square-editorial-2026-10-watermarked.webp",
    title: ["Business", "Tools MCP"],
    detail: "Cloud API · Setup",
    background: "#EAF3E9",
    titleSizes: [94, 91],
    imagePosition: "north",
  },
  {
    dir: "whatsapp-cloud-api-complete-guide-2026",
    source: "cover-hero-square-refined-2026-10.webp",
    title: ["Cloud API", "Setup"],
    detail: "Delivery · Billing",
    background: "#EAF3E9",
  },
  {
    dir: "whatsapp-cloud-api-pricing-india-2026",
    source: "cover-hero-square-2026-10.webp",
    title: ["Cloud API", "Pricing"],
    detail: "India 2026 · Billing",
    background: "#F5F3E9",
  },
  {
    dir: "whatsapp-cloud-api-restrictions-coexistence-framework-2026",
    source: "cover-hero-square-2026-10.webp",
    title: ["API Limits", "Coexistence"],
    detail: "Diagnose · Plan safely",
    background: "#F5F3E9",
    titleSizes: [91, 78],
  },
  {
    dir: "busy-erp-google-sheets-integration-complete-guide",
    source: "cover-hero-square-2026-10.webp",
    title: ["Busy ERP", "to Sheets"],
    detail: "CSV · Validate first",
    background: "#EAF3E9",
    titleSizes: [88, 92],
  },
  {
    dir: "whatsapp-graph-api-v24-to-v25-transition-guide",
    source: "cover-hero-square-2026-10.webp",
    title: ["Graph API", "Migration"],
    detail: "Evidence · Rollback",
    background: "#F5F3E9",
    titleSizes: [90, 87],
  },
  {
    dir: "whatsapp-username-system-2026-complete-guide",
    source: "cover-hero-square-2026-10.webp",
    title: ["WhatsApp", "Usernames"],
    detail: "Privacy · API readiness",
    background: "#EAF3E9",
    titleSizes: [85, 86],
  },
  {
    dir: "whatsapp-plus-launch-2026-premium-subscription-guide",
    source: "cover-hero-square-2026-10.webp",
    title: ["WhatsApp", "Plus"],
    detail: "Offer · Renewal",
    background: "#F5F3E9",
    titleSizes: [85, 103],
  },
  {
    dir: "whatsapp-web-6-hour-logout-unofficial-api-migration-guide",
    source: "cover-hero-square-2026-10.webp",
    title: ["Web to API", "Migration"],
    detail: "Assess · Recover",
    background: "#EAF3E9",
    titleSizes: [84, 86],
  },
  {
    dir: "whatsapp-web-6-hour-logout-rule-india-2026",
    source: "cover-hero-square-2026-10.webp",
    title: ["Web Logout", "Rule India"],
    detail: "History · Current checks",
    background: "#F5F3E9",
    titleSizes: [81, 91],
  },
  {
    dir: "busy-accounting-whatsapp-integration-benefits",
    source: "cover-hero-square-2026-10.webp",
    title: ["Busy ERP", "WhatsApp"],
    detail: "5 workflows · Review first",
    background: "#EAF3E9",
    titleSizes: [89, 81],
  },
  {
    dir: "meta-whatsapp-pricing-october-2026",
    source: "cover-hero-square-2026-10.webp",
    title: ["Meta India", "Pricing"],
    detail: "October 2026 · Rates",
    background: "#F5F3E9",
    titleSizes: [86, 105],
  },
];

const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;");

async function fadedLogo() {
  const { data, info } = await sharp(await readFile(logoPath))
    .resize(72, 72)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let index = 3; index < data.length; index += 4) data[index] = Math.round(data[index] * 0.28);
  return sharp(data, { raw: info }).blur(0.6).png().toBuffer();
}

const logo = await fadedLogo();
const selectedDir = process.argv[2];
for (const job of jobs.filter((item) => !selectedDir || item.dir === selectedDir)) {
  const sourcePath = path.join(root, job.dir, job.source);
  const targetPath = path.join(root, job.dir, "listing-thumbnail-v3-2026-10.webp");
  const source = await sharp(sourcePath)
    .resize(imageWidth, height, { fit: "cover", position: job.imagePosition ?? "centre" })
    .toBuffer();
  const type = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${panelWidth}" height="${height}" viewBox="0 0 ${panelWidth} ${height}">
      <rect width="${panelWidth}" height="${height}" fill="${job.background}"/>
      <path d="M0 0H${panelWidth}V${height}H0Z" fill="none" stroke="#D4E6D5" stroke-width="2"/>
      <text x="50" y="250" fill="#18382E" font-family="Arial, Helvetica, sans-serif" font-size="${job.titleSizes?.[0] ?? 91}" font-weight="700" letter-spacing="-4">${escapeXml(job.title[0])}</text>
      <text x="50" y="350" fill="#18382E" font-family="Arial, Helvetica, sans-serif" font-size="${job.titleSizes?.[1] ?? 99}" font-weight="700" letter-spacing="-4">${escapeXml(job.title[1])}</text>
      <text x="54" y="413" fill="#557267" font-family="Arial, Helvetica, sans-serif" font-size="34">${escapeXml(job.detail)}</text>
    </svg>`;

  await sharp({ create: { width, height, channels: 3, background: job.background } })
    .composite([
      { input: source, left: panelWidth, top: 0 },
      { input: Buffer.from(type), left: 0, top: 0 },
      { input: logo, left: 48, top: 447 },
    ])
    .webp({ quality: 84, effort: 6 })
    .toFile(targetPath);
  const { width: actualWidth, height: actualHeight } = await sharp(targetPath).metadata();
  const bytes = (await stat(targetPath)).size;
  if (actualWidth !== width || actualHeight !== height || bytes >= 200_000) {
    throw new Error(`Invalid thumbnail ${targetPath}: ${actualWidth}x${actualHeight}, ${bytes} bytes`);
  }
  process.stdout.write(`${targetPath} ${actualWidth}x${actualHeight} ${bytes} bytes\n`);
}
