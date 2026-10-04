import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Coffee/dessert placeholders (src/data/media.ts) come from Unsplash until the
    // café's own photography is added to public/assets/images.
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Sequence frames and video never change once deployed — cache hard.
        source: "/assets/:dir(pizza-sequence|video)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
