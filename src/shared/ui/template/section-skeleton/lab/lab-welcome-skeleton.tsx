import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { Skeleton, SkeletonLine, SkeletonTag } from '@/shared/ui/override/skeleton'

export const LabWelcomeSkeleton = () => {
  return (
    <div
      className={cn('flex flex-1 items-center justify-between gap-4 rounded-[20px] bg-white p-5 md:p-6', CARD_SHADOW)}
    >
      <div className={'flex min-w-0 flex-1 items-center gap-2.5 md:gap-4'}>
        <Skeleton circle className={'h-16 w-16 md:h-20 md:w-20'} />
        <div className={'flex min-w-0 flex-col gap-2'}>
          <SkeletonLine size="sm" width="w-28" />
          <SkeletonLine size="md" width="w-36 md:w-44" />
          <div className={'flex gap-1.25'}>
            <SkeletonTag width="w-16" />
            <SkeletonTag width="w-18" />
          </div>
          <SkeletonLine size="xs" width="w-40" />
        </div>
      </div>
      <div className={'hidden shrink-0 items-center gap-3 sm:flex'}>
        <div className={'flex min-w-[72px] flex-col items-center gap-1 rounded-[12px] bg-gray-50 px-3 py-2.5'}>
          <SkeletonLine size="md" width="w-8" />
          <SkeletonLine size="xs" width="w-12" />
        </div>
        <div className={'flex min-w-[72px] flex-col items-center gap-1 rounded-[12px] bg-gray-50 px-3 py-2.5'}>
          <SkeletonLine size="md" width="w-8" />
          <SkeletonLine size="xs" width="w-12" />
        </div>
      </div>
    </div>
  )
}
