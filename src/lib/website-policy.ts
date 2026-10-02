/** Application candidate only; CDN/WAF/HTTPS policy needs separately verified ownership. */
export function websiteSecurityHeaders(development = false) {
  const csp = [
    "default-src 'self'",
    // Static Next pages include inline bootstrap data; nonce-only CSP requires a rendering change.
    `script-src 'self' 'unsafe-inline'${development ? " 'unsafe-eval'" : ""} https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/`,
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: blob:",
    "font-src 'self'",
    "connect-src 'self' https://www.google.com/recaptcha/ https://graph.whats91.com",
    "frame-src https://www.google.com/recaptcha/ https://recaptcha.google.com/recaptcha/",
    "media-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    // Incoming framing, preview indexing and HSTS require the pending OI05/OI10/OI11 choices.
  ].join('; ');
  return [
    { key: 'Content-Security-Policy', value: csp },
    { key: 'X-Content-Type-Options', value: 'nosniff' },
    { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  ];
}

export function websiteApiHeaders() {
  return { 'X-Robots-Tag': 'noindex', 'X-Content-Type-Options': 'nosniff', 'Cache-Control': 'no-store', Allow: 'GET, HEAD, OPTIONS' };
}

export function websiteReadOnlyError() {
  return Response.json({ error: 'Method not allowed' }, { status: 405, headers: websiteApiHeaders() });
}

export function publicBuildVersion(value: string | undefined) {
  // This public display value already appears in the Footer; it is not release/health proof.
  return value && value.length <= 80 && !/\s/.test(value) && /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/.test(value) ? value : undefined;
}
