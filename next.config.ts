import type { NextConfig } from "next";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: BASE_PATH,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
