import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  async rewrites() {
    return [{ source: "/logo.jpeg", destination: "/Logo.jpeg" }];
  },
};

export default nextConfig;
