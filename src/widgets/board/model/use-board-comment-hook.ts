'use client'

import { type InfiniteData, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import type { BoardListResponseType, PostType } from '@/entities/board/model/types'
import { getCommentList } from '@/entities/comment/api/get-comment-list'
import { useBoardCategoryIdHook } from '@/features/board'
import type { CommentReplyTargetType } from '@/features/comment'
import { deleteCommentItem } from '@/features/comment/api/delete-comment-item'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'

type Props = {
  post: PostType
}

export const useBoardCommentHook = ({ post }: Props) => {
  const postId = post.id
  const { categoryId } = useBoardCategoryIdHook()
  const queryClient = useQueryClient()

  // 댓글 등록 시 게시글 목록 캐시의 해당 게시글 댓글 수만 증가 (목록 전체 재요청 방지)
  const handleCommentAdded = () => {
    queryClient.setQueryData<InfiniteData<BoardListResponseType>>(
      QUERY_KEYS.BOARD.LIST(categoryId),
      prev =>
        prev && {
          ...prev,
          pages: prev.pages.map(page => ({
            ...page,
            posts: page.posts.map(item =>
              item.id === postId ? { ...item, commentCount: item.commentCount + 1 } : item,
            ),
          })),
        },
    )
  }

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
    deleteCommentMutation.mutate(commentId)
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
    handleCommentAdded,
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
