import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Placeholder imagery is served from Unsplash. Once real photos live in
    // /public you can remove these patterns.
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.supabase.co" }, // media uploaded via /admin
    ],
  },
};

export default nextConfig;
