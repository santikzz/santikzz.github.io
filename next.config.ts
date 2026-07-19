import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      { hostname: "santikzz.github.io" },
      { hostname: "nebulasolutions.com.ar" },
    ],
  },
};

export default nextConfig;
