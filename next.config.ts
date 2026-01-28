import { NextConfig } from "next/dist/server/config";

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },

  devIndicators: false,
};

export default nextConfig;
