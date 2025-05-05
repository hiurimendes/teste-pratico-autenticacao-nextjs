/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false // Disable experimental CSS optimization
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '/a/**',
      },
    ],
  },
};

module.exports = nextConfig; 