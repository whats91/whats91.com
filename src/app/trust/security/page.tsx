import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { securityDocument } from "@/lib/legal/documents";
import { generatePageMetadata } from "@/lib/seo/config";

export const metadata: Metadata = generatePageMetadata({
  title: "Security Statement | Whats91",
  description: "Whats91 security approach, shared-responsibility guidance, and incident-reporting channel.",
  path: "/trust/security",
});

export default function SecurityPage() {
  return <LegalDocument document={securityDocument} />;
}
