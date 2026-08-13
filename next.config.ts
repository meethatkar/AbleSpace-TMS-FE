import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ik.imagekit.io",
<<<<<<< Updated upstream
        pathname: "/**",
=======
>>>>>>> Stashed changes
      },
    ],
  },
};

export default nextConfig;
