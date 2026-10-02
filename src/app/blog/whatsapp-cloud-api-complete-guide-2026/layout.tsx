import { generateBlogPostMetadata } from "@/lib/blog/metadata";

// Preserve the server metadata boundary and canonical registry for this guide.
export const metadata = generateBlogPostMetadata(
  "whatsapp-cloud-api-complete-guide-2026"
);

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
