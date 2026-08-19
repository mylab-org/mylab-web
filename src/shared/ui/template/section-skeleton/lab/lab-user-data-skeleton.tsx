import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import {
  Skeleton,
  SkeletonCalendarListItem,
  SkeletonCalendarWeek,
  SkeletonCard,
  SkeletonLine,
  SkeletonTag,
  SkeletonTitle,
} from '@/shared/ui/override/skeleton'

export const LabUserDataSkeleton = () => {
  return (
    <section className={'flex w-110.25 flex-col gap-7.5'}>
      <div className={cn('flex items-center gap-2.5 rounded-[24px] bg-white p-5 md:p-6', CARD_SHADOW)}>
        <Skeleton circle className={'h-17.5 w-17.5 md:h-25 md:w-25'} />

        <div className={'flex flex-col gap-2.5 p-2.5'}>
          <div className={'flex flex-col gap-2.5'}>
            <SkeletonLine size="md" width="w-35 md:w-50" />
            <SkeletonLine size="md" width="w-45" />
          </div>

          <div className={'flex gap-1.25'}>
            <SkeletonTag width="w-20" />
            <SkeletonTag width="w-22.5" />
          </div>

          <div className={'flex flex-col gap-2.5'}>
            <SkeletonLine size="xs" width="w-55 md:w-65" />
            <SkeletonLine size="xs" width="w-52.5 md:w-65" />
          </div>
        </div>
      </div>

      <SkeletonCard>
        <SkeletonTitle width="w-50" />
        <SkeletonCalendarWeek />
        <SkeletonCalendarListItem />
        <SkeletonCalendarListItem />
      </SkeletonCard>
    </section>
  )
}
