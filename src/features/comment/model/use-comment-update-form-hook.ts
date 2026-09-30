'use client'

import { useForm } from 'react-hook-form'
import { patchCommentUpdate } from '../api/patch-comment-update'
import type { CommentType } from '@/entities/comment/model/types'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import type { PatchCommentUpdatePayloadType } from './types'

type PatchCommentFormValuesType = Pick<PatchCommentUpdatePayloadType, 'content'>

type Props = {
  postId: number
  /** 대댓글인 경우 부모 댓글 id. 없으면 최상위 댓글 */
  parentId?: number
  comment: CommentType
  onSuccess?: () => void
}

export const useCommentUpdateFormHook = ({ postId, comment, parentId = 0, onSuccess }: Props) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<PatchCommentFormValuesType>({
    defaultValues: {
      content: comment.content,
      // isAnonymous: comment.isAnonymous,
    },
    mode: 'onChange',
  })

  const patchCommentUpdateMutation = useApiMutation({
    mutationFn: (data: PatchCommentFormValuesType) =>
      patchCommentUpdate(comment.cid, { parentId, content: data.content }),
    invalidateQueryKeys: [QUERY_KEYS.COMMENT.LIST(postId)],
    defaultErrorMessage: '댓글 수정에 실패했습니다.',
    successMessage: '댓글이 수정되었습니다.',
    onSuccess: () => {
      onSuccess?.()
    },
  })

  const onSubmit = handleSubmit(data => {
    const trimmed = data.content.trim()
    if (!trimmed || patchCommentUpdateMutation.isPending) return
    patchCommentUpdateMutation.mutate(data)
  })

  return { register, control, onSubmit, isValid, isPending: patchCommentUpdateMutation.isPending }
}
