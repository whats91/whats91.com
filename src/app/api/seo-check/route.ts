const CACHE_HEADERS = {
  "Cache-Control": "private, no-store, max-age=0",
  Pragma: "no-cache",
};

const ALLOWED_HEADERS = {
  ...CACHE_HEADERS,
  Allow: "POST, OPTIONS",
};

const UNAVAILABLE_BODY = JSON.stringify({
  success: false,
  error: "SEO check is unavailable",
});

export async function POST() {
  return new Response(UNAVAILABLE_BODY, {
    status: 410,
    headers: {
      ...ALLOWED_HEADERS,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

export async function GET() {
  return new Response(null, {
    status: 405,
    headers: ALLOWED_HEADERS,
  });
}

export async function HEAD() {
  return new Response(null, {
    status: 405,
    headers: ALLOWED_HEADERS,
  });
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: ALLOWED_HEADERS,
  });
}
