'use client'
'use no memo'

import { Controller } from 'react-hook-form'
import { useCommentUpdateFormHook } from '../model/use-comment-update-form-hook'
import type { CommentType } from '@/entities/comment/model/types'
import { CheckBox } from '@/shared/ui/override/checkbox'
import { Input } from '@/shared/ui/override/input'
import { Text } from '@/shared/ui/override/text'

type Props = {
  postId: number
  /** 대댓글인 경우 부모 댓글 id. 없으면 최상위 댓글 */
  parentId?: number
  /** 취소 또는 저장 성공 시 호출 */
  onClose: () => void
  comment: CommentType
}

export const CommentUpdateForm = ({ postId, comment, parentId = 0, onClose }: Props) => {
  const { register, onSubmit, isValid, isPending } = useCommentUpdateFormHook({
    postId,
    parentId,
    comment,
    onSuccess: onClose,
  })

  return (
    <form className={'flex items-center gap-2.5 rounded-[8px] bg-gray-100 px-3.75 py-1'} onSubmit={onSubmit}>
      <Input
        type="text"
        autoFocus
        className={'w-full border-none text-[12px] md:text-[12px]'}
        {...register('content', { required: true })}
        disabled={isPending}
      />
      <button
        type="submit"
        disabled={isPending || !isValid}
        className={'shrink-0 cursor-pointer disabled:cursor-default disabled:opacity-50'}
      >
        <Text className={'text-[12px] font-semibold text-gray-900 lg:text-[12px]'}>저장</Text>
      </button>
      <button type="button" onClick={onClose} disabled={isPending} className={'shrink-0 cursor-pointer'}>
        <Text className={'text-[12px] text-gray-400 lg:text-[12px]'}>취소</Text>
      </button>
    </form>
  )
}
