import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['static.wikia.nocookie.net', 'lh3.googleusercontent.com', 'www.google.com', 'static3.depositphotos.com']
  }
};

export default nextConfig;
