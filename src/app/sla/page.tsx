import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { slaDocument } from "@/lib/legal/documents";
import { generatePageMetadata } from "@/lib/seo/config";

export const metadata: Metadata = generatePageMetadata({
  title: "Service Level and Support Policy | Whats91",
  description: "Default Whats91 support, maintenance, availability, and contract-specific SLA framework.",
  path: "/sla",
});

export default function SlaPage() {
  return <LegalDocument document={slaDocument} />;
}
