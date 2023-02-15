/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,

  images:{
    remotePatterns:[
      {
        protocol:'https',
        hostname:"image.tmdb.org",
        // port:'',
        // pathname:'/account123/**'
      }
    ]
  }
}

module.exports = nextConfig
