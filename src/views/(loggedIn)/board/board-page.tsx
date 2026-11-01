import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getBoardCategoryServer } from '@/entities/board/api/get-board-category-server'
import { getBoardListServer } from '@/entities/board/api/get-board-list-server'
import { getUsersMeServer } from '@/entities/user/api/get-users-me-server'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { BoardContentSection, BoardMenuWrapper, BoardSideSection } from '@/widgets/board'

type BoardPageProps = {
  categoryId: number
}

export const BoardPage = async ({ categoryId }: BoardPageProps) => {
  const queryClient = new QueryClient()
  const me = await getUsersMeServer().catch(() => null)
  const labId = me?.lab?.labId

  await Promise.all([
    labId !== undefined &&
      queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.BOARD.CATEGORY(labId),
        queryFn: () => getBoardCategoryServer(labId),
      }),
    queryClient.prefetchInfiniteQuery({
      queryKey: QUERY_KEYS.BOARD.LIST(categoryId),
      queryFn: ({ pageParam }) => getBoardListServer(categoryId, pageParam),
      initialPageParam: undefined as number | undefined,
    }),
  ])

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div
        className={
          'flex flex-1 gap-2.5 rounded-[12px] bg-white py-2.5 shadow-[0px_1px_3px_rgba(0,0,0,0.03),0px_4px_16px_rgba(0,0,0,0.04)] focus:outline-none'
        }
      >
        <BoardMenuWrapper />
        <BoardContentSection />
        <BoardSideSection />
      </div>
    </HydrationBoundary>
  )
}
