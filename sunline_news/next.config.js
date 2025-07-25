/** @type {import('next').NextConfig} */
const nextConfig = {
  // Other config...
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'src'),
    };
    return config;
  }
};

module.exports = nextConfig;
