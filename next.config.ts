import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    rules: {
      '*.mp4': {
        loaders: ['file-loader'],
        as: '*.js',
      },
    },
  },
};

export default nextConfig;