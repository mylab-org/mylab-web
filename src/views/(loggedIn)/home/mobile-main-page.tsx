import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { Suspense } from 'react'
import { getLabsMembersServer } from '@/entities/labs/api/get-labs-members-server'
import { getUsersMeServer } from '@/entities/user/api/get-users-me-server'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { LabMobileCenterSkeleton, LabMobileTopSkeleton } from '@/shared/ui/template/section-skeleton/lab'
import {
  LabMenuWrapper,
  LabMobileCenterServerSection,
  LabMobileTopServerSection,
  LabScheduleSection,
  LabWorkingSection,
} from '@/widgets/lab'

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
    <section className={'flex w-full flex-col gap-4 overflow-x-hidden px-5'}>
      <Suspense fallback={<LabMobileTopSkeleton />}>
        <LabMobileTopServerSection />
      </Suspense>

      <LabScheduleSection isMobile />
      <LabWorkingSection isMobile />
      <LabMenuWrapper />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<LabMobileCenterSkeleton />}>
          <LabMobileCenterServerSection />
        </Suspense>
      </HydrationBoundary>
    </section>
  )
}
