/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{ source: "/work", destination: "/works", permanent: true }];
  },
};

export default nextConfig;
