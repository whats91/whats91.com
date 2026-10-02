// Prepared for the website form cutover. Browser requests go directly to Graph
// so Graph's public rate limit does not see every visitor as the website server.
export const graphFormSubmissionUrl = "https://graph.whats91.com/public/form-submissions";

export type GraphFormKind = "contact" | "demo";
export type GraphFormFields = Record<string, string>;

export function newGraphSubmissionKey(): string {
  return crypto.randomUUID();
}

export function graphSubmissionBody(kind: GraphFormKind, fields: GraphFormFields, recaptchaToken: string) {
  if (kind === "contact") {
    return {
      formType: kind,
      fields: {
        name: fields.name,
        email: fields.email,
        phone: fields.phone || "",
        company: fields.company || "",
        subject: fields.subject,
        message: fields.message,
      },
      source: "contact-page",
      recaptchaToken,
    };
  }
  return {
    formType: kind,
    fields: { name: fields.name, email: fields.email, phone: fields.phone },
    source: fields.source || "popup",
    recaptchaToken,
  };
}

export async function submitGraphForm(
  kind: GraphFormKind,
  fields: GraphFormFields,
  recaptchaToken: string,
  idempotencyKey: string,
  signal: AbortSignal,
): Promise<Response> {
  if (!/^[A-Za-z0-9_-]{22,128}$/.test(idempotencyKey)) throw new Error("Invalid submission key");
  return fetch(graphFormSubmissionUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
    body: JSON.stringify(graphSubmissionBody(kind, fields, recaptchaToken)),
    signal,
    redirect: "error",
    cache: "no-store",
  });
}
