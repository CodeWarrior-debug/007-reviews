/** @type {import('next').NextConfig} */



require('dotenv').config()

const path=require('path')

const Dotenv = require('dotenv-webpack')

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

  },
  
  webpack: config => {
    config.plugins = config.plugins || []
    config.plugins = [
      ...config.plugins,

      new Dotenv({
        path: path.join(__dirname, '.env'),
        systemvars: true
      })
    ]
  }
  
}

module.exports = {nextConfig, webpack}




