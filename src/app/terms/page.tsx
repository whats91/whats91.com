import { LegalDocument } from "@/components/legal/LegalDocument";
import { termsDocument } from "@/lib/legal/documents";

export default function TermsPage() {
  return <LegalDocument document={termsDocument} />;
}
