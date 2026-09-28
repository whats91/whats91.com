import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal/LegalDocument";
import { acceptableUseDocument } from "@/lib/legal/documents";
import { generatePageMetadata } from "@/lib/seo/config";

export const metadata: Metadata = generatePageMetadata({
  title: "Acceptable Use Policy | Whats91",
  description: "Rules for lawful, consent-based, secure use of Whats91 and the WhatsApp Business Platform.",
  path: "/acceptable-use",
});

export default function AcceptableUsePage() {
  return <LegalDocument document={acceptableUseDocument} />;
}
