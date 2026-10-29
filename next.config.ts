import type { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "nbush71.github.io", pathname: "/E-Portfolio/assets/**" },
    ],
  },
};

export default config;
