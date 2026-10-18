import { SkeletonCard, SkeletonTagGroup, SkeletonTitle, Skeleton } from '@/shared/ui/override/skeleton'

export const LabMobileCenterSkeleton = () => {
  return (
    <SkeletonCard padding="md">
      <div className={'flex items-center justify-between'}>
        <SkeletonTitle width="w-12" />
        <Skeleton circle className={'h-5 w-5 md:h-6 md:w-6'} />
      </div>
      <SkeletonTagGroup count={4} width="w-28" height="h-7.5" />
    </SkeletonCard>
  )
}
