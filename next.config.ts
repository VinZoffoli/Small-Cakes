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
  },
};

export default nextConfig;
