import { SkeletonCard, SkeletonTitle, SkeletonWorkListItem } from '@/shared/ui/override/skeleton'

export const LabWorkingSkeleton = () => {
  return (
    <SkeletonCard className={'min-h-0 flex-1'} padding="md">
      <SkeletonTitle width="w-80" />
      <SkeletonWorkListItem />
      <SkeletonWorkListItem />
    </SkeletonCard>
  )
}
