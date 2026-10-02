/** Local payload grammar. Validation does not prove a recipient, mailbox or network exists. */
export type PayloadResult = { ok: true; value: string } | { ok: false; error: string };
export type QRType = "url" | "text" | "whatsapp" | "email" | "phone" | "wifi";
export type WiFiData = { ssid: string; password: string; security: "WPA" | "WEP" | "nopass" };
const fail = (error: string): PayloadResult => ({ ok: false, error });
const pass = (value: string): PayloadResult => ({ ok: true, value });
export function internationalPhone(raw: string): PayloadResult {
  const value = raw.trim();
  return /^\+?[1-9]\d{6,14}$/.test(value) ? pass(value.replace(/^\+/, "")) : fail("Enter 7–15 digits including country code, with an optional leading +. Do not include spaces, extensions or punctuation.");
}
export function whatsappPayload(number: string, message: string): PayloadResult {
  const phone = internationalPhone(number);
  if (!phone.ok) return phone;
  try { return pass(`https://wa.me/${phone.value}${message.trim() ? `?text=${encodeURIComponent(message.trim())}` : ""}`); } catch { return fail("The message contains invalid text encoding. Re-enter it before generating."); }
}
const escapeWiFi = (value: string) => value.replace(/[\\;,:\"]/g, "\\$&");
export function qrPayload(input: { type: QRType; text: string; number: string; message: string; email: string; subject: string; phone: string; wifi: WiFiData }): PayloadResult {
  switch (input.type) {
    case "text": return input.text.trim() ? pass(input.text) : fail("Enter text to encode. Text is not validated as a web address.");
    case "url": {
      const raw = input.text.trim();
      if (!raw || /\s/.test(raw)) return fail("Enter an HTTP or HTTPS web address without spaces.");
      try {
        // A bare hostname is accepted; an explicit other scheme never becomes HTTPS.
        const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(raw) ? raw : `https://${raw}`);
        if (!["http:", "https:"].includes(url.protocol) || !url.hostname || url.username || url.password || (!url.hostname.includes(".") && url.hostname !== "localhost")) return fail("Use an HTTP or HTTPS web address with a hostname and no embedded login.");
        return pass(url.href);
      } catch { return fail("Enter a valid HTTP or HTTPS web address."); }
    }
    case "whatsapp": return whatsappPayload(input.number, input.message);
    case "phone": { const phone = internationalPhone(input.phone); return phone.ok ? pass(`tel:+${phone.value}`) : phone; }
    case "email": {
      const email = input.email.trim();
      if (!/^[a-z\d._+-]+@[a-z\d](?:[a-z\d-]*[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]*[a-z\d])?)+$/i.test(email) || email.startsWith(".") || email.includes("..")) return fail("Enter one email address, such as name@example.com.");
      try { return pass(`mailto:${email}${input.subject.trim() ? `?subject=${encodeURIComponent(input.subject.trim())}` : ""}`); } catch { return fail("The subject contains invalid text encoding. Re-enter it before generating."); }
    }
    case "wifi": {
      const { ssid, password, security } = input.wifi;
      if (!ssid.trim() || new TextEncoder().encode(ssid).length > 32 || /[\x00-\x1f\x7f]/.test(ssid)) return fail("Enter a network name of 1–32 bytes without control characters.");
      if (!["WPA", "WEP", "nopass"].includes(security)) return fail("Choose a supported Wi-Fi security type.");
      if (security === "WPA" && !((password.length >= 8 && password.length <= 63 && /^[\x20-\x7e]+$/.test(password)) || /^[a-f\d]{64}$/i.test(password))) return fail("WPA requires 8–63 printable characters or a 64-digit hexadecimal key.");
      if (security === "WEP" && !([5, 13].includes(password.length) && /^[\x20-\x7e]+$/.test(password)) && !/^([a-f\d]{10}|[a-f\d]{26})$/i.test(password)) return fail("WEP requires 5 or 13 printable characters, or 10 or 26 hexadecimal digits.");
      return pass(`WIFI:T:${security};S:${escapeWiFi(ssid)};${security === "nopass" ? "" : `P:${escapeWiFi(password)};`};`);
    }
  }
}
function luminance(hex: string) {
  const rgb = hex.slice(1).match(/../g)!.map(value => parseInt(value, 16) / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4);
  return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
}
export function qrAppearance(foreground: string, background: string, size: number): string | null {
  if (![foreground, background].every(value => /^#[a-f\d]{6}$/i.test(value))) return "Use six-digit hexadecimal colors, such as #000000.";
  const dark = luminance(foreground), light = luminance(background);
  if (dark >= light || (light + .05) / (dark + .05) < 4.5) return "Use dark modules on a light background with at least 4.5:1 contrast. Test the PNG with your intended scanner.";
  if (!Number.isInteger(size) || size < 128 || size > 512) return "Choose a supported image size from 128 to 512 pixels.";
  return null;
}
/** Syntax and representation safety, not an approved commercial ceiling. */
export function numericInput(raw: string | number, options: { integer?: boolean; max?: number } = {}): number | null {
  if (typeof raw === "string" && (!raw.trim() || !/^\d+(?:\.\d+)?$/.test(raw.trim()))) return null;
  const value = Number(raw);
  return Number.isFinite(value) && value >= 0 && value <= (options.max ?? Number.MAX_SAFE_INTEGER) && (!options.integer || Number.isSafeInteger(value)) ? value : null;
}
export type ROIInputs = { monthlyLeads: string; humanCostPerLead: string; aiCostPerLead: string; selfBuildCostPerLead: string; aiQualificationRate: string; selfBuildQualificationRate: string };
export function calculateROI(input: ROIInputs) {
  const n = numericInput(input.monthlyLeads, { integer: true });
  const h = numericInput(input.humanCostPerLead), a = numericInput(input.aiCostPerLead), s = numericInput(input.selfBuildCostPerLead);
  const ar = numericInput(input.aiQualificationRate, { max: 100 }), sr = numericInput(input.selfBuildQualificationRate, { max: 100 });
  if ([n,h,a,s,ar,sr].some(value => value === null)) return null;
  const human = n! * h!, ai = n! * a!, self = n! * s!;
  const aq = Math.round(n! * (ar! / 100)), sq = Math.round(n! * (sr! / 100));
  const ratio = (top: number, bottom: number) => bottom === 0 ? null : top / bottom;
  const result = { human, ai, self, aq, sq, aiPerQualified: ratio(ai, aq), selfPerQualified: ratio(self, sq), monthlyHumanSaving: human - ai, yearlyHumanSaving: (human - ai) * 12, monthlySelfSaving: self - ai, yearlySelfSaving: (self - ai) * 12, humanROI: ratio((human - ai) * 100, ai), selfROI: ratio((self - ai) * 100, ai), qualifiedDifference: ratio((aq - sq) * 100, sq) };
  return Object.values(result).every(value => value === null || (Number.isFinite(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER)) ? result : null;
}
