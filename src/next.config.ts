const nextConfig = {
  generateEtags: false,
  poweredByHeader: false,
  pageExtensions: ['jsx', 'js', 'ts', 'tsx'],
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
};

export default nextConfig;
