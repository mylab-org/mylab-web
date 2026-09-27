'use client'

import { useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import type { PostType } from '@/entities/board/model/types'
import { getCommentList } from '@/entities/comment/api/get-comment-list'
import type { CommentReplyTargetType } from '@/features/comment'
import { deleteCommentItem } from '@/features/comment/api/delete-comment-item'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'

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

  const deleteCommentMutation = useApiMutation({
    mutationFn: deleteCommentItem,
    invalidateQueryKeys: [QUERY_KEYS.COMMENT.LIST(postId)],
    defaultErrorMessage: '댓글 삭제에 실패했습니다.',
    successMessage: '댓글이 삭제되었습니다.',
  })

  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate(Number(commentId))
  }

  const [replyTarget, setReplyTarget] = useState<CommentReplyTargetType | null>(null)
  const clearReplyTarget = useCallback(() => setReplyTarget(null), [])

  // 수정 중인 댓글 id — 한 번에 하나만 수정 모드
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null)

  /** 수정 버튼 — 수정 모드가 아니면 진입, 수정 모드면 취소 */
  const toggleEditComment = (commentId: number) => {
    setEditingCommentId(prev => (prev === commentId ? null : commentId))
  }

  const closeEditComment = () => setEditingCommentId(null)

  return {
    postId,
    comments,
    handleDeleteComment,
    isDeletePending: deleteCommentMutation.isPending,
    replyTarget,
    setReplyTarget,
    clearReplyTarget,
    editingCommentId,
    toggleEditComment,
    closeEditComment,
  }
}
