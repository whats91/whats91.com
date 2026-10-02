import { RolloutGuideArticle } from "@/components/blog/RolloutGuideArticle";
import { rolloutGuides } from "@/lib/blog/rollout-guides";

export default function Page() {
  return <RolloutGuideArticle guide={rolloutGuides[4]} />;
}
