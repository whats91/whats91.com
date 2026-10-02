import { z } from "zod";

export const enquiryLimits = { name: 100, email: 254, phone: 32, company: 160, subject: 100, message: 4000, source: 80, token: 4096 } as const;
export const enquiryDeadlines = { client: 30000, captchaClient: 8000, script: 3000, ready: 3000, execute: 5000 } as const;
export const contactSubjects = ["General Inquiry", "Sales & Pricing", "Technical Support", "API Integration", "Whats91 MCP Access", "Partnership", "Other"] as const;
export function supportedSubject(values: string[]) {
  return values.length === 1 && contactSubjects.some((subject) => subject === values[0]) ? values[0] : "";
}
const name = z.string().trim().min(2, "Enter at least 2 characters for your name.").max(enquiryLimits.name, "Use 100 characters or fewer for your name.");
const email = z.string().trim().max(enquiryLimits.email, "Use 254 characters or fewer for your email.").email("Enter a valid email address.");
const phone = z.string().trim().max(enquiryLimits.phone, "Use 32 characters or fewer for your phone number.").refine((value) => value === "" || /^\+?[\d () .-]+$/.test(value) && value.replace(/\D/g, "").length >= 10 && value.replace(/\D/g, "").length <= 15, "Enter a phone number with 10 to 15 digits.");
export const contactFields = z.object({
  name, email, phone: phone.optional().default(""),
  company: z.string().trim().max(enquiryLimits.company, "Use 160 characters or fewer for your company.").optional().default(""),
  subject: z.string().trim().min(3, "Select a subject.").max(enquiryLimits.subject, "Use 100 characters or fewer for the subject."),
  message: z.string().trim().min(10, "Enter at least 10 characters in your message.").max(enquiryLimits.message, "Use 4000 characters or fewer in your message."),
});
export const demoFields = z.object({
  name, email, phone: phone.refine((value) => value !== "", "Enter your phone number."),
  source: z.string().trim().max(enquiryLimits.source).regex(/^[a-z0-9-]+$/i).optional().default("popup"),
});
export const uncertainReceiptMessage = "We couldn't confirm whether your enquiry was received. It may still have been saved. Check with support before trying again to avoid a duplicate.";
