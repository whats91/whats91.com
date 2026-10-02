type RecaptchaAction = "contact_form" | "book_demo";
import { waitForOperation, withDeadline } from "@/lib/bounded-operation";
import { enquiryDeadlines } from "@/lib/enquiry-contract";

declare global {
  interface Window {
    grecaptcha?: { ready: (callback: () => void) => void; execute: (siteKey: string, options: { action: string }) => Promise<string> };
  }
}
let scriptPromise: Promise<void> | null = null;

async function loadScript(siteKey: string) {
  if (window.grecaptcha) return;
  if (!scriptPromise) {
    scriptPromise = withDeadline(async (signal) => {
      document.getElementById("whats91-recaptcha")?.remove();
      const script = document.createElement("script");
      script.id = "whats91-recaptcha";
      script.src = `https://www.google.com/recaptcha/api.js?render=${encodeURIComponent(siteKey)}`;
      script.async = true;
      try {
        await waitForOperation(() => new Promise<void>((resolve, reject) => {
          script.onload = () => window.grecaptcha ? resolve() : reject(new Error("Verification unavailable"));
          script.onerror = () => reject(new Error("Verification unavailable"));
          document.head.appendChild(script);
        }), signal);
      } catch (error) { script.remove(); throw error; }
      finally { script.onload = null; script.onerror = null; }
    }, enquiryDeadlines.script).finally(() => { scriptPromise = null; });
  }
  await scriptPromise;
}

export async function executeRecaptcha(action: RecaptchaAction, signal?: AbortSignal): Promise<string> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (typeof window === "undefined" || !siteKey) throw new Error("Verification unavailable");
  return withDeadline(async (captchaSignal) => {
    await waitForOperation(() => loadScript(siteKey), captchaSignal);
    const captcha = window.grecaptcha;
    if (!captcha) throw new Error("Verification unavailable");
    await withDeadline(() => new Promise<void>((resolve) => captcha.ready(resolve)), enquiryDeadlines.ready, captchaSignal);
    const token = await withDeadline(() => captcha.execute(siteKey, { action }), enquiryDeadlines.execute, captchaSignal);
    if (typeof token !== "string" || !token || token.length > 4096) throw new Error("Verification unavailable");
    return token;
  }, enquiryDeadlines.captchaClient, signal);
}
