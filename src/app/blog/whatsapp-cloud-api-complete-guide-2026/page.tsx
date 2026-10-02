import { PlatformGuideArticle } from "@/components/blog/PlatformGuideArticle";
import { cloudGuide } from "@/lib/blog/billing-guides";

export default function Page() {
  return <PlatformGuideArticle guide={cloudGuide} />;
}
