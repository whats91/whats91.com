"use client";

import { useId, useState, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEnquiryForm } from "@/components/shared/useEnquiryForm";
import { enquiryLimits } from "@/lib/enquiry-contract";
import { IconBadge } from "@/components/shared/IconBadge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CalendarDays, Send, CheckCircle2, Loader2, X, MessageCircle } from "lucide-react";

const subscribeHydration = () => () => {};
const clientHydrated = () => true;
const serverHydrated = () => false;

interface BookDemoPopupProps { triggerClassName?: string; triggerVariant?: "default" | "outline" | "ghost"; triggerSize?: "default" | "sm" | "lg"; triggerLabel?: string; showIcon?: boolean; source?: string }
export function BookDemoPopup({ triggerClassName = "", triggerVariant = "default", triggerSize = "default", triggerLabel = "Request a demo", showIcon = true, source = "popup" }: BookDemoPopupProps) {
  const hydrated = useSyncExternalStore(subscribeHydration, clientHydrated, serverHydrated);
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const { formElement, errorElement, ...form } = useEnquiryForm("demo", { name: "", email: "", phone: "", source });
  const fields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "John Doe", max: enquiryLimits.name, autoComplete: "name" },
    { name: "email", label: "Email Address", type: "email", placeholder: "john@company.com", max: enquiryLimits.email, autoComplete: "email" },
    { name: "phone", label: "Mobile Number", type: "tel", placeholder: "+91 98765 43210", max: enquiryLimits.phone, autoComplete: "tel" },
  ];
  function handleOpenChange(open: boolean) { if (!open) form.cancel(); setIsOpen(open); }
  if (!hydrated) return <a href="/contact" className={`inline-flex items-center justify-center rounded-lg min-h-11 px-4 py-2 text-sm font-semibold bg-brand-600 text-white whitespace-normal text-center ${triggerClassName}`}>{triggerLabel}</a>;
  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild><Button variant={triggerVariant} size={triggerSize} className={`bg-brand-600 text-brand-primary-foreground hover:bg-brand-700 font-semibold shadow-lg shadow-brand-primary/20 hover:shadow-xl hover:shadow-brand-primary/25 transition-all duration-300 ${triggerClassName}`}>{showIcon && <CalendarDays className="mr-2 h-4 w-4" aria-hidden="true" />}{triggerLabel}</Button></DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[calc(100dvh-2rem)] overflow-y-auto bg-background border-border/60 shadow-2xl">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold flex items-center gap-2"><span className="icon-tile h-8 w-8"><MessageCircle className="h-4 w-4" aria-hidden="true" /></span>Request a demo</DialogTitle>
          <DialogDescription className="text-text-secondary">Send a demo enquiry to our team. This does not schedule an appointment or activate an account.</DialogDescription>
        </DialogHeader>
        {form.receipt ? (
          <div className="text-center py-6" role="status">
            <div className="flex justify-center mb-4"><IconBadge icon={CheckCircle2} tone="success" size="lg" className="h-14 w-14 rounded-full [&_svg]:size-7" /></div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Demo Enquiry Received</h3>
            <p className="text-text-secondary text-sm mb-4">We saved your enquiry. Our team can follow up using the details you provided. This receipt does not schedule an appointment or activate an account.</p>
            <p className="text-xs text-text-muted break-all mb-4">Reference: {form.receipt}</p>
            <Button type="button" onClick={() => handleOpenChange(false)}>Close</Button>
            <Button type="button" variant="outline" className="mt-3 w-full" onClick={form.another}>Start another enquiry</Button>
          </div>
        ) : (
          <form ref={formElement} onSubmit={form.handleSubmit} noValidate className="space-y-4" aria-busy={form.isSubmitting}>
            {fields.map((field) => (
              <div className="space-y-2" key={field.name}>
                <Label htmlFor={`${id}-${field.name}`} className="text-sm font-medium text-text-primary">{field.label} <span className="text-destructive" aria-hidden="true">*</span><span className="sr-only"> (required)</span></Label>
                <Input {...form.field(field.name)} id={`${id}-${field.name}`} type={field.type} placeholder={field.placeholder} required maxLength={field.max} autoComplete={field.autoComplete} aria-describedby={form.fieldErrors[field.name] ? `${id}-${field.name}-error` : undefined} className="h-11 border-border focus:border-brand-primary focus:ring-brand-primary/20" />
                {form.fieldErrors[field.name] && <p id={`${id}-${field.name}-error`} className="text-xs text-destructive">{form.fieldErrors[field.name]}</p>}
              </div>
            ))}
            <p className="text-xs text-text-muted">Submitting loads Google reCAPTCHA for verification. Read our <a href="/privacy" className="link-inline">Privacy Policy</a> before sending an enquiry.</p>
            {form.error && <div ref={errorElement} tabIndex={-1} className="p-3 rounded-lg bg-error-soft border border-error-border" role="alert"><p className="text-sm text-destructive">{form.error}</p><a href="mailto:support@whats91.com" className="link-inline text-sm">Contact support</a></div>}
            <div role="status" aria-live="polite" className="text-sm text-text-secondary">{form.phase}</div>
            {form.uncertain && <Button type="button" variant="outline" onClick={form.allowRetry} className="w-full h-auto min-h-11 whitespace-normal">Try again (may create a duplicate enquiry)</Button>}
            <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
              <Button type="button" variant="outline" onClick={() => handleOpenChange(false)} className="sm:flex-1 h-11 border-border hover:bg-surface"><X className="mr-2 h-4 w-4" aria-hidden="true" />Cancel</Button>
              <Button type="submit" disabled={form.isSubmitting || form.uncertain} className="sm:flex-1 h-11 bg-brand-600 text-brand-primary-foreground hover:bg-brand-700 font-semibold shadow-lg shadow-brand-primary/25 transition-all duration-300">{form.isSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />Submitting...</> : <><Send className="mr-2 h-4 w-4" aria-hidden="true" />Submit Request</>}</Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
