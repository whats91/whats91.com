"use client";

import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEnquiryForm } from "@/components/shared/useEnquiryForm";
import { contactSubjects, enquiryLimits } from "@/lib/enquiry-contract";
import { CheckCircle2, Loader2, MessageCircle, Send } from "lucide-react";

const subscribeHydration = () => () => {};
const clientHydrated = () => true;
const serverHydrated = () => false;

export function ContactForm({ initialSubject }: { initialSubject: string }) {
  return <ContactFields key={initialSubject} initialSubject={initialSubject} />;
}

function ContactFields({ initialSubject }: { initialSubject: string }) {
  const hydrated = useSyncExternalStore(subscribeHydration, clientHydrated, serverHydrated);
  const { formElement, errorElement, ...form } = useEnquiryForm("contact", { name: "", email: "", phone: "", company: "", subject: initialSubject, message: "" });
  const fields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", required: true, max: enquiryLimits.name, autoComplete: "name" },
    { name: "email", label: "Email Address", type: "email", placeholder: "john@company.com", required: true, max: enquiryLimits.email, autoComplete: "email" },
    { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210", required: false, max: enquiryLimits.phone, autoComplete: "tel" },
    { name: "company", label: "Company Name", type: "text", placeholder: "Acme Inc.", required: false, max: enquiryLimits.company, autoComplete: "organization" },
  ];
  return (
    <div className="surface-card shadow-lg p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-text-primary flex items-center gap-2 mb-1.5"><MessageCircle className="h-5 w-5 text-brand-primary" aria-hidden="true" />Send us a message</h2>
        <p className="text-body-sm">Describe your enquiry below. Response timing and availability need confirmation.</p>
        <p className="text-body-sm mt-2">The form needs JavaScript and Google reCAPTCHA to submit. If it is unavailable, <a href="mailto:support@whats91.com" className="link-inline">contact support</a>.</p>
        <p className="text-body-sm mt-2">For MCP access, <a href="mailto:support@whats91.com?subject=Whats91%20MCP%20Access" className="link-inline">email an MCP access enquiry</a>. An enquiry does not connect an assistant or activate access.</p>
        {initialSubject === "Whats91 MCP Access" && <p className="text-body-sm mt-2">Ask our team to confirm current tools, assistant support, plan eligibility and account permissions. This enquiry does not connect an assistant or activate access.</p>}
      </div>
      {form.receipt ? (
        <div className="text-center py-8 sm:py-10" role="status">
          <div className="flex justify-center mb-4"><CheckCircle2 className="h-14 w-14 text-success" aria-hidden="true" /></div>
          <h3 className="text-lg sm:text-xl font-semibold text-text-primary mb-2">Enquiry Received</h3>
          <p className="text-text-secondary mb-3 text-sm sm:text-base">We saved your enquiry. Our team can follow up using the details you provided.</p>
          <p className="text-xs text-text-muted break-all mb-6">Reference: {form.receipt}</p>
          <Button onClick={form.another} variant="outline" className="border-border hover:bg-surface">Send Another Message</Button>
        </div>
      ) : (
        <form ref={formElement} onSubmit={form.handleSubmit} className="space-y-5" noValidate aria-busy={form.isSubmitting}>
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((field) => (
              <div className="space-y-2" key={field.name}>
                <Label htmlFor={field.name} className="text-sm font-medium text-text-primary">{field.label}{field.required && <><span className="text-destructive" aria-hidden="true"> *</span><span className="sr-only"> (required)</span></>}</Label>
                <Input {...form.field(field.name)} id={field.name} type={field.type} placeholder={field.placeholder} required={field.required} maxLength={field.max} autoComplete={field.autoComplete} aria-describedby={form.fieldErrors[field.name] ? `${field.name}-error` : undefined} className="h-11 border-border focus:border-brand-primary focus:ring-brand-primary/20" />
                {form.fieldErrors[field.name] && <p id={`${field.name}-error`} className="text-xs text-destructive">{form.fieldErrors[field.name]}</p>}
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium text-text-primary">Subject <span className="text-destructive" aria-hidden="true">*</span><span className="sr-only"> (required)</span></Label>
            <select {...form.field("subject")} id="subject" required aria-describedby={form.fieldErrors.subject ? "subject-error" : undefined} className="flex h-11 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text-primary focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20 transition-colors">
              <option value="">Select a subject</option>
              {contactSubjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}
            </select>
            {form.fieldErrors.subject && <p id="subject-error" className="text-xs text-destructive">{form.fieldErrors.subject}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium text-text-primary">Message <span className="text-destructive" aria-hidden="true">*</span><span className="sr-only"> (required)</span></Label>
            <Textarea {...form.field("message")} id="message" placeholder="Tell us how we can help you..." required rows={5} maxLength={enquiryLimits.message} aria-describedby={form.fieldErrors.message ? "message-error" : undefined} className="border-border focus:border-brand-primary focus:ring-brand-primary/20 resize-none" />
            {form.fieldErrors.message && <p id="message-error" className="text-xs text-destructive">{form.fieldErrors.message}</p>}
          </div>
          <p className="text-xs text-text-muted">Submitting loads Google reCAPTCHA for verification. Read our <a href="/privacy" className="link-inline">Privacy Policy</a> before sending an enquiry.</p>
          {form.error && <div ref={errorElement} tabIndex={-1} className="p-3 rounded-lg bg-error-soft border border-error-border" role="alert"><p className="text-sm text-error">{form.error}</p><a href="mailto:support@whats91.com" className="link-inline text-sm">Contact support</a></div>}
          <div role="status" aria-live="polite" className="text-sm text-text-secondary">{form.phase}</div>
          {form.uncertain && <Button type="button" variant="outline" onClick={form.allowRetry} className="w-full h-auto min-h-11 whitespace-normal">Try again (may create a duplicate enquiry)</Button>}
          <Button type="submit" disabled={!hydrated || form.isSubmitting || form.uncertain} className="w-full h-11 sm:h-12 bg-brand-600 text-brand-primary-foreground hover:bg-brand-700 font-semibold rounded-xl shadow-lg shadow-brand-primary/25 transition-all duration-300">
            {form.isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />Sending...</> : <><Send className="mr-2 h-4 w-4" aria-hidden="true" />Send Message</>}
          </Button>
          {form.isSubmitting && <Button type="button" variant="outline" onClick={form.cancel} className="w-full">Stop waiting</Button>}
        </form>
      )}
    </div>
  );
}
