import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { Suspense } from 'react'
import { getLabsMembersServer } from '@/entities/labs/api/get-labs-members-server'
import { getUsersMeServer } from '@/entities/user/api/get-users-me-server'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { LabMobileCenterSkeleton, LabMobileTopSkeleton } from '@/shared/ui/template/section-skeleton/lab'
import { LabMenuWrapper, LabMobileCenterServerSection, LabMobileTopServerSection } from '@/widgets/lab'

export const MobileMainPage = async () => {
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
    <section className={'flex flex-1 flex-col gap-2.5 px-5'}>
      <LabMenuWrapper type={'top'} />
      <Suspense fallback={<LabMobileTopSkeleton />}>
        <LabMobileTopServerSection />
      </Suspense>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <LabMenuWrapper type={'center'} />
      </HydrationBoundary>
      <Suspense fallback={<LabMobileCenterSkeleton />}>
        <LabMobileCenterServerSection />
      </Suspense>
    </section>
  )
}
