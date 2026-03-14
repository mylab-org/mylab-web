import clsx from 'clsx'
import { Text } from '@/shared/ui/text'

interface BoardMenuWrapProps {
  isDevice?: boolean
}

export const BoardMenuWrap = ({ isDevice = false }: BoardMenuWrapProps) => {
  return (
    <section className={clsx('flex flex-col gap-[10px]', isDevice ? 'flex-1 p-0' : 'w-[200px] p-[10px]')}>
      <div className={'flex flex-col gap-[10px] border-b border-b-gray-200 pb-[15px]'}>
        <h3 className={'px-[6px] text-[12px] font-semibold text-gray-400! md:text-[14px]'}>우리 연구실 메뉴</h3>
        <Text
          className={
            'flex h-[36px] items-center rounded-[8px] bg-[#F1F2F3] px-[12px] text-[14px] font-semibold md:text-[16px]'
          }
        >
          자유 게시판
        </Text>
        <Text className={'flex h-[36px] items-center rounded-[8px] px-[12px] text-[14px] md:text-[16px]'}>
          공지사항
        </Text>
        <Text className={'flex h-[36px] items-center rounded-[8px] px-[12px] text-[14px] md:text-[16px]'}>
          게시판 명
        </Text>
      </div>
      <div className={'flex flex-col gap-[10px] pt-[15px]'}>
        <h3 className={'px-[6px] text-[12px] font-semibold text-gray-400! md:text-[14px]'}>공유 카테고리</h3>
        <Text className={'flex h-[36px] items-center rounded-[8px] px-[12px] text-[14px] md:text-[16px]'}>
          자유 게시판
        </Text>
        <Text className={'flex h-[36px] items-center rounded-[8px] px-[12px] text-[14px] md:text-[16px]'}>
          게시판 1
        </Text>
        <Text className={'flex h-[36px] items-center rounded-[8px] px-[12px] text-[14px] md:text-[16px]'}>
          게시판 2
        </Text>
      </div>
    </section>
  )
}
