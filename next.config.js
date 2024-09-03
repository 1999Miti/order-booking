/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: '',
  redirects: () => {
    return [
      {
        source: '/',
        destination: '/menu',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
