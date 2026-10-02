import { generateBlogPostMetadata } from "@/lib/blog/metadata";

// Route metadata and server article use the same registry facts.
export const metadata = generateBlogPostMetadata(
  "whatsapp-cloud-api-restrictions-coexistence-framework-2026"
);

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
