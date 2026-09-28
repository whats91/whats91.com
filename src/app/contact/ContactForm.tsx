"use client";

import { useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { executeRecaptcha } from "@/lib/recaptcha-client";
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";

const subjectOptions = [
  "General Inquiry",
  "Sales & Pricing",
  "Technical Support",
  "API Integration",
  "Whats91 MCP Preview Access",
  "Partnership",
  "Other",
];

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
const contactRecaptchaAction = "contact_form" as const;

/**
 * The real contact form — fields, validation, /api/contact submission,
 * and reCAPTCHA are preserved exactly from the pre-migration page.
 */
export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formData = new FormData(event.currentTarget);
      const recaptchaToken = await executeRecaptcha(contactRecaptchaAction);
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        company: formData.get("company") as string,
        subject: formData.get("subject") as string,
        message: formData.get("message") as string,
        recaptchaToken,
        recaptchaAction: contactRecaptchaAction,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        (event.target as HTMLFormElement).reset();
      } else {
        setError(result.message || "Something went wrong. Please try again.");
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="surface-card shadow-lg p-6 sm:p-8">
      {recaptchaSiteKey && (
        <Script
          id="google-recaptcha-contact"
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          strategy="afterInteractive"
        />
      )}

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2 mb-1.5">
          <MessageCircle className="h-5 w-5 text-brand-primary" aria-hidden="true" />
          Send us a message
        </h2>
        <p className="text-body-sm">Fill out the form below and we&apos;ll get back to you within 24 hours.</p>
      </div>

      {isSuccess ? (
        <div className="text-center py-8 sm:py-10" role="status">
          <div className="flex justify-center mb-4">
            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-success-soft flex items-center justify-center">
              <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-success" aria-hidden="true" />
            </div>
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-2">Message Sent Successfully!</h3>
          <p className="text-text-secondary mb-6 text-sm sm:text-base">
            Thank you for reaching out. Our team will get back to you shortly.
          </p>
          <Button onClick={() => setIsSuccess(false)} variant="outline" className="border-border hover:bg-surface">
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-text-primary">
                Full Name <span className="text-destructive" aria-hidden="true">*</span>
                <span className="sr-only"> (required)</span>
              </Label>
              <Input
                id="name"
                name="name"
                placeholder="John Doe"
                required
                className="h-11 border-border focus:border-brand-primary focus:ring-brand-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-text-primary">
                Email Address <span className="text-destructive" aria-hidden="true">*</span>
                <span className="sr-only"> (required)</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="john@company.com"
                required
                className="h-11 border-border focus:border-brand-primary focus:ring-brand-primary/20"
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-medium text-text-primary">
                Phone Number
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                className="h-11 border-border focus:border-brand-primary focus:ring-brand-primary/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium text-text-primary">
                Company Name
              </Label>
              <Input
                id="company"
                name="company"
                placeholder="Acme Inc."
                className="h-11 border-border focus:border-brand-primary focus:ring-brand-primary/20"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium text-text-primary">
              Subject <span className="text-destructive" aria-hidden="true">*</span>
              <span className="sr-only"> (required)</span>
            </Label>
            <select
              id="subject"
              name="subject"
              required
              className="flex h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-primary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-colors"
            >
              <option value="">Select a subject</option>
              {subjectOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium text-text-primary">
              Message <span className="text-destructive" aria-hidden="true">*</span>
              <span className="sr-only"> (required)</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell us how we can help you..."
              required
              rows={5}
              className="border-border focus:border-brand-primary focus:ring-brand-primary/20 resize-none"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-error-soft border border-error-border" role="alert">
              <p className="text-sm text-error">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-11 sm:h-12 bg-brand-600 text-brand-primary-foreground hover:bg-brand-700 font-semibold rounded-xl shadow-lg shadow-brand-primary/25 transition-all duration-300"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                Sending...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                Send Message
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
