import { LegalDocument } from "@/components/legal/LegalDocument";
import { privacyDocument } from "@/lib/legal/documents";

export default function PrivacyPage() {
  return <LegalDocument document={privacyDocument} />;
}
