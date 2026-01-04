import { Image } from 'next/dist/client/image-component'
import { headers } from 'next/headers'
import { P } from '@/shared/ui'
import BoardIcon from '@/../public/icon/board.svg'
import CalenderIcon from '@/../public/icon/calendar.svg'
import LabIcon from '@/../public/icon/lab.svg'
import UserIcon from '@/../public/icon/user.svg'
import WorkIcon from '@/../public/icon/work.svg'

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''
  // console.log('eee', ua, /Android|iPhone|iPad|iPod|Mobile/i.test(ua))
  if (/Android|iPhone|iPad|iPod|Mobile/i.test(ua)) {
    return (
      <main className={'flex h-full w-full flex-col items-center justify-center gap-[30px] overscroll-auto bg-white'}>
        <h1 className={'font-pretendard text-gray900 w-[400px] text-[48px] font-bold'}>MyLab</h1>
        {children}
      </main>
    )
  } else {
    return (
      <>
        <nav className={'rounded-tr-[24px] rounded-br-[24px] bg-white px-[20px] pt-[30px]'}>
          <ul className={'flex flex-col gap-[24px]'}>
            <li className={'text-gray400! flex cursor-pointer flex-col items-center justify-center gap-[5px]'}>
              <LabIcon />
              <P className={'text-gray400! text-[12px] font-semibold'}>연구실</P>
            </li>
            <li className={'flex flex-col items-center justify-center gap-[5px]'}>
              <CalenderIcon />
              <P className={'text-[12px] font-semibold'}>캘린더</P>
            </li>
            <li className={'flex flex-col items-center justify-center gap-[5px]'}>
              <BoardIcon />
              <P className={'text-[12px] font-semibold'}>게시판</P>
            </li>
            <li className={'flex flex-col items-center justify-center gap-[5px]'}>
              <WorkIcon />
              <P className={'text-[12px] font-semibold'}>업무</P>
            </li>
            <li className={'flex flex-col items-center justify-center gap-[5px]'}>
              <UserIcon />
              <P className={'text-[12px] font-semibold'}>내 정보</P>
            </li>
          </ul>
        </nav>
        <main className={'bg-background relative flex h-full flex-1 flex-col gap-[20px] p-[30px]'}>
          <header className={'flex items-center justify-between'}>
            <h1 className={'font-pretendard text-gray900 text-[36px] font-bold'}>마이랩 연구실</h1>
            <Image src={'/icon/bell.svg'} alt={'알림'} width={24} height={24} className={'cursor-pointer'} />
          </header>
          {children}
        </main>
      </>
    )
  }
}
