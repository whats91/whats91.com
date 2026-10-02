"use client";
import { useEffect, useRef, useState } from "react";
import { contactFields, demoFields } from "@/lib/enquiry-contract";
import { submitEnquiry } from "@/lib/enquiry-client";
import { newGraphSubmissionKey } from "@/lib/graph-form-submissions";

export function useEnquiryForm(kind: "contact" | "demo", defaults: Record<string, string>) {
  const [values, setValues] = useState(defaults);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [uncertain, setUncertain] = useState(false);
  const [phase, setPhase] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const lock = useRef(false);
  const controller = useRef<AbortController | null>(null);
  const mounted = useRef(true);
  const submission = useRef<{ fingerprint: string; key: string } | null>(null);
  useEffect(() => { mounted.current = true; return () => { mounted.current = false; controller.current?.abort(); }; }, []);
  useEffect(() => {
    if (isSubmitting || !error) return;
    const first = Object.keys(fieldErrors)[0];
    const control = first ? formRef.current?.elements.namedItem(first) : null;
    if (control instanceof HTMLElement) control.focus(); else errorRef.current?.focus();
  }, [fieldErrors, error, isSubmitting]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (lock.current || uncertain || receipt) return;
    setError(null); setFieldErrors({});
    const parsed = (kind === "contact" ? contactFields : demoFields).safeParse(values);
    if (!parsed.success) {
      const fields: Record<string, string> = {};
      for (const issue of parsed.error.issues) { const field = String(issue.path[0]); if (!fields[field]) fields[field] = issue.message; }
      setFieldErrors(fields); setError("Check the highlighted fields."); return;
    }
    lock.current = true; setIsSubmitting(true);
    const attempt = new AbortController(); controller.current = attempt;
    const fingerprint = JSON.stringify(parsed.data);
    if (submission.current?.fingerprint !== fingerprint) submission.current = { fingerprint, key: newGraphSubmissionKey() };
    const result = await submitEnquiry(kind, parsed.data, submission.current.key, attempt.signal, (phase) => { if (mounted.current) setPhase(phase); });
    if (mounted.current) {
      if (result.success) {
        submission.current = null; setReceipt(result.data.id); setValues(defaults); formRef.current?.reset();
      } else { setError(result.message); setFieldErrors(result.fieldErrors); setUncertain(result.uncertain); }
      setIsSubmitting(false); setPhase("");
    }
    lock.current = false; controller.current = null;
  }
  return { values, setValues, isSubmitting, receipt, error, fieldErrors, uncertain, phase, handleSubmit,
    formElement(node: HTMLFormElement | null) { formRef.current = node; },
    errorElement(node: HTMLDivElement | null) { errorRef.current = node; },
    field(name: string) { return { name, value: values[name] ?? "", onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setValues((previous) => ({ ...previous, [name]: event.target.value })), disabled: isSubmitting, "aria-invalid": !!fieldErrors[name] }; },
    cancel() { controller.current?.abort(); },
    allowRetry() { setUncertain(false); setError(null); setFieldErrors({}); },
    another() { submission.current = null; setReceipt(null); setError(null); setFieldErrors({}); setUncertain(false); },
  };
}
