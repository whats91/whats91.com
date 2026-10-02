import { PlatformGuideArticle } from "@/components/blog/PlatformGuideArticle";
import { migrationGuide } from "@/lib/blog/billing-guides";

export default function Page() {
  return <PlatformGuideArticle guide={migrationGuide} />;
}
