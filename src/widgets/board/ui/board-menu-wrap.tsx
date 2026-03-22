import clsx from 'clsx'
import { Button } from '@/shared/ui/button'

interface BoardMenuWrapProps {
  isDevice?: boolean
}

export const BoardMenuWrap = ({ isDevice = false }: BoardMenuWrapProps) => {
  return (
    <section className={clsx('flex flex-col gap-2.5', isDevice ? 'flex-1 p-0' : 'w-[200px] p-2.5')}>
      <div className={'flex flex-col gap-2.5 border-b border-b-gray-200 pb-3.75'}>
        <h3 className={'px-1.5 text-[12px] font-semibold text-gray-400! md:text-[14px]'}>우리 연구실 메뉴</h3>
        <Button.Setup className={'rounded-[8px] text-left text-[14px]'} isActive>
          자유 게시판
        </Button.Setup>
        <Button.Setup className={'rounded-[8px] text-left text-[14px] font-medium text-black'}>공지사항</Button.Setup>
        <Button.Setup className={'rounded-[8px] text-left text-[14px] font-medium text-black'}>게시판 명</Button.Setup>
      </div>
      <div className={'flex flex-col gap-2.5 pt-3.75'}>
        <h3 className={'px-1.5 text-[12px] font-semibold text-gray-400! md:text-[14px]'}>공유 카테고리</h3>
        <Button.Setup className={'rounded-[8px] text-left text-[14px] font-medium text-black'}>자유게시판</Button.Setup>
        <Button.Setup className={'rounded-[8px] text-left text-[14px] font-medium text-black'}>게시판 1</Button.Setup>
        <Button.Setup className={'rounded-[8px] text-left text-[14px] font-medium text-black'}>게시판 2</Button.Setup>
      </div>
    </section>
  )
}
