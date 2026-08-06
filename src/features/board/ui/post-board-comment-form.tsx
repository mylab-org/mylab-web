import { Image } from 'next/dist/client/image-component'
import { Input } from '@/shared/ui/override/input'

export const PostBoardCommentForm = () => {
  return (
    <form className={'flex gap-2.5 rounded-[8px] bg-gray-100 px-3.75 py-1.25'}>
      <Input
        type="text"
        className={'w-full border-none text-[12px] md:text-[12px]'}
        placeholder={'댓글을 달아보세요'}
      />
      <Image src={'/icon/icon_board_reply.svg'} alt={''} width={16} height={16} />
    </form>
  )
}
