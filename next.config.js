/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_API_URL: "https://amir-gold.runflare.run/api/v1",
    NEXT_PUBLIC_API_BASE_URL: "https://amir-gold.runflare.run",
    NEXT_PUBLIC_BASE_URL: "https://frontend.runflare.run",
  },
};

module.exports = nextConfig;
