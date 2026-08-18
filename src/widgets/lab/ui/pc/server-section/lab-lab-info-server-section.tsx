import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query'
import { LabLabInfoSection } from '../section/lab-lab-info-section'

export const LabLabInfoServerSection = () => {
  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    queryKey: ['lab-lab-info'],
    queryFn: () => {},
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LabLabInfoSection />
    </HydrationBoundary>
  )
}
