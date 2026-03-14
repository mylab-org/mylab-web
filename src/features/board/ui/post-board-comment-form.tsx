import { Image } from 'next/dist/client/image-component'

export const PostBoardCommentForm = () => {
  return (
    <form className={'flex gap-[10px] rounded-full bg-gray-100 px-[15px] py-[5px]'}>
      <input
        type="text"
        className={'font-pretendard w-full text-[12px] font-medium outline-0 placeholder:text-[#9CA3AF]'}
        placeholder={'댓글을 달아보세요.'}
      />
      <Image src={'/icon/icon_board_reply.svg'} alt={''} width={14} height={14} />
    </form>
  )
}
