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
      <main className={'bg-background flex h-full w-full flex-col overscroll-auto'}>
        <div className={'flex flex-1 flex-col gap-[10px] overflow-auto px-[20px]'}>
          <header className={'flex items-center justify-between'}>
            <h1 className={'font-pretendard text-gray900 text-[20px] font-semibold'}>MyLab</h1>
            <Image src={'/icon/bell.svg'} alt={'알림'} width={24} height={24} className={'cursor-pointer'} />
          </header>
          {children}
        </div>
        <nav
          className={'w-full rounded-t-[20px] border-t border-r border-l border-[#F3F4F6] bg-white px-[10px] py-[7px]'}
        >
          <ul className={'flex w-full items-center justify-around'}>
            <li className={'flex flex-1 cursor-pointer flex-col items-center justify-center gap-[5px]'}>
              <div className={'text-gray400! h-[20px] w-[20px]'}>
                <LabIcon />
              </div>
              <P className={'text-gray400! text-[10px] font-semibold'}>연구실</P>
            </li>
            <li className={'flex flex-1 cursor-pointer flex-col items-center justify-center gap-[5px]'}>
              <div className={'h-[20px] w-[20px]'}>
                <CalenderIcon />
              </div>
              <P className={'text-[10px] font-semibold'}>캘린더</P>
            </li>
            <li className={'flex flex-1 cursor-pointer flex-col items-center justify-center gap-[5px]'}>
              <div className={'h-[20px] w-[20px]'}>
                <BoardIcon />
              </div>
              <P className={'text-[10px] font-semibold'}>게시판</P>
            </li>
            <li className={'flex flex-1 cursor-pointer flex-col items-center justify-center gap-[5px]'}>
              <div className={'h-[20px] w-[20px]'}>
                <WorkIcon />
              </div>
              <P className={'text-[10px] font-semibold'}>업무</P>
            </li>
            <li className={'flex flex-1 cursor-pointer flex-col items-center justify-center gap-[5px]'}>
              <div className={'h-[20px] w-[20px]'}>
                <UserIcon />
              </div>
              <P className={'text-[10px] font-semibold'}>내 정보</P>
            </li>
          </ul>
        </nav>
      </main>
    )
  } else {
    return (
      <>
        <nav className={'h-full shrink-0 rounded-tr-[24px] rounded-br-[24px] bg-white px-[20px] pt-[30px]'}>
          <ul className={'flex flex-col gap-[24px]'}>
            <li className={'flex cursor-pointer flex-col items-center justify-center gap-[5px]'}>
              <div className={'text-gray400! h-[24px] w-[24px]'}>
                <LabIcon />
              </div>
              <P className={'text-gray400! text-[12px] font-semibold'}>연구실</P>
            </li>
            <li className={'flex cursor-pointer flex-col items-center justify-center gap-[5px]'}>
              <div className={'h-[24px] w-[24px]'}>
                <CalenderIcon />
              </div>
              <P className={'text-[12px] font-semibold'}>캘린더</P>
            </li>
            <li className={'flex cursor-pointer flex-col items-center justify-center gap-[5px]'}>
              <div className={'h-[24px] w-[24px]'}>
                <BoardIcon />
              </div>
              <P className={'text-[12px] font-semibold'}>게시판</P>
            </li>
            <li className={'flex cursor-pointer flex-col items-center justify-center gap-[5px]'}>
              <div className={'h-[24px] w-[24px]'}>
                <WorkIcon />
              </div>
              <P className={'text-[12px] font-semibold'}>업무</P>
            </li>
            <li className={'flex cursor-pointer flex-col items-center justify-center gap-[5px]'}>
              <div className={'h-[24px] w-[24px]'}>
                <UserIcon />
              </div>
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
