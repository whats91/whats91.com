import { generateBlogPostMetadata } from "@/lib/blog/metadata";

// The post page is a client component and cannot export metadata; this server
// layout gives the post its own title/description/canonical/article metadata
// from the blog registry instead of inheriting the blog-index metadata.
export const metadata = generateBlogPostMetadata(
  "whatsapp-username-system-2026-complete-guide"
);

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
