/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_API_URL: "http://localhost:5000/api/v1",
    NEXT_PUBLIC_API_BASE_URL: "http://localhost:5000",
    NEXT_PUBLIC_BASE_URL: "http://localhost:3000",
  },
};

module.exports = nextConfig;
