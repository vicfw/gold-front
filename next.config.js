/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NODE_ENV === "production"
        ? "https://amir-gold.runflare.run/api/v1"
        : "http://localhost:5000/api/v1",
    NEXT_PUBLIC_API_BASE_URL:
      process.env.NODE_ENV === "production"
        ? "https://amir-gold.runflare.run"
        : "http://localhost:5000",
    NEXT_PUBLIC_BASE_URL:
      process.env.NODE_ENV === "production"
        ? "https://frontend.runflare.run"
        : "http://localhost:3000",
  },
};

module.exports = nextConfig;
