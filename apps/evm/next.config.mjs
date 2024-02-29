import defaultNextConfig from '@sushiswap/nextjs-config'

const ACADEMY_URL = process.env.ACADEMY_URL || 'https://academy.sushi.com'
const BLOG_URL = process.env.BLOG_URL || 'https://blog.sushi.com'
const FURO_URL = process.env.FURO_URL || 'https://furo.sushi.com'

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...defaultNextConfig,
  logging: {
    fetches: {
      fullUrl: false,
    },
  },
  transpilePackages: ['@sushiswap/wagmi'],
  async redirects() {
    return [
          {
            source: '/',
            destination: '/swap',
            permanent: true,
          },
      // {
      //   source: '/discord{/}?',
      //   permanent: true,
      //   destination: 'https://discord.gg/SDPH8SNVZW',
      // },
      // {
      //   source: '/github{/}?',
      //   permanent: true,
      //   destination: 'https://github.com/sushiswap',
      // },
      // {
      //   source: '/twitter{/}?',
      //   permanent: true,
      //   destination: 'https://twitter.com/sushiswap',
      // },
      // {
      //   source: '/instagram{/}?',
      //   permanent: true,
      //   destination: 'https://instagram.com/instasushiswap',
      // },
      // {
      //   source: '/medium{/}?',
      //   permanent: true,
      //   destination: 'https://medium.com/sushiswap-org',
      // },
      {
        source: '/earn/:path*',
        permanent: true,
        destination: '/pool/:path*',
      },
      {
        source: '/pools/:path*',
        permanent: true,
        destination: '/pool/:path*',
      },
      {
        source: '/pool/:path*/positions',
        permanent: true,
        destination: '/pool/:path*',
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/academy',
        destination: `${ACADEMY_URL}/academy`,
      },
      {
        source: '/academy/:path*',
        destination: `${ACADEMY_URL}/academy/:path*`,
      },
      {
        source: '/blog',
        destination: `${BLOG_URL}/blog`,
      },
      {
        source: '/blog/:path*',
        destination: `${BLOG_URL}/blog/:path*`,
      },
      {
        source: '/furo',
        destination: `${FURO_URL}/furo`,
      },
      {
        source: '/furo/:path*',
        destination: `${FURO_URL}/furo/:path*`,
      },
    ]
  },
}

export default nextConfig
