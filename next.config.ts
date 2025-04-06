import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       hostname: 'i.pravatar.cc',
  //       protocol: 'https',
  //       port: ''
  //     },
  //     {
  //       hostname: 'lh3.googleusercontent.com',
  //       protocol: 'https',
  //       port: ''
  //     }, {
  //       hostname: 'www.gstatic.com',
  //       protocol: 'https',
  //       port: ''
  //     },
  //     {
  //       hostname: 'f.woowoowoowoo.net',
  //       protocol: 'https',
  //       port: ''
  //     }
  //   ]
  // },
  experimental: {
    useCache: true,
  }
};

export default nextConfig;
