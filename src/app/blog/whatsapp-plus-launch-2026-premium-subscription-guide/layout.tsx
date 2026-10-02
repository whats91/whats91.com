import { generateBlogPostMetadata } from "@/lib/blog/metadata";

// Route metadata and server article use the same registry facts.
export const metadata = generateBlogPostMetadata(
  "whatsapp-plus-launch-2026-premium-subscription-guide"
);

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
