import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  turbopackMemoryLimit: 4 * 1024 * 1024 * 1024, // 4GB
};

export default nextConfig;
