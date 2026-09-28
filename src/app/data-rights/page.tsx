import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { dataRightsDocument } from "@/lib/legal/documents";
import { generatePageMetadata } from "@/lib/seo/config";

export const metadata: Metadata = generatePageMetadata({
  title: "Data Rights and Grievance Procedure | Whats91",
  description: "How to request access, correction, erasure, consent withdrawal, or privacy grievance support from Whats91.",
  path: "/data-rights",
});

export default function DataRightsPage() {
  return <LegalDocument document={dataRightsDocument} />;
}
