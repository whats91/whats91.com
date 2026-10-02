import { EditorialGuideArticle } from "@/components/blog/EditorialGuideArticle";
import { migrationGuide } from "@/lib/blog/billing-guides";
import { webMigrationVisual } from "@/lib/blog/editorial-visuals";

export default function Page() {
  return <EditorialGuideArticle guide={migrationGuide} visual={webMigrationVisual} />;
}
