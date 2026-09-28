import { generatePageMetadata } from "@/lib/seo/config";

export const metadata = generatePageMetadata({
  title: "Cookie and Browser Storage Policy | Whats91",
  description:
    "Current Whats91 website browser-storage inventory, Google reCAPTCHA disclosure, and optional-category controls.",
  path: "/cookies",
});

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
