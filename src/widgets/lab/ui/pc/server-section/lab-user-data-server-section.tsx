import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { LabUserDataSection } from '../section/lab-user-data-section'

export const LabUserDataServerSection = () => {
  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    queryKey: ['lab-user-data'],
    queryFn: () => {},
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LabUserDataSection />
    </HydrationBoundary>
  )
}
