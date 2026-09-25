import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getBoardCategoryServer } from '@/entities/board/api/get-board-category-server'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { BoardMobileMenuSection } from '@/widgets/board'

/** 테스트용 labId */
const TEST_LAB_ID = 1

export const MobileBoardPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.BOARD.CATEGORY(TEST_LAB_ID),
    queryFn: () => getBoardCategoryServer(TEST_LAB_ID),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className={'flex flex-1 gap-2.5 bg-white px-4 py-2.5 focus:outline-none'}>
        <BoardMobileMenuSection />
        {/* <BoardContentSection /> */}
      </div>
    </HydrationBoundary>
  )
}
