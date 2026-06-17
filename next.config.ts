import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: isGithubPages ? "/toefl_capstone" : "",
  assetPrefix: isGithubPages ? "/toefl_capstone/" : undefined,
  images: {
    unoptimized: true,
  },
  reactCompiler: true,
};

export default nextConfig;