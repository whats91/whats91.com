import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { dpaStatusDocument } from "@/lib/legal/documents";
import { generatePageMetadata } from "@/lib/seo/config";

const baseMetadata = generatePageMetadata({
  title: "Data Processing Agreement Status | Whats91",
  description: "Status information for customers requesting contractual Whats91 data-processing terms.",
  path: "/legal/dpa",
});

export const metadata: Metadata = { ...baseMetadata, robots: { index: false, follow: true } };

export default function DpaStatusPage() {
  return <LegalDocument document={dpaStatusDocument} />;
}
