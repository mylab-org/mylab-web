import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getBoardCategoryServer } from '@/entities/board/api/get-board-category-server'
import { getBoardListServer } from '@/entities/board/api/get-board-list-server'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { BoardMobileContentSection, BoardMobileMenuSection } from '@/widgets/board'

/** 테스트용 labId */
const TEST_LAB_ID = 1

type MobileBoardPageProps = {
  categoryId?: number
}

export const MobileBoardPage = async ({ categoryId }: MobileBoardPageProps) => {
  const queryClient = new QueryClient()

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.BOARD.CATEGORY(TEST_LAB_ID),
      queryFn: () => getBoardCategoryServer(TEST_LAB_ID),
    }),
    categoryId !== undefined &&
      queryClient.prefetchQuery({
        queryKey: QUERY_KEYS.BOARD.LIST(categoryId),
        queryFn: () => getBoardListServer(categoryId),
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
