import withSerwistInit from "@serwist/next";

const withSerwist = withSerwistInit({
  swSrc: "src/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default withSerwist(nextConfig);
