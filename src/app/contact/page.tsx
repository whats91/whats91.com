import type { Metadata } from "next";
import { Header } from "@/components/landing/Header";
import { Footer } from "@/components/landing/Footer";
import { BreadcrumbJsonLD } from "@/components/seo/JsonLD";
import { ContactForm } from "./ContactForm";
import {
  Container,
  Section,
  SectionHeader,
  Eyebrow,
  IconBadge,
} from "@/components/shared";
import { generatePageMetadata, siteConfig } from "@/lib/seo/config";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Building2,
  Headphones,
  Code2,
} from "lucide-react";

const pagePath = "/contact";
const pageUrl = `${siteConfig.url}${pagePath}`;
const seoTitle = "Contact Whats91 | WhatsApp Cloud API Sales & Support";
const seoDescription =
  "Get in touch with Whats91 for WhatsApp Cloud API sales, technical support, or integration help. Phone, email, and office details for our Ujjain, India team.";

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: seoTitle,
    description: seoDescription,
    keywords: ["Contact Whats91", "WhatsApp API Support India", "WhatsApp Cloud API Sales"],
    path: pagePath,
  }),
  alternates: { canonical: pageUrl },
};

const departments = [
  {
    icon: Building2,
    title: "Sales",
    description: "Get a custom quote for your enterprise needs",
    href: "/pricing",
  },
  {
    icon: Headphones,
    title: "Support",
    description: "Technical help and account assistance",
    href: "mailto:support@whats91.com",
  },
  {
    icon: Code2,
    title: "Developers",
    description: "API integration and webhook support",
    href: "https://developers.whats91.com/overview",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <BreadcrumbJsonLD
        items={[
          { name: "Home", url: "https://whats91.com/" },
          { name: "Contact", url: pageUrl },
        ]}
      />
      <Header />
      <main id="main-content" tabIndex={-1} className="flex-1 outline-none">
        <Section tone="brand-soft">
          <Container>
            <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
              <Eyebrow live className="mb-5">We&apos;d love to hear from you</Eyebrow>
              <h1 className="heading-1 mb-4 sm:mb-5">
                Get in <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-lead measure-prose mx-auto">
                Have a question about our WhatsApp Cloud API platform? Need help with integration?
                Our team is ready to assist you.
              </p>
            </div>

            {/* Contact form */}
            <div className="max-w-2xl mx-auto mb-10 sm:mb-12">
              <ContactForm />
            </div>

            {/* Contact info cards */}
            <div className="max-w-3xl mx-auto space-y-4 sm:space-y-5">
              <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                <div className="surface-card surface-card-hover p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <IconBadge icon={Phone} size="lg" className="shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-primary mb-1">Phone</h3>
                      <p className="text-caption mb-3">Mon-Fri, 9am-6pm IST</p>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-text-muted shrink-0">Sales:</span>
                          <a href="tel:+919669823388" className="text-text-secondary hover:text-brand-primary transition-colors">
                            +91 96698 23388
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-text-muted shrink-0">Support:</span>
                          <a href="tel:+919302819026" className="text-text-secondary hover:text-brand-primary transition-colors">
                            +91 93028 19026
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-text-muted shrink-0">Technical:</span>
                          <a href="tel:+917000782082" className="text-text-secondary hover:text-brand-primary transition-colors">
                            +91 70007 82082
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="surface-card surface-card-hover p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <IconBadge icon={Mail} size="lg" className="shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-primary mb-1">Email</h3>
                      <p className="text-caption mb-3">We&apos;ll respond within 24 hours</p>
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-text-muted shrink-0">General:</span>
                          <a href="mailto:hello@whats91.com" className="text-text-secondary hover:text-brand-primary transition-colors">
                            hello@whats91.com
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-text-muted shrink-0">Support:</span>
                          <a href="mailto:support@whats91.com" className="text-text-secondary hover:text-brand-primary transition-colors">
                            support@whats91.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
                <div className="surface-card surface-card-hover p-5 sm:p-6">
                  <div className="flex items-start gap-4">
                    <IconBadge icon={MapPin} size="lg" className="shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-primary mb-1">Office</h3>
                      <p className="text-caption mb-3">Visit our headquarters</p>
                      <div className="space-y-0.5 text-sm text-text-secondary">
                        <p>131, C21 Mall</p>
                        <p>Ujjain, Madhya Pradesh</p>
                        <p>India, 456010</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="surface-card p-5 sm:p-6 bg-surface/50">
                  <div className="flex items-start gap-4">
                    <IconBadge icon={Clock} size="lg" className="shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-text-primary mb-3">Business Hours</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-text-muted">Monday - Friday</span>
                          <span className="text-text-secondary font-medium">9:00 AM - 6:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-muted">Saturday</span>
                          <span className="text-text-secondary font-medium">10:00 AM - 2:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-text-muted">Sunday</span>
                          <span className="text-text-muted">Closed</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Departments */}
        <Section tone="surface" bordered aria-labelledby="departments-heading">
          <Container>
            <SectionHeader
              id="departments-heading"
              title="How can we help?"
              description="Choose the right department to get faster assistance for your needs."
            />
            <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {departments.map((dept) => {
                const external = dept.href.startsWith("http") || dept.href.startsWith("mailto:");
                return (
                  <a
                    key={dept.title}
                    href={dept.href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="surface-card surface-card-hover p-5 sm:p-6 block"
                  >
                    <IconBadge icon={dept.icon} size="lg" className="mb-4" />
                    <h3 className="font-semibold text-text-primary mb-2">{dept.title}</h3>
                    <p className="text-body-sm">{dept.description}</p>
                  </a>
                );
              })}
            </div>
          </Container>
        </Section>

        {/* Final CTA */}
        <Section>
          <Container>
            <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-brand-primary via-brand-primary to-brand-accent p-7 sm:p-8 md:p-12 shadow-xl">
              <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
                <div className="absolute -top-1/2 -right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-1/2 -left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-white/10 rounded-full blur-3xl" />
              </div>
              <div className="relative z-10 text-center max-w-2xl mx-auto">
                <h2 className="heading-2 !text-white mb-4">Ready to get started?</h2>
                <p className="text-base sm:text-lg text-white/90 mb-6">
                  Join 500+ enterprises using Whats91 for their WhatsApp Cloud API needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a
                    href="https://chat.whats91.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-8 font-semibold bg-white text-brand-700 hover:bg-white/95 rounded-xl shadow-lg transition-colors"
                  >
                    Start Free Trial
                  </a>
                  <a
                    href="https://developers.whats91.com/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-11 sm:h-12 px-6 sm:px-8 font-semibold bg-transparent border border-white/30 text-white hover:bg-white/10 rounded-xl transition-colors"
                  >
                    View Documentation
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
