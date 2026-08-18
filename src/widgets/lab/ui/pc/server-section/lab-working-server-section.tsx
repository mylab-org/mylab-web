import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { LabWorkingSection } from '../section/lab-working-section'

export const LabWorkingServerSection = () => {
  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    queryKey: ['lab-working'],
    queryFn: () => {},
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LabWorkingSection />
    </HydrationBoundary>
  )
}
