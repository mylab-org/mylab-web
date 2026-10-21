import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getLabsMembersServer } from '@/entities/labs/api/get-labs-members-server'
import { getUsersMeServer } from '@/entities/user/api/get-users-me-server'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { MoreLabSection, MoreMySection, MoreServiceSection } from '@/widgets/more'

export const MorePage = async () => {
  const queryClient = new QueryClient()

  const me = await getUsersMeServer().catch(() => null)
  const labId = me?.lab?.labId

  if (labId !== undefined) {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.LABS.MEMBERS(labId),
      queryFn: () => getLabsMembersServer(labId),
    })
  }

  return (
    <div className={'flex flex-1 gap-7.5 focus:outline-none'}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MoreMySection isMaxWidth />
        {me?.lab.role !== 'MEMBER' && <MoreLabSection isMaxWidth />}
        <MoreServiceSection isMaxWidth />
      </HydrationBoundary>
    </div>
  )
}
