/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enables static HTML generation
  distDir: 'docs',   // Optional: Change output directory
  images: {
    unoptimized: true, // Disable default image optimization
  },
  assetPrefix: '',
  basePath: '',
};

export default nextConfig;
