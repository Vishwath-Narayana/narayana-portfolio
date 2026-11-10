import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // The photos are exported at 2400px on the long edge, so never ask for more than that.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2400],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
