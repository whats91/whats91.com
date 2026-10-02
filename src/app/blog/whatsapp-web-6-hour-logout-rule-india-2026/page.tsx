import { EditorialGuideArticle } from "@/components/blog/EditorialGuideArticle";
import { rolloutGuides } from "@/lib/blog/rollout-guides";
import { logoutRuleVisual } from "@/lib/blog/editorial-visuals";

export default function Page() {
  return <EditorialGuideArticle guide={rolloutGuides[4]} visual={logoutRuleVisual} />;
}
