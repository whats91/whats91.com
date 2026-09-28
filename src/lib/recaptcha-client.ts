import type { RecaptchaAction } from "@/lib/recaptcha";

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}

export async function executeRecaptcha(action: RecaptchaAction): Promise<string> {
  if (typeof window === "undefined") {
    throw new Error("reCAPTCHA can only run in the browser.");
  }

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

  if (!siteKey) {
    throw new Error("reCAPTCHA site key is not configured.");
  }

  if (!window.grecaptcha) {
    throw new Error("reCAPTCHA is still loading. Please try again.");
  }

  await new Promise<void>((resolve) => {
    window.grecaptcha?.ready(resolve);
  });

  const token = await window.grecaptcha.execute(siteKey, { action });

  if (!token) {
    throw new Error("reCAPTCHA did not return a verification token.");
  }

  return token;
}
