import { EditorialGuideArticle } from "@/components/blog/EditorialGuideArticle";
import { marketingMessagesMigrationGuide } from "@/lib/blog/marketing-messages-migration-guide";
import { marketingMessagesMigrationVisual } from "@/lib/blog/editorial-visuals";
import { generateBlogPostMetadata } from "@/lib/blog/metadata";

export const metadata = generateBlogPostMetadata("whatsapp-cloud-api-marketing-messages-sunset-2027");

export default function Page() {
  return <EditorialGuideArticle guide={marketingMessagesMigrationGuide} visual={marketingMessagesMigrationVisual} />;
}
