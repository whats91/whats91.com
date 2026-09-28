import { generatePageMetadata } from "@/lib/seo/config";

export const metadata = generatePageMetadata({
  title: "Privacy Notice | Whats91",
  description:
    "How Whats91 handles website, account, customer messaging, integration, and support data, including retention and privacy rights.",
  path: "/privacy",
});

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
