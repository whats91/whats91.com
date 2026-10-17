import { EditorialGuideArticle } from "@/components/blog/EditorialGuideArticle";
import { directSendGuide } from "@/lib/blog/direct-send-guide";
import { directSendVisual } from "@/lib/blog/editorial-visuals";
import { generateBlogPostMetadata } from "@/lib/blog/metadata";

export const metadata = generateBlogPostMetadata("whatsapp-direct-send-utility-eligibility-2026");

export default function Page() {
  return <EditorialGuideArticle guide={directSendGuide} visual={directSendVisual} />;
}
