'use client'

import { useRouter } from 'next/navigation'
import { useEffect, type ReactNode } from 'react'
import { QueryProvider } from './query-provider'
import { registerLogoutHandler } from '../lib/token/client-access-token-store'

// 루트에서 공통 provider를 묶는 진입점 예시입니다.
type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  const router = useRouter()

  useEffect(() => {
    // interceptor 에서 세션 만료 시 앱 라우터로 메인 이동
    registerLogoutHandler(() => {
      router.replace('/')
    })

    return () => {
      registerLogoutHandler(null)
    }
  }, [router])

  return <QueryProvider>{children}</QueryProvider>
}
