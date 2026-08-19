import { SkeletonListCard } from './layout'
import { SkeletonTag, SkeletonTagGroup } from './tag'
import { SkeletonLine } from './text'
import { SKELETON_TONE } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { Skeleton } from '@/shared/ui/override/skeleton'

export const SkeletonWorkProgress = () => {
  return (
    <div className={'flex flex-col gap-1.5 py-1'}>
      <Skeleton className={cn('h-2 w-full rounded-[24px]', SKELETON_TONE)} />
      <SkeletonTagGroup count={5} width="w-17.5" height="h-4.5" />
    </div>
  )
}

export const SkeletonWorkListItem = () => {
  return (
    <SkeletonListCard className={'gap-2.5 p-4'}>
      <SkeletonTag width="w-27.5" height="h-4.5" />
      <div className={'flex flex-col gap-1.25'}>
        <SkeletonLine size="lg" width="w-60" />
        <SkeletonLine size="xs" width="w-75" />
        <SkeletonLine size="xs" width="w-60" />
      </div>
      <SkeletonWorkProgress />
    </SkeletonListCard>
  )
}
