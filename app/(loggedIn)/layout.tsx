import { headers } from 'next/headers'
import { MobileHeader, PcHeader } from '@/widgets/header'
import { MobileSideMenuBar, SideMenuBar } from '@/widgets/sideMenu'

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return (
      <main className={'bg-background flex h-full w-full flex-col'}>
        <MobileHeader />
        <div className={'scrollbar-hidden flex flex-1 flex-col gap-[10px] overflow-auto px-[20px] pb-[30px]'}>
          {children}
        </div>
        <MobileSideMenuBar />
      </main>
    )
  } else {
    return (
      <>
        <SideMenuBar />
        <main className={'bg-background relative flex h-full flex-1 flex-col gap-[20px] p-[30px]'}>
          <PcHeader />
          {children}
        </main>
      </>
    )
  }
}
