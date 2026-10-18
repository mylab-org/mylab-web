import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import {
  Skeleton,
  SkeletonCard,
  SkeletonLine,
  SkeletonTag,
  SkeletonTagGroup,
  SkeletonTitle,
} from '@/shared/ui/override/skeleton'

export const LabMobileTopSkeleton = () => {
  return (
    <>
      <div className={cn('flex items-center gap-2.5 rounded-[24px] bg-white p-5 md:p-6', CARD_SHADOW)}>
        <Skeleton circle className={'h-17.5 w-17.5 md:h-25 md:w-25'} />
        <div className={'flex flex-col gap-2.5 p-2.5'}>
          <div className={'flex items-center gap-2.5'}>
            <SkeletonLine size="md" width="w-24" />
            <div className={'flex gap-1.25'}>
              <SkeletonTag width="w-12" />
              <SkeletonTag width="w-14" />
            </div>
          </div>
          <div className={'flex flex-col gap-2.5'}>
            <SkeletonLine size="xs" width="w-40" />
            <SkeletonLine size="xs" width="w-48" />
          </div>
        </div>
      </div>

      <SkeletonCard padding="md">
        <SkeletonTitle width="w-36" />
        <SkeletonTagGroup count={5} width="w-24" />
        <div className={'w-full rounded-[8px] bg-gray-100 px-2.5 py-2'}>
          <SkeletonLine width="w-full" />
        </div>
      </SkeletonCard>
    </>
  )
}
