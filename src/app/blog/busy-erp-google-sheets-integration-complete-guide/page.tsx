import { ERPGuideArticle } from "@/components/blog/ERPGuideArticle";
import { sheetsGuide } from "@/lib/blog/erp-guides";

export default function Page() {
  return <ERPGuideArticle guide={sheetsGuide} />;
}
