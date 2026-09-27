'use client'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import type { PostType } from '@/entities/board/model/types'
import { getCommentList } from '@/entities/comment/api/get-comment-list'
import type { CommentReplyTargetType } from '@/features/comment'
import { deleteCommentItem } from '@/features/comment/api/delete-comment-item'
import { QUERY_KEYS } from '@/shared/api/query-key'

type Props = {
  post: PostType
}

export const useBoardCommentHook = ({ post }: Props) => {
  const postId = Number(post.id)

  const { data: comments = [] } = useQuery({
    queryKey: QUERY_KEYS.COMMENT.LIST(postId),
    queryFn: () => getCommentList(postId),
    enabled: Number.isFinite(postId),
  })

  const queryClient = useQueryClient()

  const deleteCommentMutation = useMutation({
    mutationFn: deleteCommentItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.COMMENT.LIST(postId) })
    },
    onError: () => {
      console.error('Failed to delete comment')
    },
  })

  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate(Number(commentId))
  }

  const [replyTarget, setReplyTarget] = useState<CommentReplyTargetType | null>(null)
  const clearReplyTarget = useCallback(() => setReplyTarget(null), [])

  return {
    postId,
    comments,
    handleDeleteComment,
    isDeletePending: deleteCommentMutation.isPending,
    replyTarget,
    setReplyTarget,
    clearReplyTarget,
  }
}
