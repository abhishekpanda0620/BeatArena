import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Conditionally enable static export (disable for testing)
  ...(process.env.DISABLE_STATIC_EXPORT !== 'true' && { output: "export" }),
  images: {
    unoptimized: true,
  },
  /* config options here */
};

export default nextConfig;
