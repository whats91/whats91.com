import { ERPGuideArticle } from "@/components/blog/ERPGuideArticle";
import { benefitsGuide } from "@/lib/blog/erp-guides";

export default function Page() {
  return <ERPGuideArticle guide={benefitsGuide} />;
}
