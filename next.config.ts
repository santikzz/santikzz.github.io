import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "santikzz.github.io" },
      { hostname: "nebulasolutions.com.ar" },
    ],
  },
};

export default nextConfig;
