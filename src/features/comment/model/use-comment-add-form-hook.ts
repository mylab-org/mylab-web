'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { postCommentCreate } from '../api/post-comment-create'
import { QUERY_KEYS } from '@/shared/api/query-key'
import type { PostCommentCreatePayloadType } from './types'

type Props = {
  postId: number
  parentId?: number
}

export const useCommentAddFormHook = ({ postId, parentId = 0 }: Props) => {
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<PostCommentCreatePayloadType>({
    defaultValues: {
      content: '',
    },
    mode: 'onChange',
  })

  const postCommentMutation = useMutation({
    mutationFn: (content: string) => postCommentCreate(postId, { parentId, content }),
    onSuccess: () => {
      reset()
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COMMENT.LIST(postId) })
    },
    onError: () => {
      console.error('Failed to create comment')
    },
  })

  const onSubmit = handleSubmit((data: PostCommentCreatePayloadType) => {
    const trimmed = data.content.trim()
    if (!trimmed || postCommentMutation.isPending) return
    postCommentMutation.mutate(data.content)
  })

  return { register, onSubmit, isValid, isPending: postCommentMutation.isPending }
}
