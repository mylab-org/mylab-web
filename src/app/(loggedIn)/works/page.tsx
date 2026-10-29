import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { headers } from 'next/headers'
import { getUsersMeServer } from '@/entities/user/api/get-users-me-server'
import { getWorksPaperListServer } from '@/entities/works/api/get-works-paper-list-server'
import { getWorksTaskListServer } from '@/entities/works/api/get-works-task-list-server'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { WorkPage } from '@/views/(loggedIn)/works'
import { MobileWorkPage } from '@/views/(loggedIn)/works/mobile-work-page'

export default async function Works() {
  const h = await headers()
  const ua = h.get('user-agent') ?? ''

  const queryClient = new QueryClient()
  const me = await getUsersMeServer().catch(() => null)
  const labId = me?.lab?.labId

  if (labId !== undefined) {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.PAPER.LIST(labId),
      queryFn: () => getWorksPaperListServer(labId),
    })
  }

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.TASK.LIST,
    queryFn: getWorksTaskListServer,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/Android|iPhone|iPad|iPod|Mobile/i.test(ua) ? <MobileWorkPage /> : <WorkPage />}
    </HydrationBoundary>
  )
}
