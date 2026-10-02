"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Check, Cookie, Settings2, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { optionalOff, openPreferencesEvent, readPreferences, writePreferences, type BrowserPreferences } from "@/lib/browser-preferences";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [hasChoice, setHasChoice] = useState(false);
  const [preferences, setPreferences] = useState<BrowserPreferences>(optionalOff);
  const [draft, setDraft] = useState<BrowserPreferences>(optionalOff);
  const [notice, setNotice] = useState("");
  const [saveFailed, setSaveFailed] = useState(false);
  const invoker = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = readPreferences(() => window.localStorage);
      setPreferences(stored.preferences); setDraft(stored.preferences);
      setHasChoice(stored.state === "current"); setShowBanner(stored.state !== "current");
      if (stored.state === "unavailable") setNotice("Browser storage is unavailable. Your choices may not be remembered after this page reloads.");
      if (stored.state === "invalid") setNotice("Saved choices could not be read. Optional technologies remain inactive; please choose again.");
      if (stored.state === "legacy") setNotice("A previous general choice does not establish individual category choices. Please review your preferences.");
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const openSettings = (event: Event) => {
      const target = (event as CustomEvent<{ trigger?: HTMLElement }>).detail?.trigger;
      invoker.current = target instanceof HTMLElement ? target : document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setDraft(preferences); setSaveFailed(false); setShowBanner(false); setShowSettings(true);
    };
    window.addEventListener(openPreferencesEvent, openSettings);
    return () => window.removeEventListener(openPreferencesEvent, openSettings);
  }, [preferences]);

  function openFromBanner(event: React.MouseEvent<HTMLButtonElement>) {
    invoker.current = event.currentTarget; setDraft(preferences); setSaveFailed(false); setShowBanner(false); setShowSettings(true);
  }
  function closeSettings(open: boolean) {
    setShowSettings(open);
    if (!open && !hasChoice) setShowBanner(true);
  }
  function save(next: BrowserPreferences) {
    const result = writePreferences(() => window.localStorage, next);
    setPreferences(result.preferences); setDraft(result.preferences); setHasChoice(true);
    setSaveFailed(!result.persisted);
    if (result.persisted) { setNotice(""); setShowBanner(false); setShowSettings(false); }
    else setNotice("We couldn't confirm a save to this browser. Your choices apply to this page, but may not be remembered after a reload. Optional technologies remain inactive.");
    window.dispatchEvent(new CustomEvent("whats91:cookie-consent-changed", { detail: { ...result.preferences, persisted: result.persisted } }));
  }
  const continueForPage = () => { setShowBanner(false); setShowSettings(false); };

  return <>
    {showBanner && <div className="fixed inset-x-0 bottom-0 z-[var(--z-toast)] px-3 pb-3 sm:px-4 sm:pb-4 aria-hidden:hidden" role="dialog" aria-modal="false" aria-labelledby="cookie-banner-title">
      <div className="mx-auto max-h-[calc(100dvh-2rem)] max-w-[1200px] overflow-y-auto rounded-2xl border border-border bg-card/98 p-4 shadow-xl backdrop-blur-sm sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-1 items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700"><Cookie className="h-5 w-5" aria-hidden="true" /></span><div>
            <h2 id="cookie-banner-title" className="text-sm font-semibold text-text-primary">Your browser-storage choices</h2>
            <p className="mt-1 text-xs leading-5 text-text-secondary sm:text-sm">We remember preferences in this browser when storage is available. Submitting a form loads Google reCAPTCHA for verification. Analytics and marketing technologies are currently inactive. Read our <Link prefetch={false} href="/cookies" className="link-inline">Cookie Policy</Link>.</p>
            {notice && <p className="mt-2 text-xs leading-5 text-text-primary" role={saveFailed ? "alert" : "status"}>{notice}</p>}
          </div></div>
          <div className="grid gap-2 sm:grid-cols-3 lg:flex lg:shrink-0">
            <Button variant="ghost" data-cookie-manage onClick={openFromBanner} className="h-11"><Settings2 className="mr-2 h-4 w-4" aria-hidden="true" />Manage</Button>
            <Button variant="outline" onClick={() => save(optionalOff())} className="h-11">Keep optional off</Button>
            <Button onClick={() => save({ ...optionalOff(), analytics: true, marketing: true })} className="h-11 bg-brand-600 text-white hover:bg-brand-700">Allow optional</Button>
          </div>
        </div>
        {saveFailed && <Button type="button" variant="outline" onClick={continueForPage} className="mt-3 min-h-11 h-auto whitespace-normal">Continue for this page</Button>}
      </div>
    </div>}
    <Dialog open={showSettings} onOpenChange={closeSettings}>
      <DialogContent aria-labelledby="cookie-settings-title" showCloseButton={false} className="z-[var(--z-modal)] max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-2xl bg-card p-5 sm:max-w-xl sm:p-6"
        onOpenAutoFocus={(event) => { event.preventDefault(); document.getElementById("cookie-settings-title")?.focus(); }}
        onCloseAutoFocus={(event) => { event.preventDefault(); window.requestAnimationFrame(() => { const target = invoker.current; if (target?.isConnected) target.focus(); else ((document.querySelector("[data-cookie-manage]") ?? document.querySelector("[data-cookie-settings-trigger]")) as HTMLElement | null)?.focus(); }); }}>
        <DialogHeader className="text-left pr-10">
          <div className="flex items-center gap-2 text-brand-700"><ShieldCheck className="h-5 w-5" aria-hidden="true" /><span className="text-xs font-semibold uppercase tracking-[0.12em]">Privacy controls</span></div>
          <DialogTitle id="cookie-settings-title" tabIndex={-1} className="text-xl font-bold">Cookie settings</DialogTitle>
          <DialogDescription className="text-sm leading-6">Optional categories are currently inactive. Saved choices do not authorise an undisclosed vendor or materially different purpose.</DialogDescription>
        </DialogHeader>
        <DialogClose asChild><Button type="button" variant="ghost" className="absolute right-2 top-2 h-11 w-11 p-0" aria-label="Close cookie settings"><X className="h-5 w-5" aria-hidden="true" /></Button></DialogClose>
        <div className="space-y-3">
          <PreferenceRow title="Essential and security" description="Browser preferences and form verification; optional categories do not control these functions." checked disabled onChange={() => undefined} />
          <PreferenceRow title="Analytics" description="Currently inactive. An updated inventory is required before activation." checked={draft.analytics} onChange={(checked) => setDraft((current) => ({ ...current, analytics: checked }))} />
          <PreferenceRow title="Marketing" description="Currently inactive. An updated inventory is required before activation." checked={draft.marketing} onChange={(checked) => setDraft((current) => ({ ...current, marketing: checked }))} />
        </div>
        {notice && <p className="text-sm leading-6 text-text-primary" role={saveFailed ? "alert" : "status"}>{notice}</p>}
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button variant="outline" onClick={() => save(optionalOff())}>Keep optional off</Button>
          <Button onClick={() => save(draft)} className="bg-brand-600 text-white hover:bg-brand-700"><Check className="mr-2 h-4 w-4" aria-hidden="true" />Save preferences</Button>
        </div>
        {saveFailed && <Button type="button" variant="outline" onClick={continueForPage}>Continue for this page</Button>}
      </DialogContent>
    </Dialog>
  </>;
}

function PreferenceRow({ title, description, checked, disabled = false, onChange }: { title: string; description: string; checked: boolean; disabled?: boolean; onChange: (checked: boolean) => void }) {
  return <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-border p-4 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-600">
    <span><span className="block text-sm font-semibold text-text-primary">{title}</span><span className="mt-1 block text-xs leading-5 text-text-muted">{description}</span></span>
    <input type="checkbox" aria-label={title} checked={checked} disabled={disabled} onChange={(event) => onChange(event.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-brand-600" />
  </label>;
}
