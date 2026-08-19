'use client'

import { QueryProvider } from './query-provider'
import type { ReactNode } from 'react'

// 루트에서 공통 provider를 묶는 진입점 예시입니다.
type AppProvidersProps = {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return <QueryProvider>{children}</QueryProvider>
}
