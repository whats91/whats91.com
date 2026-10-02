import { generateBlogPostMetadata } from "@/lib/blog/metadata";

// Preserve the server metadata boundary and canonical registry for this guide.
export const metadata = generateBlogPostMetadata(
  "whatsapp-web-6-hour-logout-unofficial-api-migration-guide"
);

export default function PostLayout({ children }: { children: React.ReactNode }) {
  return children;
}
