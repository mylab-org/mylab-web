import { Image } from 'next/dist/client/image-component'
import { BoardItemWrap } from '@/entities/board'
import { PostBoardForm } from '@/features/board'
import { Text } from '@/shared/ui'

export const BoardContentWrap = () => {
  return (
    <section className={'flex flex-1 flex-col gap-[10px] lg:p-[10px]'}>
      <div
        className={
          'flex cursor-pointer items-center gap-[10px] rounded-full border border-gray-300 bg-gray-100 px-[20px] py-[10px]'
        }
      >
        <Text className={'w-full text-[12px] text-gray-500! lg:text-[16px]'}>새 소식을 전해보세요!</Text>
        <Image
          src={'/icon/icon_board_write.svg'}
          alt={''}
          width={24}
          height={24}
          className={'h-[16px] w-[16px] lg:h-[24px] lg:w-[24px]'}
        />
      </div>
      <PostBoardForm />
      <div className={'flex flex-1 flex-col gap-[20px] py-[10px]'}>
        <BoardItemWrap />
      </div>
    </section>
  )
}
