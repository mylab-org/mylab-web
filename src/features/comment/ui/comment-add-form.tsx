'use client'
'use no memo'

import { Image } from 'next/dist/client/image-component'
import { useCommentAddFormHook } from '../model/use-comment-add-form-hook'
import { Input } from '@/shared/ui/override/input'

type Props = {
  postId: number
  /** 대댓글인 경우 부모 댓글 id. 없으면 최상위 댓글 */
  parentId?: number
}

export const CommentAddForm = ({ postId, parentId = 0 }: Props) => {
  const { register, onSubmit, isValid, isPending } = useCommentAddFormHook({ postId, parentId })

  return (
    <form className={'flex gap-2.5 rounded-[8px] bg-gray-100 px-3.75 py-1'}>
      <Input
        type="text"
        className={'w-full border-none text-[12px] md:text-[12px]'}
        placeholder={'댓글을 달아보세요'}
        {...register('content', { required: true })}
        disabled={isPending}
      />
      <button type="submit" disabled={isPending || !isValid} className={'shrink-0 cursor-pointer'} onClick={onSubmit}>
        <Image src={'/icon/icon_board_reply.svg'} alt={'댓글 등록'} width={16} height={16} />
      </button>
    </form>
  )
}
