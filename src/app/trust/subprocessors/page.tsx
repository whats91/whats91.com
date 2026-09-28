import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { subprocessorStatusDocument } from "@/lib/legal/documents";
import { generatePageMetadata } from "@/lib/seo/config";

const baseMetadata = generatePageMetadata({
  title: "Subprocessor Disclosure Status | Whats91",
  description: "Status of the verified public Whats91 service-provider and subprocessor register.",
  path: "/trust/subprocessors",
});

export const metadata: Metadata = { ...baseMetadata, robots: { index: false, follow: true } };

export default function SubprocessorsStatusPage() {
  return <LegalDocument document={subprocessorStatusDocument} />;
}
