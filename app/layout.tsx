import type { Metadata } from 'next'
import '@/app/globals.css'
import { SideModalWrapper } from '@/widgets/modal'

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
      <body className="bg-background flex min-h-dvh w-full">
        {children}
        {/*<SideModalWrapper />*/}
      </body>
    </html>
  )
}
