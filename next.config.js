const withPWA = require("next-pwa")({
  dest: "public",
  disable:
    process.env.NODE_ENV !== "production", // Disable PWA only if not in production
});

/** @type {import('next').NextConfig} */
module.exports = withPWA({
  swcMinify: true,
  reactStrictMode: true,
  eslint: {
    dirs: ["src"], // Specify directories for ESLint to check
  },
});
