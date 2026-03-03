import { Image } from 'next/dist/client/image-component'
import { BoardItemWrap } from '@/entities/board'
import { PostBoardForm } from '@/features/board'
import { Text } from '@/shared/ui'

export const BoardContentWrap = () => {
  return (
    <section className={'flex flex-1 flex-col gap-[10px] p-[10px]'}>
      <div
        className={
          'bg-gray100 border-gray300 flex cursor-pointer items-center gap-[10px] rounded-full border px-[20px] py-[10px]'
        }
      >
        <Text className={'w-full text-gray-500!'}>새 소식을 전해보세요!</Text>
        <Image src={'/icon/icon_board_write.svg'} alt={''} width={24} height={24} />
      </div>
      <PostBoardForm />
      <div className={'flex flex-1 flex-col gap-[20px] py-[10px]'}>
        <BoardItemWrap />
      </div>
    </section>
  )
}
