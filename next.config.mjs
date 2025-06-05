/** @type {import('next').NextConfig} */
import path from 'path'

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '3000',
        pathname: '**',
      },
    ],
  },
}

export default nextConfig