import {
  SkeletonCard,
  SkeletonLine,
  SkeletonMemberRow,
  SkeletonTagGroup,
  SkeletonTitle,
} from '@/shared/ui/override/skeleton'

export const LabMobileCenterSkeleton = () => {
  return (
    <>
      <SkeletonCard padding="md">
        <SkeletonTitle width="w-36" />
        <SkeletonTagGroup count={4} width="w-24" />
        <div className={'w-full rounded-[12px] bg-gray-100 px-2.5 py-2'}>
          <SkeletonLine width="w-full" />
        </div>
      </SkeletonCard>
      <SkeletonCard padding="md">
        <SkeletonTitle width="w-12" />
        <SkeletonTagGroup count={4} width="w-28" height="h-7.5" />
      </SkeletonCard>
      <SkeletonCard padding="md">
        <SkeletonTitle width="w-20" />
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonMemberRow key={index} />
        ))}
      </SkeletonCard>
    </>
  )
}
