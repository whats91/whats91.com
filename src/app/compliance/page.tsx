import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { complianceDocument } from "@/lib/legal/documents";
import { generatePageMetadata } from "@/lib/seo/config";

export const metadata: Metadata = generatePageMetadata({
  title: "DPDP Readiness Statement | Whats91",
  description: "Whats91 readiness approach for India's phased Digital Personal Data Protection Act and Rules.",
  path: "/compliance",
});

export default function CompliancePage() {
  return <LegalDocument document={complianceDocument} />;
}
