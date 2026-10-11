import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { getWorksPaperListServer } from '@/entities/works/api/get-works-paper-list-server'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { TEST_LAB_ID } from '@/shared/constant/test'
import { WorkPage } from '@/views/(loggedIn)/works'
import { MobileWorkPage } from '@/views/(loggedIn)/works/mobile-work-page'

export default async function Works() {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.PAPER.LIST(TEST_LAB_ID),
    queryFn: () => getWorksPaperListServer(TEST_LAB_ID),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/Android|iPhone|iPad|iPod|Mobile/i.test(ua) ? <MobileWorkPage /> : <WorkPage />}
    </HydrationBoundary>
  )
}
