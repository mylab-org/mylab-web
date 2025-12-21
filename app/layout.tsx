import type { Metadata } from 'next'
import '@/app/globals.css'

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
    <html lang="ko">
      <body className="flex h-dvh w-full">{children}</body>
    </html>
  )
}
