import { Image } from 'next/dist/client/image-component'
import { BoardItemSection } from './board-item-section'
import { PostBoardForm } from '@/features/board'
import { Text } from '@/shared/ui/override/text'

export const BoardContentSection = () => {
  return (
    <section className={'flex flex-1 flex-col gap-2.5 lg:p-2.5'}>
      <div
        className={
          'flex cursor-pointer items-center gap-2.5 rounded-full border border-gray-300 bg-gray-100 px-5 py-2.5'
        }
      >
        <Text className={'w-full text-[12px] text-gray-500! lg:text-[16px]'}>새 소식을 전해보세요!</Text>
        <Image src={'/icon/icon_board_write.svg'} alt={''} width={24} height={24} className={'h-4 w-4 lg:h-6 lg:w-6'} />
      </div>
      <PostBoardForm />
      <div className={'flex flex-1 flex-col gap-5 py-2.5'}>
        <BoardItemSection />
      </div>
    </section>
  )
}
