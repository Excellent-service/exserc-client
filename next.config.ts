import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: false,       // ensure ESLint is used in build
  }
};

export default nextConfig;
