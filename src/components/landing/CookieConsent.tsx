"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, Cookie, Settings2, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const COOKIE_CONSENT_KEY = "whats91_cookie_consent";
const CONSENT_VERSION = 2;
const OPEN_SETTINGS_EVENT = "whats91:open-cookie-settings";

type ConsentPreferences = {
  version: number;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

const emptyPreferences = (): ConsentPreferences => ({
  version: CONSENT_VERSION,
  analytics: false,
  marketing: false,
  updatedAt: new Date().toISOString(),
});

function readStoredPreferences(): ConsentPreferences | null {
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!stored) return null;

  if (stored === "accepted") {
    return { ...emptyPreferences(), analytics: true, marketing: true };
  }
  if (stored === "rejected") return emptyPreferences();

  try {
    const parsed = JSON.parse(stored) as Partial<ConsentPreferences>;
    if (parsed.version !== CONSENT_VERSION) return null;
    return {
      version: CONSENT_VERSION,
      analytics: Boolean(parsed.analytics),
      marketing: Boolean(parsed.marketing),
      updatedAt: typeof parsed.updatedAt === "string" ? parsed.updatedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [hasSavedChoice, setHasSavedChoice] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>(emptyPreferences);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readStoredPreferences();
      if (stored) {
        setPreferences(stored);
        setHasSavedChoice(true);
      } else {
        setShowBanner(true);
      }
    }, 400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const openSettings = () => {
      setShowBanner(false);
      setShowSettings(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, openSettings);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, openSettings);
  }, []);

  const savePreferences = (next: ConsentPreferences) => {
    const saved = { ...next, version: CONSENT_VERSION, updatedAt: new Date().toISOString() };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(saved));
    setPreferences(saved);
    setHasSavedChoice(true);
    setShowBanner(false);
    setShowSettings(false);
    window.dispatchEvent(new CustomEvent("whats91:cookie-consent-changed", { detail: saved }));
  };

  const keepOptionalOff = () => savePreferences(emptyPreferences());
  const allowOptional = () => savePreferences({ ...emptyPreferences(), analytics: true, marketing: true });

  return (
    <>
      {showBanner ? (
        <div className="fixed inset-x-0 bottom-0 z-[var(--z-toast)] px-3 pb-3 sm:px-4 sm:pb-4" role="dialog" aria-modal="false" aria-labelledby="cookie-banner-title">
          <div className="mx-auto max-w-[1200px] rounded-2xl border border-border bg-card/98 p-4 shadow-xl backdrop-blur-sm sm:p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
              <div className="flex flex-1 items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><Cookie className="h-5 w-5" aria-hidden="true" /></span>
                <div>
                  <h2 id="cookie-banner-title" className="text-sm font-semibold text-text-primary">Your browser-storage choices</h2>
                  <p className="mt-1 text-xs leading-5 text-text-secondary sm:text-sm">
                    We use essential browser storage and Google reCAPTCHA for preference and form security. Analytics and marketing technologies are currently off. Read our <Link href="/cookies" className="font-medium text-brand-700 underline underline-offset-2">Cookie Policy</Link>.
                  </p>
                </div>
              </div>
              <div className="grid gap-2 sm:grid-cols-3 lg:flex lg:shrink-0">
                <Button variant="ghost" onClick={() => { setShowBanner(false); setShowSettings(true); }} className="h-11"><Settings2 className="mr-2 h-4 w-4" />Manage</Button>
                <Button variant="outline" onClick={keepOptionalOff} className="h-11">Keep optional off</Button>
                <Button onClick={allowOptional} className="h-11 bg-brand-600 text-white hover:bg-brand-700">Allow optional</Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showSettings ? (
        <div className="fixed inset-0 z-[var(--z-modal)] flex items-end justify-center bg-ink/60 p-3 sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="cookie-settings-title">
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-border bg-card shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-6">
              <div>
                <div className="mb-2 flex items-center gap-2 text-brand-700"><ShieldCheck className="h-5 w-5" aria-hidden="true" /><span className="text-xs font-semibold uppercase tracking-[0.12em]">Privacy controls</span></div>
                <h2 id="cookie-settings-title" className="text-xl font-bold text-text-primary">Cookie settings</h2>
                <p className="mt-2 text-sm leading-6 text-text-secondary">Optional categories are currently inactive. These choices are saved for this policy version and do not authorise an undisclosed vendor.</p>
              </div>
              {hasSavedChoice ? <button type="button" onClick={() => setShowSettings(false)} className="rounded-lg p-2 text-text-muted hover:bg-surface hover:text-text-primary" aria-label="Close cookie settings"><X className="h-5 w-5" /></button> : null}
            </div>

            <div className="space-y-3 p-5 sm:p-6">
              <PreferenceRow title="Essential and security" description="Required for consent storage, core operation, and form protection." checked disabled onChange={() => undefined} />
              <PreferenceRow title="Analytics" description="Currently inactive. Would require an updated inventory before activation." checked={preferences.analytics} onChange={(checked) => setPreferences((current) => ({ ...current, analytics: checked }))} />
              <PreferenceRow title="Marketing" description="Currently inactive. Would require an updated inventory before activation." checked={preferences.marketing} onChange={(checked) => setPreferences((current) => ({ ...current, marketing: checked }))} />
            </div>

            <div className="flex flex-col-reverse gap-2 border-t border-border p-5 sm:flex-row sm:justify-end sm:p-6">
              <Button variant="outline" onClick={keepOptionalOff}>Keep optional off</Button>
              <Button onClick={() => savePreferences(preferences)} className="bg-brand-600 text-white hover:bg-brand-700"><Check className="mr-2 h-4 w-4" />Save preferences</Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function PreferenceRow({ title, description, checked, disabled = false, onChange }: { title: string; description: string; checked: boolean; disabled?: boolean; onChange: (checked: boolean) => void }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-border p-4 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600">
      <span>
        <span className="block text-sm font-semibold text-text-primary">{title}</span>
        <span className="mt-1 block text-xs leading-5 text-text-muted">{description}</span>
      </span>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(event) => onChange(event.target.checked)} className="mt-1 h-5 w-5 accent-brand-600" />
    </label>
  );
}
