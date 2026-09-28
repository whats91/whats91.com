import { LegalDocument } from "@/components/legal/LegalDocument";
import { cookieDocument } from "@/lib/legal/documents";

export default function CookiesPage() {
  return <LegalDocument document={cookieDocument} />;
}
