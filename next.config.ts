import type { NextConfig } from "next";
import { getAppVersion } from "./src/lib/version";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  // Ensure Prisma binaries are included in standalone build
  serverExternalPackages: ['@prisma/client', 'prisma'],
  // Include version.txt in standalone build
  outputFileTracingIncludes: {
    '/*': ['./version.txt'],
  },
  // Bakes version.txt's contents into the build so the Footer can display it
  // without a client-side fetch (next.config.ts only ever runs in Node, so
  // this fs read never reaches the browser bundle).
  env: {
    NEXT_PUBLIC_APP_VERSION: getAppVersion(),
  },
};

export default nextConfig;
