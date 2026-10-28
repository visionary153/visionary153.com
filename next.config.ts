import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Cloudflare Pages에 정적 파일로 배포한다
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
  experimental: {
    // 루트 레이아웃이 (root)·(site) 두 개라 404는 global-not-found로 만든다
    globalNotFound: true,
  },
};

export default nextConfig;
