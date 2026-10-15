/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: process.env.DEV_ALLOWED_ORIGINS?.split(",") || [],
  turbopack: { root: process.cwd() },
  outputFileTracingIncludes: {
    "/api/chat": ["./src/data/embeddings.json", "./src/data/rag/**/*.md"],
  },
  output: "standalone",
};

export default nextConfig;
