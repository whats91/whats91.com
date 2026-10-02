import { executeRecaptcha } from "@/lib/recaptcha-client";
import { withDeadline } from "@/lib/bounded-operation";
import { enquiryDeadlines, uncertainReceiptMessage } from "@/lib/enquiry-contract";
import { submitGraphForm } from "@/lib/graph-form-submissions";

export type EnquiryClientResult = { success: true; data: { id: string } } | { success: false; message: string; uncertain: boolean; fieldErrors: Record<string, string> };
const messages: Record<string, string> = {
  BUSY: "The enquiry service is busy. Please try again later.",
  BODY_TOO_LARGE: "This enquiry is too large. Shorten the fields and try again.",
  INVALID_BODY: "The request could not be read. Your fields are kept; please try again.",
  INVALID_FIELDS: "Check the highlighted fields.",
  CAPTCHA_UNAVAILABLE: "Verification is unavailable. Retry verification or contact support.",
  CAPTCHA_REJECTED: "Verification was not accepted. Retry verification or contact support.",
  IDEMPOTENCY_CONFLICT: "This submission changed during a retry. Contact support before sending it again.",
  INVALID_IDEMPOTENCY_KEY: "The submission could not be checked. Please reload and try again.",
};
export async function submitEnquiry(kind: "contact" | "demo", fields: Record<string, string>, idempotencyKey: string, signal: AbortSignal, onPhase: (phase: string) => void = () => {}): Promise<EnquiryClientResult> {
  let posted = false;
  try {
    return await withDeadline(async (boundedSignal) => {
      onPhase("Checking verification…");
      const token = await executeRecaptcha(kind === "contact" ? "contact_form" : "book_demo", boundedSignal);
      onPhase("Submitting enquiry…");
      posted = true;
      const response = await submitGraphForm(kind, fields, token, idempotencyKey, boundedSignal);
      const result = await response.json();
      if (response.ok && result?.success === true && typeof result.data?.id === "string" && /^[a-zA-Z0-9_-]{1,128}$/.test(result.data.id)) return { success: true, data: { id: result.data.id } };
      const code = result?.code;
      const knownFailure = result?.success === false && !response.ok && typeof code === "string" && !!messages[code];
      const fieldErrors: Record<string, string> = {};
      if (code === "INVALID_FIELDS" && Array.isArray(result.errors)) for (const issue of result.errors) {
        const field = issue?.path?.[0] === "fields" ? issue?.path?.[1] : issue?.path?.[0];
        if (["name", "email", "phone", "company", "subject", "message"].includes(field)) fieldErrors[field] = field === "email" ? "Check your email address." : `Check your ${field}.`;
      }
      const message = code === "INVALID_FIELDS" && !Object.keys(fieldErrors).length
        ? "Request details could not be checked. Retry verification or contact support."
        : messages[code];
      return { success: false, uncertain: !knownFailure, message: knownFailure ? message : uncertainReceiptMessage, fieldErrors };
    }, enquiryDeadlines.client, signal);
  } catch {
    return { success: false, uncertain: posted, message: posted ? uncertainReceiptMessage : "Verification stopped or is unavailable. Your fields are kept. Retry verification or contact support.", fieldErrors: {} };
  }
}
