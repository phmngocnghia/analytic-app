import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    turbo: {
      rules: {
        '*.csv': {
          loaders: [{
            loader: 'csv-loader',
            options: {
              dynamicTyping: true,
              header: true,
              skipEmptyLines: true
            }
          }],
          as: '*.js'
        },
      },
    },
  },
};

export default nextConfig;
