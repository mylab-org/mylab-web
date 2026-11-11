import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getLabsInfoServer } from '@/entities/labs/api/get-labs-info-server'
import { getLabsMembersServer } from '@/entities/labs/api/get-labs-members-server'
import { getUsersMeServer } from '@/entities/user/api/get-users-me-server'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { MobileMoreView } from '@/widgets/more/ui/mobile-more-view'

export const MobileMorePage = async () => {
  const queryClient = new QueryClient()

  const me = await getUsersMeServer().catch(() => null)
  const labId = me?.lab?.labId
  const showLabSection = me?.lab.role !== 'MEMBER'

  if (labId !== undefined) {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.LABS.MEMBERS(labId),
      queryFn: () => getLabsMembersServer(labId),
    })
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.LABS.LAB_INFO(labId),
      queryFn: () => getLabsInfoServer(labId),
    })
  }

  return (
    <div className={'flex flex-1 flex-col px-5 pb-5 focus:outline-none'}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MobileMoreView showLabSection={showLabSection} />
      </HydrationBoundary>
    </div>
  )
}
