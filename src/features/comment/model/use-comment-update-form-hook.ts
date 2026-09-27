'use client'

import { useForm } from 'react-hook-form'
import { patchCommentUpdate } from '../api/patch-comment-update'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import type { PatchCommentUpdatePayloadType } from './types'

type Props = {
  postId: number
  commentId: number
  /** 대댓글인 경우 부모 댓글 id. 없으면 최상위 댓글 */
  parentId?: number
  defaultContent: string
  onSuccess?: () => void
}

export const useCommentUpdateFormHook = ({ postId, commentId, parentId = 0, defaultContent, onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<Pick<PatchCommentUpdatePayloadType, 'content'>>({
    defaultValues: {
      content: defaultContent,
    },
    mode: 'onChange',
  })

  const patchCommentUpdateMutation = useApiMutation({
    mutationFn: (content: string) => patchCommentUpdate(Number(commentId), { parentId: Number(parentId), content }),
    invalidateQueryKeys: [QUERY_KEYS.COMMENT.LIST(postId)],
    defaultErrorMessage: '댓글 수정에 실패했습니다.',
    successMessage: '댓글이 수정되었습니다.',
    onSuccess: () => {
      onSuccess?.()
    },
  })

  const onSubmit = handleSubmit(({ content }) => {
    const trimmed = content.trim()
    if (!trimmed || patchCommentUpdateMutation.isPending) return
    patchCommentUpdateMutation.mutate(trimmed)
  })

  return { register, onSubmit, isValid, isPending: patchCommentUpdateMutation.isPending }
}
