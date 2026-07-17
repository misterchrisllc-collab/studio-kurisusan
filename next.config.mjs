/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve modern formats; the optimizer downsizes the 2560px masters per viewport.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 82, 90],
    minimumCacheTTL: 2678400, // 31 days
  },
  async redirects() {
    return [{ source: "/work", destination: "/works", permanent: true }];
  },
};

export default nextConfig;
