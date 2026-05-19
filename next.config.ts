import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kqibgbvdgxrjhdyfoxvm.supabase.co",
      },
      {
        protocol: "https",
        hostname: "smallcakesgwinnett.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2592000,
  },
  async headers() {
    const securityHeaders = [
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://player.vimeo.com https://f.vimeocdn.com https://fresnel.vimeocdn.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' data: https://fonts.gstatic.com",
          "img-src 'self' data: blob: https://kqibgbvdgxrjhdyfoxvm.supabase.co https://smallcakesgwinnett.com https://i.vimeocdn.com https://f.vimeocdn.com",
          "media-src 'self' https://player.vimeo.com https://*.vimeocdn.com blob:",
          "frame-src 'self' https://player.vimeo.com",
          "connect-src 'self' https://kqibgbvdgxrjhdyfoxvm.supabase.co https://player.vimeo.com https://api.vimeo.com https://fresnel.vimeocdn.com https://*.vimeocdn.com",
          "worker-src blob:",
        ].join("; "),
      },
      {
        key: "Cross-Origin-Opener-Policy",
        value: "same-origin-allow-popups",
      },
      {
        key: "X-Frame-Options",
        value: "SAMEORIGIN",
      },
      {
        key: "X-Content-Type-Options",
        value: "nosniff",
      },
      {
        key: "Referrer-Policy",
        value: "strict-origin-when-cross-origin",
      },
    ];

    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
