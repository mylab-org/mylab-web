import {
  SkeletonCard,
  SkeletonLine,
  SkeletonMemberRow,
  SkeletonTagGroup,
  SkeletonTitle,
} from '@/shared/ui/override/skeleton'

export const LabLabInfoSkeleton = () => {
  return (
    <div className={'flex flex-1 flex-col gap-7.5'}>
      <SkeletonCard padding="md">
        <SkeletonTitle width="w-60" />
        <SkeletonTagGroup count={5} width="w-30" />
        <div className={'w-full rounded-[8px] bg-gray-100 px-2.5 py-2'}>
          <SkeletonLine width="w-85" />
        </div>
      </SkeletonCard>

      <SkeletonCard padding="md">
        <div className={'flex items-center justify-between'}>
          <SkeletonTitle width="w-42.5" />
        </div>
        <SkeletonTagGroup count={4} width="w-40" height="h-7.5" />
      </SkeletonCard>

      <SkeletonCard>
        <SkeletonTitle width="w-45" />
        {Array.from({ length: 5 }).map((_, index) => (
          <SkeletonMemberRow key={index} />
        ))}
      </SkeletonCard>
    </div>
  )
}
