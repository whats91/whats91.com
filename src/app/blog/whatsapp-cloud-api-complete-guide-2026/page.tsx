import { CloudGuideArticle } from "@/components/blog/CloudGuideArticle";
import { cloudGuide } from "@/lib/blog/billing-guides";

export default function Page() {
  return <CloudGuideArticle guide={cloudGuide} />;
}
