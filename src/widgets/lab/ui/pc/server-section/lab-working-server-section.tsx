import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { LabWorkingSection } from '../section/lab-working-section'
import { getUsersMeInProgressServer } from '@/entities/user/api/get-users-me-in-progress-server'
import { QUERY_KEYS } from '@/shared/api/query-key'

type Props = {
  isMobile?: boolean
}

export const LabWorkingServerSection = async ({ isMobile = false }: Props) => {
  const queryClient = new QueryClient()

  await queryClient
    .prefetchQuery({
      queryKey: QUERY_KEYS.USERS.IN_PROGRESS,
      queryFn: getUsersMeInProgressServer,
    })
    .catch(() => undefined)

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LabWorkingSection isMobile={isMobile} />
    </HydrationBoundary>
  )
}
