import { PlatformGuideArticle } from "@/components/blog/PlatformGuideArticle";
import { indiaPricingGuide } from "@/lib/blog/billing-guides";
import { generateBlogPostMetadata } from "@/lib/blog/metadata";
export const metadata = generateBlogPostMetadata("whatsapp-cloud-api-pricing-india-2026");

export default function Page() {
  return <PlatformGuideArticle guide={indiaPricingGuide} />;
}
