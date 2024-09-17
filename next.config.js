/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.licdn.com',
      },
      {
        protocol: 'https',
        hostname: 'i.insider.com',
      },
      {
        protocol: 'https',
        hostname: 'nypost.com',
      },
      // Add more patterns as needed
    ],
  },
  // ... other configurations
}

module.exports = nextConfig
