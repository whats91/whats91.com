import { EditorialGuideArticle } from "@/components/blog/EditorialGuideArticle";
import { sheetsGuide } from "@/lib/blog/erp-guides";
import { sheetsVisual } from "@/lib/blog/editorial-visuals";

export default function Page() {
  return <EditorialGuideArticle guide={sheetsGuide} visual={sheetsVisual} />;
}
