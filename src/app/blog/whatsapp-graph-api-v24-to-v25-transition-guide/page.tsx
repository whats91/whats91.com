import { EditorialGuideArticle } from "@/components/blog/EditorialGuideArticle";
import { rolloutGuides } from "@/lib/blog/rollout-guides";
import { graphMigrationVisual } from "@/lib/blog/editorial-visuals";

export default function Page() {
  return <EditorialGuideArticle guide={rolloutGuides[1]} visual={graphMigrationVisual} />;
}
