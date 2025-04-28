/** @type {import('next').NextConfig} */
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
      // {
      //   protocol: "https",
      //   hostname: "backend.cureka.com",
      // },
      {
        protocol: "https",
        hostname: "cureka-static.s3.ap-south-1.amazonaws.com",
        pathname: "/new-uploads/**",
      },
    ],
  },
  experimental: {
    turbo: {}, // ✅ Corrected: turbo should be an object, not a boolean
  },
  output: "export",
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
