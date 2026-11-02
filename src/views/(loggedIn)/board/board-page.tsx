import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getBoardCategoryServer } from '@/entities/board/api/get-board-category-server'
import { getBoardListServer } from '@/entities/board/api/get-board-list-server'
import { getUsersMeServer } from '@/entities/user/api/get-users-me-server'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { BoardContentSection, BoardMenuWrapper } from '@/widgets/board'

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
      <div className={'flex min-h-0 flex-1 gap-4 focus:outline-none'}>
        <aside className={`flex w-[220px] shrink-0 flex-col rounded-[20px] bg-white p-3 ${CARD_SHADOW}`}>
          <BoardMenuWrapper />
        </aside>
        <div className={`flex min-w-0 flex-1 flex-col rounded-[20px] bg-white p-4 ${CARD_SHADOW}`}>
          <BoardContentSection variant={'pc'} />
        </div>
      </div>
    </HydrationBoundary>
  )
}
