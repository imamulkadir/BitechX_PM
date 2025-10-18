import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Your existing config options
  eslint: {
    ignoreDuringBuilds: true, // <-- this disables ESLint errors during build
  },
};

export default nextConfig;
