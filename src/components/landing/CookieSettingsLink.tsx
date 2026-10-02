"use client";
import { openPreferencesEvent } from "@/lib/browser-preferences";

export function CookieSettingsLink() {
  return (
    <button
      type="button"
      data-cookie-settings-trigger
      onClick={(event) => window.dispatchEvent(new CustomEvent(openPreferencesEvent, { detail: { trigger: event.currentTarget } }))}
      className="text-xs text-text-muted transition-colors hover:text-text-primary sm:text-sm"
    >
      Cookie Settings
    </button>
  );
}
