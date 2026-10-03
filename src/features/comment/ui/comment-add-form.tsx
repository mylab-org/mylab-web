'use client'
'use no memo'

import { Image } from 'next/dist/client/image-component'
import { Controller } from 'react-hook-form'
import { useCommentAddFormHook } from '../model/use-comment-add-form-hook'
import { CheckBox } from '@/shared/ui/override/checkbox'
import { Input } from '@/shared/ui/override/input'
import type { CommentReplyTargetType } from '../model/types'

type Props = {
  postId: number
  /** 대댓글인 경우 부모 댓글 id. 없으면 최상위 댓글 */
  parentId?: number
  /** 댓글 달기로 선택한 대댓글 대상. 있으면 입력창에 '@이름'이 태깅됨 */
  replyTarget?: CommentReplyTargetType | null
  /** 입력창에서 태그가 지워지거나 등록이 끝났을 때 호출 */
  onClearReplyTarget?: () => void
  /** 댓글 등록 성공 시 호출 */
  onSuccess?: () => void
}

export const CommentAddForm = ({ postId, parentId = 0, replyTarget, onClearReplyTarget, onSuccess }: Props) => {
  const { register, control, onSubmit, isValid, isPending } = useCommentAddFormHook({
    postId,
    parentId,
    replyTarget,
    onClearReplyTarget,
    onSuccess,
  })

  return (
    <form className={'flex gap-2.5 rounded-[8px] bg-gray-100 px-3.75 py-1'}>
      <Input
        type="text"
        className={'w-full border-none text-[12px] md:text-[12px]'}
        placeholder={'댓글을 달아보세요'}
        {...register('content', { required: true })}
        disabled={isPending}
      />
      <Controller
        name="isAnonymous"
        control={control}
        render={({ field }) => (
          <CheckBox
            title="익명"
            checked={field.value}
            onCheckedChange={checked => field.onChange(checked === true)}
            className="shrink-0 gap-1 text-[10px]! text-gray-400"
          />
        )}
      />
      <button type="submit" disabled={isPending || !isValid} className={'shrink-0 cursor-pointer'} onClick={onSubmit}>
        <Image src={'/icon/icon_board_reply.svg'} alt={'댓글 등록'} width={14} height={14} />
      </button>
    </form>
  )
}
