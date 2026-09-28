import { readFileSync } from "node:fs";

const files = {
  layout: "src/app/layout.tsx",
  jsonLd: "src/components/seo/JsonLD.tsx",
  home: "src/app/page.tsx",
  pricing: "src/app/pricing/page.tsx",
  calculator: "src/app/tools/whatsapp-api-cost-calculator/page.tsx",
  markdownRoute: "src/app/api/md/[slug]/route.ts",
  llms: "public/llms.txt",
};

const read = (path) => readFileSync(path, "utf8");

const checks = [
  {
    name: "Root metadata sets metadataBase for absolute social/AI URLs",
    pass: () => read(files.layout).includes('metadataBase: new URL("https://whats91.com")'),
  },
  {
    name: "Root JSON-LD emits a connected @graph",
    pass: () => {
      const source = read(files.jsonLd);
      return source.includes('"@graph"') && source.includes("DefinedTermSet") && source.includes("ItemList");
    },
  },
  {
    name: "Root graph reinforces core entities and machine endpoints",
    pass: () => {
      const source = read(files.jsonLd);
      return [
        "WhatsApp Cloud API",
        "Meta Business Solution Provider",
        "Busy ERP Integration",
        "DataFeed",
        "/api/mcp",
        "/api/md/",
      ].every((needle) => source.includes(needle));
    },
  },
  {
    name: "Homepage has page-level AI entity schema",
    pass: () => {
      const source = read(files.home);
      return source.includes("HomepageAIJsonLD") && source.includes("SpeakableSpecification");
    },
  },
  {
    name: "Homepage exposes Product, Service, FAQ, and Breadcrumb schemas",
    pass: () => {
      const source = read(files.home);
      return (
        source.includes('"@type": "Product"') &&
        source.includes('"@type": "Service"') &&
        source.includes('"@type": "FAQPage"') &&
        source.includes('"@type": "BreadcrumbList"') &&
        source.includes("homeFaqs")
      );
    },
  },
  {
    name: "Pricing page exposes FAQ and breadcrumb JSON-LD",
    pass: () => {
      const source = read(files.pricing);
      return source.includes("FAQJsonLD") && source.includes("BreadcrumbJsonLD");
    },
  },
  {
    name: "Cost calculator exposes FAQ and tool JSON-LD",
    pass: () => {
      const source = read(files.calculator);
      return source.includes("FAQJsonLD") && source.includes("SoftwareApplication");
    },
  },
  {
    name: "Cost calculator uses current India per-message defaults",
    pass: () => {
      const source = read(files.calculator);
      return (
        source.includes('marketing: 0.8631') &&
        source.includes('utility: 0.1150') &&
        source.includes('authentication: 0.1150') &&
        source.includes("per delivered message") &&
        !source.includes("per conversation")
      );
    },
  },
  {
    name: "Markdown pricing twin uses current per-message pricing language",
    pass: () => {
      const source = read(files.markdownRoute);
      return (
        source.includes("per-delivered-message pricing model") &&
        source.includes("/blog/whatsapp-cloud-api-pricing-india-2026") &&
        !source.includes("per-conversation pricing model")
      );
    },
  },
  {
    name: "llms.txt includes an AI search entity map and pricing pillar",
    pass: () => {
      const source = read(files.llms);
      return (
        source.includes("AI SEARCH ENTITY MAP") &&
        source.includes("/blog/whatsapp-cloud-api-pricing-india-2026") &&
        source.includes("/tools/whatsapp-api-cost-calculator")
      );
    },
  },
];

const failures = checks.filter((check) => !check.pass());

if (failures.length > 0) {
  console.error("AI-readiness verification failed:");
  for (const failure of failures) {
    console.error(`- ${failure.name}`);
  }
  process.exit(1);
}

console.log(`AI-readiness verification passed (${checks.length}/${checks.length}).`);
