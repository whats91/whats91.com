import { generatePageMetadata } from "@/lib/seo/config";

export const metadata = generatePageMetadata({
  title: "Refund and Cancellation Policy | Whats91",
  description:
    "Whats91 subscription cancellation, usage-charge disputes, billing corrections, projects, and refund-review process.",
  path: "/refund",
});

export default function RefundLayout({ children }: { children: React.ReactNode }) {
  return children;
}
