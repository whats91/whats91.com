import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { ContactCard } from "@/components/landing/ContactCard";
import { Button } from "@/components/ui/button";
import {
  HelpCircle,
  MessageCircle,
  ArrowRight,
  Phone,
  Mail,
  Sparkles
} from "lucide-react";
import { FAQJsonLD, BreadcrumbJsonLD } from "@/components/seo/JsonLD";
import { generatePageMetadata, siteConfig } from "@/lib/seo/config";
import { faqData } from "./faqData";
import { FAQBrowser } from "./FAQBrowser";

const pagePath = "/faq";
const pageUrl = `${siteConfig.url}${pagePath}`;

export const metadata: Metadata = generatePageMetadata({
  title: "FAQ | Whats91 WhatsApp Cloud API Questions Answered",
  description:
    "Find answers to common questions about WhatsApp Business API, Whats91 pricing, Busy ERP integration, compliance, and support. Search or browse by category.",
  keywords: [
    "Whats91 FAQ",
    "WhatsApp API questions",
    "WhatsApp Business API pricing FAQ",
    "Busy ERP integration FAQ",
    "WhatsApp API compliance questions",
  ],
  path: pagePath,
});

// Flatten FAQs for JSON-LD
const allFaqs = Object.values(faqData).flat().map(faq => ({
  question: faq.question,
  answer: faq.answer,
}));

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* JSON-LD Structured Data */}
      <FAQJsonLD faqs={allFaqs.slice(0, 20)} />
      <BreadcrumbJsonLD items={[
        { name: "Home", url: siteConfig.url },
        { name: "FAQ", url: pageUrl },
      ]} />

      <Header />
      <main className="flex-1">

        {/* Hero Section */}
        <section className="relative overflow-hidden py-14 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-surface/80 to-background">
          <div className="absolute inset-0 gradient-brand-subtle pointer-events-none" />
          <div className="relative px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="text-center max-w-3xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 border border-brand-primary/15 px-4 py-1.5 text-xs sm:text-sm font-medium text-brand-primary mb-5">
                <HelpCircle className="h-3.5 w-3.5" />
                Help Center
              </div>

              {/* Headline */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-text-primary leading-[1.15] mb-5">
                Frequently Asked Questions
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-text-secondary leading-relaxed mb-8">
                Find answers to common questions about WhatsApp Business API, pricing, integrations, and more.
                Can&apos;t find what you&apos;re looking for? <a href="/contact" className="text-brand-primary hover:underline">Contact our support team</a>.
              </p>

              <FAQBrowser />
            </div>
          </div>
        </section>

        {/* Contact Support Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-surface/50">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[900px] mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary/10 border border-brand-primary/10 px-4 py-1.5 text-xs sm:text-sm font-medium text-brand-primary mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                Need More Help?
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-text-primary mb-4">
                Our Support Team is Here for You
              </h2>
              <p className="text-sm sm:text-base text-text-secondary max-w-2xl mx-auto">
                Can&apos;t find the answer you&apos;re looking for? Our team is just a message away.
              </p>
            </div>

            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
              {/* WhatsApp Support */}
              <a
                href="https://wa.me/919669823388"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:shadow-lg hover:border-green-200"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-500/10 text-green-600 mb-4 transition-transform duration-300 group-hover:scale-110">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-1">WhatsApp Us</h3>
                <p className="text-sm text-text-secondary text-center">Fastest response for quick queries</p>
                <p className="text-xs text-green-600 mt-2">+91 96698 23388</p>
              </a>

              {/* Email Support */}
              <a
                href="mailto:support@whats91.com"
                className="group flex flex-col items-center p-6 rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:shadow-lg hover:border-brand-primary/20"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-1">Email Support</h3>
                <p className="text-sm text-text-secondary text-center">Detailed queries & documentation</p>
                <p className="text-xs text-brand-primary mt-2">support@whats91.com</p>
              </a>

              {/* Phone Support */}
              <a
                href="tel:+919669823388"
                className="group flex flex-col items-center p-6 rounded-2xl border border-border/60 bg-card transition-all duration-300 hover:shadow-lg hover:border-info-border"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info-soft text-info mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="text-base font-semibold text-text-primary mb-1">Call Us</h3>
                <p className="text-sm text-text-secondary text-center">Mon-Sat, 10AM-7PM IST</p>
                <p className="text-xs text-info mt-2">+91 96698 23388</p>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-14 sm:py-16 md:py-20">
          <div className="px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto">
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-primary via-brand-primary to-brand-accent p-7 sm:p-8 md:p-12 shadow-xl">

              {/* Background Decorations */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
              </div>

              {/* Content */}
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4">
                  Ready to Transform Your Communication?
                </h2>
                <p className="text-base sm:text-lg text-white/90 mb-8">
                  Get started with India&apos;s leading WhatsApp Cloud API platform. Zero markup, full transparency.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button
                    size="lg"
                    className="h-12 px-7 text-base font-semibold bg-white text-brand-700 hover:bg-white/95 rounded-xl shadow-lg group"
                    asChild
                  >
                    <a href="https://chat.whats91.com">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
                    </a>
                  </Button>
                  <ContactCard
                    variant="popup"
                    trigger={
                      <Button
                        size="lg"
                        className="h-12 px-7 text-base font-semibold bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-xl"
                      >
                        Talk to Sales
                      </Button>
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
