import {
  SkeletonCard,
  SkeletonLine,
  SkeletonMemberRow,
  SkeletonTagGroup,
  SkeletonTitle,
} from '@/shared/ui/override/skeleton'

export const LabLabInfoSkeleton = () => {
  return (
    <div className={'grid grid-cols-1 gap-5 lg:grid-cols-3'}>
      <SkeletonCard padding="md">
        <SkeletonTitle width="w-40" />
        <SkeletonTagGroup count={4} width="w-24" />
        <div className={'w-full rounded-[12px] bg-gray-100 px-2.5 py-2'}>
          <SkeletonLine width="w-full" />
        </div>
      </SkeletonCard>

      <SkeletonCard padding="md">
        <SkeletonTitle width="w-20" />
        <SkeletonTagGroup count={4} width="w-24" height="h-7.5" />
      </SkeletonCard>

      <SkeletonCard padding="md">
        <SkeletonTitle width="w-24" />
        {Array.from({ length: 3 }).map((_, index) => (
          <SkeletonMemberRow key={index} />
        ))}
      </SkeletonCard>
    </div>
  )
}
