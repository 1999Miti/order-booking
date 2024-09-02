/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home/menu",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
