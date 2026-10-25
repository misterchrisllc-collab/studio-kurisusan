/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve modern formats; the optimizer downsizes the 2560px masters per viewport.
    formats: ["image/avif", "image/webp"],
    qualities: [75, 82, 90],
    minimumCacheTTL: 2678400, // 31 days
  },
  experimental: {
    // Storyboard drawings are saved as vector strokes through server actions;
    // a dense drawing can pass the 1MB default. Vercel's own cap is 4.5MB.
    serverActions: { bodySizeLimit: "4mb" },
    // Back-navigation to /admin pages must show fresh data, not a 30s-old copy.
    staleTimes: { dynamic: 0 },
  },
  async redirects() {
    return [{ source: "/work", destination: "/works", permanent: true }];
  },
};

export default nextConfig;
