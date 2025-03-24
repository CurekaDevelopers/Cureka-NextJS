/** @type {import('next').NextConfig} */
const webpack = require("webpack");

const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.cureka.com",
      },
      {
        protocol: "https",
        hostname: "cureka-static.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "cureka-static.s3.ap-south-1.amazonaws.com",
        pathname: "/new-uploads/**",
      },
    ],
  },
  output: "standalone",
  experimental: {
    turbo: {
      loaders: {},
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        crypto: false,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
