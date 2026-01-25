import { Image } from 'next/dist/client/image-component'
import { headers } from 'next/headers'
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
        <header className={'flex items-center justify-between px-[20px] py-[10px]'}>
          <h1 className={'font-pretendard text-gray900 text-[20px] font-semibold'}>MyLab</h1>
          <Image src={'/icon/bell.svg'} alt={'알림'} width={24} height={24} className={'cursor-pointer'} />
        </header>
        <div className={'flex flex-1 flex-col gap-[10px] overflow-auto px-[20px] pb-[30px]'}>{children}</div>
        <MobileSideMenuBar />
      </main>
    )
  } else {
    return (
      <>
        <SideMenuBar />
        <main className={'bg-background relative flex h-full flex-1 flex-col gap-[20px] p-[30px]'}>
          <header className={'flex items-center justify-between'}>
            <h1 className={'font-pretendard text-gray900 text-[36px] leading-none font-bold'}>마이랩 연구실</h1>
            <Image src={'/icon/bell.svg'} alt={'알림'} width={24} height={24} className={'cursor-pointer'} />
          </header>
          {children}
        </main>
      </>
    )
  }
}
