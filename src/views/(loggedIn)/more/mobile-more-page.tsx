import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getLabsMembersServer } from '@/entities/labs/api/get-labs-members-server'
import { getUsersMeServer } from '@/entities/user/api/get-users-me-server'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { MoreLabSection, MoreMySection, MoreServiceSection } from '@/widgets/more'

export const MobileMorePage = async () => {
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
    <div className={'flex flex-1 flex-col gap-4 bg-white px-2 pb-5 focus:outline-none md:px-4'}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <MoreMySection isMobile />
        {me?.lab.role !== 'MEMBER' && <MoreLabSection isMobile />}
        <MoreServiceSection isMobile />
      </HydrationBoundary>
    </div>
  )
}
