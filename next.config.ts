import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: false,
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  async rewrites() {
    // 로컬만 same-origin rewrite. 배포는 axios가 API 호스트로 직행(OA와 동일).
    if (process.env.NODE_ENV !== 'development') {
      return []
    }

    const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/$/, '')
    if (!apiBaseUrl) {
      return []
    }

    return [
      {
        // Next 전용 /api/auth/session-expired 는 App Router 핸들러가 우선 처리합니다.
        source: '/api/:path*',
        destination: `${apiBaseUrl}/api/:path*`,
      },
    ]
  },
}

export default nextConfig
