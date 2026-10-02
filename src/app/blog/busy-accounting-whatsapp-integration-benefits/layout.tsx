import { generateBlogPostMetadata } from "@/lib/blog/metadata";

// This server layout keeps the pilot article’s title/description/canonical metadata
// from the blog registry instead of inheriting the blog-index metadata.
export const metadata = generateBlogPostMetadata(
  "busy-accounting-whatsapp-integration-benefits"
);

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
