import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  // Hide the on-screen Next.js dev indicator (dev only; never shown in production)
  devIndicators: false,
};

export default nextConfig;
