import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { LabLabInfoSection } from '../section/lab-lab-info-section'
import { getLabsInfoServer } from '@/entities/labs/api/get-labs-info-server'
import { getLabsLinkServer } from '@/entities/labs/api/get-labs-link-server'
import { getLabsMembersServer } from '@/entities/labs/api/get-labs-members-server'
import { getUsersMeServer } from '@/entities/user/api/get-users-me-server'
import { QUERY_KEYS } from '@/shared/api/query-key'

export const LabLabInfoServerSection = async () => {
  const queryClient = new QueryClient()

  const me = await getUsersMeServer().catch(() => null)
  const labId = me?.lab?.labId

  if (labId !== undefined) {
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.LABS.MEMBERS(labId),
      queryFn: () => getLabsMembersServer(labId),
    })
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.LABS.LAB_INFO(labId),
      queryFn: () => getLabsInfoServer(labId),
    })
    await queryClient.prefetchQuery({
      queryKey: QUERY_KEYS.LABS.LAB_LINK(labId),
      queryFn: () => getLabsLinkServer(labId),
    })
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LabLabInfoSection />
    </HydrationBoundary>
  )
}
