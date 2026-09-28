import { generateBlogPostMetadata } from "@/lib/blog/metadata";

// The post page is a client component and cannot export metadata; this server
// layout gives the post its own title/description/canonical/article metadata
// from the blog registry instead of inheriting the blog-index metadata.
export const metadata = generateBlogPostMetadata(
  "whatsapp-graph-api-v24-to-v25-transition-guide"
);

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
