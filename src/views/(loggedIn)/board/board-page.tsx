import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getBoardCategoryServer } from '@/entities/board/api/get-board-category-server'
import { getBoardListServer } from '@/entities/board/api/get-board-list-server'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { BoardContentSection, BoardMenuWrapper, BoardSideSection } from '@/widgets/board'

/** 테스트용 labId */
const TEST_LAB_ID = 1

type BoardPageProps = {
  categoryId: number
}

export const BoardPage = async ({ categoryId }: BoardPageProps) => {
  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.BOARD.CATEGORY(TEST_LAB_ID),
      queryFn: () => getBoardCategoryServer(TEST_LAB_ID),
    }),
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.BOARD.LIST(categoryId),
      queryFn: () => getBoardListServer(categoryId),
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
