import { generateBlogPostMetadata } from "@/lib/blog/metadata";

// Route metadata and server article use the same registry facts.
export const metadata = generateBlogPostMetadata(
  "whatsapp-graph-api-v24-to-v25-transition-guide"
);

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
