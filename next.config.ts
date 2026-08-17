import path from "node:path";
import type { NextConfig } from "next";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: BASE_PATH,
  images: {
    unoptimized: true,
  },
  turbopack: {
    /*
     * Pin the workspace root to this repository. Without it Next walks up looking for a
     * lockfile, and on a machine with a stray lockfile in the home directory it picks
     * that instead — file tracing then covers everything under the user's profile.
     */
    root: path.resolve(process.cwd()),
  },
};

export default nextConfig;
