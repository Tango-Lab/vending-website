import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['127.0.0.1', process.env.IMAGE_DOMAIN ?? '',],
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@Core': path.resolve('src/core'),
      '@': path.resolve('src'),
    };
    return config;
  },
  publicRuntimeConfig: {
    PROXY_MODE: process.env.PROXY_MODE,
    NEXT_IMAGE_URL: process.env.NEXT_IMAGE_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    //
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
  },
  async rewrites() {
    const API_URL = process.env.API_URL || 'http://localhost:4000';

    return [
      {
        source: '/api/:path*',
        destination: `${API_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
