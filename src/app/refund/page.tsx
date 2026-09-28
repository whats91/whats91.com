import { LegalDocument } from "@/components/legal/LegalDocument";
import { refundDocument } from "@/lib/legal/documents";

export default function RefundPage() {
  return <LegalDocument document={refundDocument} />;
}
