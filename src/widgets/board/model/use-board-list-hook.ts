'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getBoardList } from '@/entities/board/api/get-board-list'
import type { PostType } from '@/entities/board/model/types'
import { useBoardCategoryIdHook } from '@/features/board'
import { deleteBoardItem } from '@/features/board/api/delete-board-item'
import { deleteBoardLike } from '@/features/board/api/delete-board-like'
import { postBoardLike } from '@/features/board/api/post-board-like'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'

export const useBoardListHook = () => {
  const { categoryId } = useBoardCategoryIdHook()
  const [editingPost, setEditingPost] = useState<PostType | null>(null)
  const [openCommentPostIds, setOpenCommentPostIds] = useState<PostType['id'][]>([])

  const toggleComment = (postId: PostType['id']) => {
    setOpenCommentPostIds(prev => (prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]))
  }

  const { data: boardList, isPending } = useQuery({
    queryKey: QUERY_KEYS.BOARD.LIST(categoryId),
    queryFn: () => getBoardList(categoryId),
  })

  const deleteBoardItemMutation = useApiMutation({
    mutationFn: deleteBoardItem,
    invalidateQueryKeys: [QUERY_KEYS.BOARD.LIST(categoryId)],
    defaultErrorMessage: '게시물 삭제에 실패했습니다.',
    successMessage: '게시물이 삭제되었습니다.',
  })

  const handleDeleteBoardItem = (pId: number) => {
    deleteBoardItemMutation.mutate(pId)
  }

  const postBoardItemLike = useApiMutation({
    mutationFn: postBoardLike,
    invalidateQueryKeys: [QUERY_KEYS.BOARD.LIST(categoryId)],
  })

  const handlePostBoardItemLike = (pId: number) => {
    postBoardItemLike.mutate(pId)
  }

  const deleteBoardItemLike = useApiMutation({
    mutationFn: deleteBoardLike,
    invalidateQueryKeys: [QUERY_KEYS.BOARD.LIST(categoryId)],
  })

  const handleDeleteBoardItemLike = (pId: number) => {
    deleteBoardItemLike.mutate(pId)
  }

  return {
    boardList,
    isPending,
    handleDeleteBoardItem,
    deleteBoardItemMutation,
    isDeletePending: deleteBoardItemMutation.isPending,
    editingPost,
    setEditingPost,
    openCommentPostIds,
    setOpenCommentPostIds,
    toggleComment,
    handlePostBoardItemLike,
    handleDeleteBoardItemLike,
    isLikePending: postBoardItemLike.isPending || deleteBoardItemLike.isPending,
  }
}
