import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/old-url", // URL antiga
        destination: "/new-url",
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/:path*.html",
        destination: "/:path*",
      },
      {
        source: "/:path*.php",
        destination: "/:path*",
      },
    ];
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
