import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { getLabsMembersServer } from '@/entities/labs/api/get-labs-members-server'
import { getUsersMeServer } from '@/entities/user/api/get-users-me-server'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { MoreLabSection, MoreMySection, MoreServiceSection } from '@/widgets/more'

export const MorePage = async () => {
  const queryClient = new QueryClient()

  const me = await getUsersMeServer().catch(() => null)
  const labId = me?.lab?.labId
  const showLabSection = me?.lab.role !== 'MEMBER'

  if (labId !== undefined) {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.LABS.MEMBERS(labId),
      queryFn: () => getLabsMembersServer(labId),
    })
  }

  return (
    <div className={'flex min-h-0 flex-1 gap-4 focus:outline-none'}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className={'flex min-w-0 flex-1 flex-col gap-4'}>
          <MoreMySection />
          <MoreServiceSection />
        </div>
        {showLabSection && (
          <div className={'flex w-full max-w-[480px] shrink-0 flex-col'}>
            <MoreLabSection />
          </div>
        )}
      </HydrationBoundary>
    </div>
  )
}
