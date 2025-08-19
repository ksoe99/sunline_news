// sunline_news/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // allow your brand logos / CDN assets
      { protocol: 'https', hostname: 'assets.sunlinenews.com' },
      { protocol: 'https', hostname: 'cdn.atlaslivenews.com' },
      { protocol: 'https', hostname: 'media.sovereignwirenews.com' },
      { protocol: 'https', hostname: 'images.theskylinenews.com' },
      { protocol: 'https', hostname: 'img.echolivenews.com' }
    ]
  }
}
module.exports = nextConfig
