import type { Metadata } from 'next'
import '@/app/globals.css'
import { Alert, Confirm, Dialog } from '@/widgets/layout/modal'
import { pretendard } from '@/../public/fonts/pretendard'

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
      <body className="flex min-h-dvh w-full bg-[#f9f9f9]">
        {children}
        <Confirm />
        <Alert />
        <Dialog />
      </body>
    </html>
  )
}
