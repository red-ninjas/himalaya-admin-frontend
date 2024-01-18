/**@type {import('next').NextConfig} */

import anylizer from '@next/bundle-analyzer';

const withBundleAnalyzer = anylizer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  generateEtags: false,
  poweredByHeader: false,
  pageExtensions: ['jsx', 'js', 'ts', 'tsx'],
  env: {
    VERSION: '',
    SITE_URL: 'https://himalaya-ui.com',
  },
  trailingSlash: false,
  images: {
    domains: ['deelay.me', 'www.deelay.me', '**'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '**',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/icons',
        permanent: true,
        destination: '/components/icons',
      },
      {
        source: '/customization',
        destination: '/',
        permanent: true,
      },
      {
        source: '/guide/scaleable',
        destination: '/guide/scale',
        permanent: true,
      },
      {
        source: '/components',
        permanent: true,
        destination: '/components/text',
      },
      {
        source: '/guide',
        permanent: true,
        destination: '/guide/introduction',
      },
      {
        source: '/hooks',
        permanent: true,
        destination: '/hooks/use-keyboard',
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
