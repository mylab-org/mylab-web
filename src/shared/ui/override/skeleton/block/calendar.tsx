import { SkeletonListCard } from './layout'
import { SkeletonLine } from './text'
import { SKELETON_TONE } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { Skeleton } from '@/shared/ui/override/skeleton'

export const SkeletonCalendarWeek = () => {
  return (
    <>
      <div className={'grid grid-cols-7 text-center'}>
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton key={index} className={cn('mx-auto h-3.5 w-3.5', SKELETON_TONE)} />
        ))}
      </div>
      <div className={'grid grid-cols-7 text-center'}>
        {Array.from({ length: 7 }).map((_, index) => (
          <div key={index} className={'flex justify-center'}>
            <Skeleton circle className={cn('h-7.5 w-7.5', SKELETON_TONE)} />
          </div>
        ))}
      </div>
    </>
  )
}

export const SkeletonCalendarListItem = () => {
  return (
    <SkeletonListCard>
      <div className={'flex items-center gap-1.25'}>
        <Skeleton circle className={cn('h-2.5 w-2.5', SKELETON_TONE)} />
        <SkeletonLine width="w-55" />
      </div>
      <SkeletonLine size="xs" width="w-60" />
      <SkeletonLine size="xs" width="w-45" />
    </SkeletonListCard>
  )
}
