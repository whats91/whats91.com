import { RestrictionsGuideArticle } from "@/components/blog/RestrictionsGuideArticle";
import { rolloutGuides } from "@/lib/blog/rollout-guides";

export default function Page() {
  return <RestrictionsGuideArticle guide={rolloutGuides[0]} />;
}
