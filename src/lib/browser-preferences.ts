export const preferenceKey = "whats91_cookie_consent";
export const preferenceVersion = 2;
export const openPreferencesEvent = "whats91:open-cookie-settings";
export type BrowserPreferences = { version: number; analytics: boolean; marketing: boolean; updatedAt: string };
type PreferenceStorage = Pick<Storage, "getItem" | "setItem">;
type StorageAccess = () => PreferenceStorage;
export const optionalOff = (): BrowserPreferences => ({ version: preferenceVersion, analytics: false, marketing: false, updatedAt: new Date().toISOString() });

export function readPreferences(storage: StorageAccess): { preferences: BrowserPreferences; state: "current" | "missing" | "legacy" | "invalid" | "unavailable" } {
  try {
    const raw = storage().getItem(preferenceKey);
    if (raw === null) return { preferences: optionalOff(), state: "missing" };
    // A generic legacy choice cannot establish granular consent. No auto-write.
    if (raw === "accepted" || raw === "rejected") return { preferences: optionalOff(), state: "legacy" };
    const value = JSON.parse(raw);
    if (!value || value.version !== preferenceVersion || typeof value.analytics !== "boolean" || typeof value.marketing !== "boolean" || typeof value.updatedAt !== "string" || !Number.isFinite(Date.parse(value.updatedAt))) return { preferences: optionalOff(), state: "invalid" };
    return { state: "current", preferences: { version: preferenceVersion, analytics: value.analytics, marketing: value.marketing, updatedAt: value.updatedAt } };
  } catch (error) { return { preferences: optionalOff(), state: error instanceof SyntaxError ? "invalid" : "unavailable" }; }
}

export function writePreferences(storage: StorageAccess, choices: Pick<BrowserPreferences, "analytics" | "marketing">) {
  const preferences = { ...optionalOff(), analytics: choices.analytics === true, marketing: choices.marketing === true };
  try {
    const target = storage(); const raw = JSON.stringify(preferences);
    target.setItem(preferenceKey, raw);
    // A silently ignored write also cannot establish confirmed persistence.
    return { preferences, persisted: target.getItem(preferenceKey) === raw };
  } catch { return { preferences, persisted: false }; }
}
