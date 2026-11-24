'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { useCallback } from 'react'
import { getUsersMePostsList } from '../api/get-users-me-posts-list'
import { QUERY_KEYS } from '@/shared/api/query-key'

export const useUsersMePostsListHook = () => {
  const { data, isPending, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: QUERY_KEYS.USERS.POSTS,
    queryFn: ({ pageParam }) => getUsersMePostsList(pageParam),
    initialPageParam: undefined as number | undefined,
    getNextPageParam: ({ page }) => (page.hasNext ? page.nextCursor : undefined),
  })

  const posts = data?.pages.flatMap(page => page.posts) ?? []

  const handleFetchNextPage = useCallback(() => {
    fetchNextPage()
  }, [fetchNextPage])

  return {
    posts,
    isPending,
    isError,
    handleFetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  }
}
