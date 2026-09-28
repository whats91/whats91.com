import { generatePageMetadata } from "@/lib/seo/config";

export const metadata = generatePageMetadata({
  title: "Terms of Service | Whats91",
  description:
    "Terms for Whats91 accounts, WhatsApp Cloud API services, recipient permission, billing, platform dependencies, and support.",
  path: "/terms",
});

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
