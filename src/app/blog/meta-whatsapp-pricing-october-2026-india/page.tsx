import { PlatformGuideArticle } from "@/components/blog/PlatformGuideArticle";
import { octoberPricingGuide } from "@/lib/blog/october-pricing-guide";
import { generateBlogPostMetadata } from "@/lib/blog/metadata";

export const metadata = generateBlogPostMetadata("meta-whatsapp-pricing-october-2026-india");

export default function Page() {
  return <PlatformGuideArticle guide={octoberPricingGuide} />;
}
