/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/user',
        destination: 'https://ak-47.shop/api/v1/user',
      },
    ];
  },
  swcMinify: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    EMAILJS_SERVICE_ID: process.env.EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID: process.env.EMAILJS_TEMPLATE_ID,
    EMAILJS_PUBLIC_KEY: process.env.EMAILJS_PUBLIC_KEY,
    GTM_ID: process.env.GTM_ID,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  },
  images: {
    // lh3.googleusercontent.com: google 기본 프로필 이미지
    // kr.object.ncloudstorage.com: cloud 이미지
    domains: ['lh3.googleusercontent.com', 'kr.object.ncloudstorage.com'],
    formats: ['image/avif', 'image/webp'],
  },
};

module.exports = nextConfig;
