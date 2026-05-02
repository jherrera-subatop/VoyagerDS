import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tokens are compiled in dev:full/prebuild scripts — NOT here.
  // See terrazzo.config.mjs for the token pipeline.
  experimental: {
    turbo: {
      root: __dirname,
    },
  },
};

export default nextConfig;
