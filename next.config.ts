import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/portfolio",          // 👈 Repo name
  assetPrefix: "/portfolio/",      // 👈 Fix static assets
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
