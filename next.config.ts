import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern, much smaller formats. AVIF first, WebP fallback.
    formats: ["image/avif", "image/webp"],
    // Cache optimized images for 30 days so they aren't re-encoded each request.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default nextConfig;
