import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 reactStrictMode: true,
 images: {
  domains: ["d22bh6ti9eb5nb.cloudfront.net"],
  unoptimized: true,
 },
 output: "standalone",
};

export default nextConfig;
