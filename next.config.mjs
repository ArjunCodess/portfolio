/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins:
    process.env.DEV_ALLOWED_ORIGINS?.split(",")
      .map((host) => host.trim())
      .filter(Boolean) || [],
  turbopack: { root: process.cwd() },
  outputFileTracingIncludes: {
    "/api/chat": ["./src/data/rag/**/*.md"],
  },
  output: "standalone",
};

export default nextConfig;
