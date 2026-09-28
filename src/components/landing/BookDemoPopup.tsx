"use client";

import { useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { executeRecaptcha } from "@/lib/recaptcha-client";
import { IconBadge } from "@/components/shared/IconBadge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CalendarDays,
  Send,
  CheckCircle2,
  Loader2,
  X,
  MessageCircle,
} from "lucide-react";

interface BookDemoPopupProps {
  triggerClassName?: string;
  triggerVariant?: "default" | "outline" | "ghost";
  triggerSize?: "default" | "sm" | "lg";
  triggerLabel?: string;
  showIcon?: boolean;
  source?: string;
}

interface FieldIssue {
  path?: string[];
  message: string;
}

const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";
const bookDemoRecaptchaAction = "book_demo" as const;

export function BookDemoPopup({
  triggerClassName = "",
  triggerVariant = "default",
  triggerSize = "default",
  triggerLabel = "Book a Demo",
  showIcon = true,
  source = "popup",
}: BookDemoPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setFieldErrors({});

    try {
      const formData = new FormData(event.currentTarget);
      const recaptchaToken = await executeRecaptcha(bookDemoRecaptchaAction);
      const data = {
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        source,
        recaptchaToken,
        recaptchaAction: bookDemoRecaptchaAction,
      };

      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setIsSuccess(true);
        (event.target as HTMLFormElement).reset();
        // Auto close after 3 seconds
        setTimeout(() => {
          setIsOpen(false);
          setIsSuccess(false);
        }, 3000);
      } else {
        setError(result.message || "Something went wrong. Please try again.");
        const issues: FieldIssue[] = Array.isArray(result.errors) ? result.errors : [];
        const perField: Record<string, string> = {};
        for (const issue of issues) {
          const field = issue.path?.[0];
          if (field && !perField[field]) perField[field] = issue.message;
        }
        setFieldErrors(perField);
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset state when closing
      setTimeout(() => {
        setIsSuccess(false);
        setError(null);
        setFieldErrors({});
      }, 200);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {recaptchaSiteKey && (
        <Script
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
          strategy="afterInteractive"
        />
      )}
      <DialogTrigger asChild>
        <Button
          variant={triggerVariant}
          size={triggerSize}
          className={`bg-brand-600 text-brand-primary-foreground hover:bg-brand-700 font-semibold shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/25 transition-all duration-300 ${triggerClassName}`}
        >
          {showIcon && <CalendarDays className="mr-2 h-4 w-4" aria-hidden="true" />}
          {triggerLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[calc(100dvh-2rem)] overflow-y-auto bg-background border-border/60 shadow-2xl">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <span className="icon-tile h-8 w-8">
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </span>
            Book a Demo
          </DialogTitle>
          <DialogDescription className="text-text-secondary">
            Schedule a personalized demo with our team. We&apos;ll show you how Whats91 can transform your business communication.
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <div className="text-center py-6" role="status">
            <div className="flex justify-center mb-4">
              <IconBadge icon={CheckCircle2} tone="success" size="lg" className="h-14 w-14 rounded-full [&_svg]:size-7" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              Demo Request Submitted!
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              Thank you for your interest. Our team will contact you shortly to schedule your demo.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-text-muted">
              <Loader2 className="h-3 w-3 animate-spin motion-reduce:animate-none" aria-hidden="true" />
              Closing in a moment...
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="demo-name" className="text-sm font-medium text-text-primary">
                Full Name <span className="text-destructive" aria-hidden="true">*</span>
                <span className="sr-only"> (required)</span>
              </Label>
              <Input
                id="demo-name"
                name="name"
                placeholder="John Doe"
                required
                disabled={isSubmitting}
                aria-invalid={Boolean(fieldErrors.name)}
                aria-describedby={fieldErrors.name ? "demo-name-error" : undefined}
                className="h-11 border-border focus:border-brand-primary focus:ring-brand-primary/20"
              />
              {fieldErrors.name && (
                <p id="demo-name-error" className="text-xs text-destructive">{fieldErrors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo-email" className="text-sm font-medium text-text-primary">
                Email Address <span className="text-destructive" aria-hidden="true">*</span>
                <span className="sr-only"> (required)</span>
              </Label>
              <Input
                id="demo-email"
                name="email"
                type="email"
                placeholder="john@company.com"
                required
                disabled={isSubmitting}
                aria-invalid={Boolean(fieldErrors.email)}
                aria-describedby={fieldErrors.email ? "demo-email-error" : undefined}
                className="h-11 border-border focus:border-brand-primary focus:ring-brand-primary/20"
              />
              {fieldErrors.email && (
                <p id="demo-email-error" className="text-xs text-destructive">{fieldErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="demo-phone" className="text-sm font-medium text-text-primary">
                Mobile Number <span className="text-destructive" aria-hidden="true">*</span>
                <span className="sr-only"> (required)</span>
              </Label>
              <Input
                id="demo-phone"
                name="phone"
                type="tel"
                placeholder="+91 98765 43210"
                required
                disabled={isSubmitting}
                aria-invalid={Boolean(fieldErrors.phone)}
                aria-describedby={fieldErrors.phone ? "demo-phone-error" : undefined}
                className="h-11 border-border focus:border-brand-primary focus:ring-brand-primary/20"
              />
              {fieldErrors.phone && (
                <p id="demo-phone-error" className="text-xs text-destructive">{fieldErrors.phone}</p>
              )}
            </div>

            {error && (
              <div className="p-3 rounded-lg bg-error-soft border border-error-border" role="alert">
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
                className="sm:flex-1 h-11 border-border hover:bg-surface"
              >
                <X className="mr-2 h-4 w-4" aria-hidden="true" />
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="sm:flex-1 h-11 bg-brand-600 text-brand-primary-foreground hover:bg-brand-700 font-semibold shadow-lg shadow-brand-primary/25 transition-all duration-300"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" aria-hidden="true" />
                    Submit Request
                  </>
                )}
              </Button>
            </div>

            <p className="text-xs text-text-muted text-center pt-2">
              By submitting, you agree to our{" "}
              <a href="/privacy" className="link-inline">
                Privacy Policy
              </a>
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
