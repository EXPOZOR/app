import { execSync } from "node:child_process";
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

function getCommitSha(): string {
  try {
    return execSync("git rev-parse --short HEAD").toString().trim();
  } catch {
    return "dev";
  }
}

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_COMMIT_SHA: getCommitSha(),
    NEXT_PUBLIC_BUILD_DATE: new Date().toISOString(),
    NEXT_PUBLIC_APP_VERSION: "0.0.1",
  },
  experimental: {
    // PPR and reactCompiler require Next.js canary — enable when upgrading
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.expozor.app",
      },
    ],
  },
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Frame-Options", value: "DENY" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
        {
          key: "Content-Security-Policy",
          value: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' blob: data:",
            "font-src 'self'",
            "connect-src 'self' https://*.neon.tech",
            "frame-ancestors 'none'",
          ].join("; "),
        },
      ],
    },
  ],
};

export default withNextIntl(nextConfig);
