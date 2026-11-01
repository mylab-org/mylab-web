import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getBoardCategoryServer } from '@/entities/board/api/get-board-category-server'
import { getBoardListServer } from '@/entities/board/api/get-board-list-server'
import { getUsersMeServer } from '@/entities/user/api/get-users-me-server'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { BoardMobileContentSection, BoardMobileMenuSection } from '@/widgets/board'

type MobileBoardPageProps = {
  categoryId?: number
}

export const MobileBoardPage = async ({ categoryId }: MobileBoardPageProps) => {
  const queryClient = new QueryClient()
  const me = await getUsersMeServer().catch(() => null)
  const labId = me?.lab?.labId

  await Promise.all([
    labId !== undefined &&
      queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.BOARD.CATEGORY(labId),
        queryFn: () => getBoardCategoryServer(labId),
      }),
    categoryId !== undefined &&
      queryClient.prefetchInfiniteQuery({
        queryKey: QUERY_KEYS.BOARD.LIST(categoryId),
        queryFn: ({ pageParam }) => getBoardListServer(categoryId, pageParam),
        initialPageParam: undefined as number | undefined,
      }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={'flex flex-1 gap-2.5 bg-white px-4 py-2.5 focus:outline-none'}>
        {categoryId === undefined ? <BoardMobileMenuSection /> : <BoardMobileContentSection />}
      </div>
    </HydrationBoundary>
  )
}
