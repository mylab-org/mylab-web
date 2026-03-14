import type { Metadata } from 'next'
import '@/app/globals.css'
import { pretendard } from '../public/fonts/pretendard'

export const metadata: Metadata = {
  title: 'MyLab',
  description: '나만의 작은 연구실',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={pretendard.variable}>
      <body className="bg-background flex min-h-dvh w-full">{children}</body>
    </html>
  )
}
