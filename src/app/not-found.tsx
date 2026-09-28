import Link from "next/link";
import Image from "next/image";
import { FileQuestion, ArrowLeft } from "lucide-react";
import { Container, Section, PrimaryCTA, SecondaryCTA, CTAGroup, Eyebrow } from "@/components/shared";

const quickLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Blog", href: "/blog" },
  { label: "Free Tools", href: "/tools" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main id="main-content" tabIndex={-1} className="flex-1 flex items-center outline-none">
        <Section tone="brand-soft" className="w-full">
          <Container size="narrow" className="text-center">
            <div className="icon-tile h-20 w-20 sm:h-24 sm:w-24 rounded-full mx-auto mb-6 [&_svg]:size-10">
              <FileQuestion aria-hidden="true" />
            </div>

            <Eyebrow className="mb-4">Error 404</Eyebrow>

            <h1 className="heading-1 mb-4">Page Not Found</h1>

            <p className="text-lead measure-prose mx-auto mb-8">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
            </p>

            <CTAGroup align="center" className="mb-10">
              <PrimaryCTA href="/" noArrow>Back to Home</PrimaryCTA>
              <SecondaryCTA href="/contact">Contact Support</SecondaryCTA>
            </CTAGroup>

            <div className="pt-8 border-t border-border/60">
              <p className="text-body-sm mb-4">Looking for something specific?</p>
              <nav aria-label="Suggested pages" className="flex flex-wrap justify-center gap-2">
                {quickLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm text-text-secondary hover:text-brand-primary hover:bg-brand-primary/5 transition-colors"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>
          </Container>
        </Section>
      </main>

      <footer className="py-6 border-t border-border/40">
        <Container className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-3">
            <Image
              src="/whats91_logo.svg"
              alt="Whats91 Logo"
              width={100}
              height={28}
              className="h-7 w-auto"
            />
          </Link>
          <p className="text-caption">
            © {new Date().getFullYear()} Whats91. All rights reserved.
            <span className="mx-2">•</span>
            India&apos;s leading WhatsApp Cloud API platform
          </p>
        </Container>
      </footer>
    </div>
  );
}
