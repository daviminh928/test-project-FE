import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true, // Temporary fix for deployment
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "frontend-take-home.fetch.com",
        pathname: "/dog-images/**", // ✅ Allows all images from this domain
      },
    ],
  },
};

export default nextConfig;
