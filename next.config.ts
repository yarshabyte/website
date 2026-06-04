import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  allowedDevOrigins: ["192.168.18.6", "192.168.18.7", "192.168.18.8"],};

export default nextConfig;
