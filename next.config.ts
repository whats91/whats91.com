import type { NextConfig } from "next";
import { getAppVersion } from "./src/lib/version";
import { websiteSecurityHeaders } from "./src/lib/website-policy";

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async headers() {
    return [
      { source: '/:path*', headers: websiteSecurityHeaders(process.env.NODE_ENV === 'development') },
      { source: '/api/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
    ];
  },
  /* config options here */
  reactStrictMode: false,
  // Include version.txt in standalone build
  outputFileTracingIncludes: {
    '/*': ['./version.txt'],
    // Only the downloadable example route needs these runtime JSON records.
    '/api/flows/*': ['./src/lib/flows/json/*.json'],
  },
  // Bakes version.txt's contents into the build so the Footer can display it
  // without a client-side fetch (next.config.ts only ever runs in Node, so
  // this fs read never reaches the browser bundle).
  env: {
    NEXT_PUBLIC_APP_VERSION: getAppVersion(),
  },
};

export default nextConfig;
