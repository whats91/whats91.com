import { EditorialGuideArticle } from "@/components/blog/EditorialGuideArticle";
import { benefitsGuide } from "@/lib/blog/erp-guides";
import { busyBenefitsVisual } from "@/lib/blog/editorial-visuals";

export default function Page() {
  return <EditorialGuideArticle guide={benefitsGuide} visual={busyBenefitsVisual} />;
}
