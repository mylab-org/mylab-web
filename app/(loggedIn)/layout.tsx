import { headers } from 'next/headers'
import { PageFooter } from '@/widgets/footer'
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
      <>
        <div className={'bg-background flex w-full flex-1 flex-col overflow-auto pb-[75px]'}>
          <MobileHeader />
          <main className={'scrollbar-hidden flex flex-1 flex-col gap-[10px] px-[20px] pb-[20px]'}>{children}</main>
          <PageFooter />
        </div>
        <MobileSideMenuBar />
      </>
    )
  } else {
    return (
      <>
        <SideMenuBar />
        <div className={'bg-background relative flex flex-1 flex-col gap-[20px] py-[30px] pr-[20px] pl-[100px]'}>
          <PcHeader />
          {children}
        </div>
      </>
    )
  }
}
