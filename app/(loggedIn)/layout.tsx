import { headers } from 'next/headers'
import { SideWrapper } from '@/shared/ui/side-wrapper'
import { PageFooter } from '@/widgets/footer'
import { MobileHeader, PcHeader } from '@/widgets/header'
import { MobileBottomBar, PageGnb } from '@/widgets/menu'

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
        <div className={'flex w-full flex-1 flex-col overflow-auto bg-[#f9f9f9] pb-[75px]'}>
          <MobileHeader />
          <main className={'scrollbar-hidden flex flex-1 flex-col gap-[10px] pb-[20px]'}>{children}</main>
          <PageFooter />
          <SideWrapper />
        </div>
        <MobileBottomBar />
      </>
    )
  } else {
    return (
      <>
        <PageGnb />
        <div className={'relative flex flex-1 flex-col gap-[20px] bg-[#f9f9f9] py-[30px] pr-[20px] pl-[100px]'}>
          <PcHeader />
          {children}
          <PageFooter />
          <SideWrapper />
        </div>
      </>
    )
  }
}
