import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.csv': {
          loaders: ['csv-loader'],
          as: '*.js'
        },
      },
    },
  },
};

export default nextConfig;
