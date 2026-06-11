import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "dynamic-media-cdn.tripadvisor.com" },
      { protocol: "https", hostname: "media-cdn.tripadvisor.com" },
      { protocol: "https", hostname: "www.sanjuaninsider.com" },
      { protocol: "https", hostname: "images.squarespace-cdn.com" },
      { protocol: "https", hostname: "camporicotrailrides.com" },
      { protocol: "https", hostname: "www.pinegrovesurfclub.com" },
      { protocol: "https", hostname: "shesavesshetravels.com" },
      { protocol: "https", hostname: "sanjuantourspr.com" },
      { protocol: "https", hostname: "www.irbchairs.com" },
      { protocol: "https", hostname: "queensland.com" },
      { protocol: "https", hostname: "justforthebeach.com" },
      { protocol: "https", hostname: "www.elsanjuanhotel.com" },
    ],
  },
};

export default nextConfig;
