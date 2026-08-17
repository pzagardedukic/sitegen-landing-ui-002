import path from "node:path";
import type { NextConfig } from "next";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/*
 * Hosts allowed to load dev-only resources under /_next/*.
 *
 * Next 16 blocks these cross-origin by default, so opening the dev server from a phone on
 * the same network returns the HTML but no JS or CSS — a blank white page, with the reason
 * only visible in the terminal. Development only; the exported site is unaffected.
 *
 * Set DEV_ORIGINS to a comma-separated list when the machine's address changes.
 */
const DEV_ORIGINS = (process.env.DEV_ORIGINS ?? "192.168.1.145")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: BASE_PATH,
  allowedDevOrigins: DEV_ORIGINS,
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
