"use client";

export function CookieSettingsLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("whats91:open-cookie-settings"))}
      className="text-xs text-text-muted transition-colors hover:text-text-primary sm:text-sm"
    >
      Cookie Settings
    </button>
  );
}
