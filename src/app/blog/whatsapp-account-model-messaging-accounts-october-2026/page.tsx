import { EditorialGuideArticle } from "@/components/blog/EditorialGuideArticle";
import { accountModelGuide } from "@/lib/blog/account-model-guide";
import { accountModelVisual } from "@/lib/blog/editorial-visuals";
import { generateBlogPostMetadata } from "@/lib/blog/metadata";

export const metadata = generateBlogPostMetadata("whatsapp-account-model-messaging-accounts-october-2026");

export default function Page() {
  return <EditorialGuideArticle guide={accountModelGuide} visual={accountModelVisual} />;
}
