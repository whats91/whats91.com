import { EditorialGuideArticle } from "@/components/blog/EditorialGuideArticle";
import { octoberPricingGuide } from "@/lib/blog/october-pricing-guide";
import { octoberPricingVisual } from "@/lib/blog/editorial-visuals";
import { generateBlogPostMetadata } from "@/lib/blog/metadata";

export const metadata = generateBlogPostMetadata("meta-whatsapp-pricing-october-2026-india");

export default function Page() {
  return <EditorialGuideArticle guide={octoberPricingGuide} visual={octoberPricingVisual} />;
}
