import { EditorialGuideArticle } from "@/components/blog/EditorialGuideArticle";
import { mcpNewsGuide } from "@/lib/blog/mcp-news-guide";
import { mcpNewsVisual } from "@/lib/blog/editorial-visuals";
import { generateBlogPostMetadata } from "@/lib/blog/metadata";

export const metadata = generateBlogPostMetadata("whatsapp-business-tools-mcp-onboarding-2026");

export default function Page() {
  return <EditorialGuideArticle guide={mcpNewsGuide} visual={mcpNewsVisual} />;
}
