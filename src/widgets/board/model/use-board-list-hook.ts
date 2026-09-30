'use client'

import { type InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { getBoardList } from '@/entities/board/api/get-board-list'
import type { BoardListResponseType, PostType } from '@/entities/board/model/types'
import { useBoardCategoryIdHook } from '@/features/board'
import { deleteBoardItem } from '@/features/board/api/delete-board-item'
import { deleteBoardLike } from '@/features/board/api/delete-board-like'
import { postBoardLike } from '@/features/board/api/post-board-like'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'

export const useBoardListHook = () => {
  const { categoryId } = useBoardCategoryIdHook()
  const queryClient = useQueryClient()
  const boardListQueryKey = QUERY_KEYS.BOARD.LIST(categoryId)
  const [editingPost, setEditingPost] = useState<PostType | null>(null)
  const [openCommentPostIds, setOpenCommentPostIds] = useState<PostType['id'][]>([])

  const toggleComment = (postId: PostType['id']) => {
    setOpenCommentPostIds(prev => (prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]))
  }

  const {
    data: boardList,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: QUERY_KEYS.BOARD.LIST(categoryId),
    queryFn: ({ pageParam }) => getBoardList(categoryId, pageParam),
    initialPageParam: 1,
    getNextPageParam: ({ page }) => (page.currentPage < page.totalPages ? page.currentPage + 1 : undefined),
  })

  const posts = boardList?.pages.flatMap(page => page.posts) ?? []

  const handleFetchNextPage = useCallback(() => {
    fetchNextPage()
  }, [fetchNextPage])

  const deleteBoardItemMutation = useApiMutation({
    mutationFn: deleteBoardItem,
    defaultErrorMessage: '게시물 삭제에 실패했습니다.',
    successMessage: '게시물이 삭제되었습니다.',
    // 무효화 대신 캐시에서 해당 게시글만 제거
    onSuccess: (_data, pId) => {
      queryClient.setQueryData<InfiniteData<BoardListResponseType>>(
        boardListQueryKey,
        prev =>
          prev && {
            ...prev,
            pages: prev.pages.map(page => ({ ...page, posts: page.posts.filter(post => post.id !== pId) })),
          },
      )
    },
  })

  const handleDeleteBoardItem = (pId: number) => {
    deleteBoardItemMutation.mutate(pId)
  }

  // 무한 쿼리는 무효화 시 불러온 모든 페이지를 재요청하므로, 좋아요는 캐시의 해당 게시글만 직접 수정
  const setPostLikeInCache = (pId: number, isLiked: boolean) => {
    queryClient.setQueryData<InfiniteData<BoardListResponseType>>(
      boardListQueryKey,
      prev =>
        prev && {
          ...prev,
          pages: prev.pages.map(page => ({
            ...page,
            posts: page.posts.map(post =>
              post.id === pId ? { ...post, isLiked, likeCount: post.likeCount + (isLiked ? 1 : -1) } : post,
            ),
          })),
        },
    )
  }

  const postBoardItemLike = useApiMutation({
    mutationFn: postBoardLike,
    // 누르는 즉시 반영 (낙관적 업데이트), 실패 시 되돌림
    onMutate: async (pId: number) => {
      await queryClient.cancelQueries({ queryKey: boardListQueryKey })
      setPostLikeInCache(pId, true)
    },
    onError: (_error, pId) => setPostLikeInCache(pId, false),
  })

  const handlePostBoardItemLike = (pId: number) => {
    postBoardItemLike.mutate(pId)
  }

  const deleteBoardItemLike = useApiMutation({
    mutationFn: deleteBoardLike,
    onMutate: async (pId: number) => {
      await queryClient.cancelQueries({ queryKey: boardListQueryKey })
      setPostLikeInCache(pId, false)
    },
    onError: (_error, pId) => setPostLikeInCache(pId, true),
  })

  const handleDeleteBoardItemLike = (pId: number) => {
    deleteBoardItemLike.mutate(pId)
  }

  return {
    posts,
    isPending,
    handleFetchNextPage,
    hasNextPage,
    isFetchingNextPage,
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
