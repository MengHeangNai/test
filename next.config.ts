import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        hostname: 'i.pravatar.cc',
        protocol: 'https',
        port: ''
      },
      {
        hostname: 'lh3.googleusercontent.com',
        protocol: 'https',
        port: ''
      }, {
        hostname: 'www.gstatic.com',
        protocol: 'https',
        port: ''
      }
    ]
  },
};

export default nextConfig;
