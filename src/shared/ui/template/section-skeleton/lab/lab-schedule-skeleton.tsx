import {
  SkeletonCalendarListItem,
  SkeletonCalendarWeek,
  SkeletonCard,
  SkeletonTitle,
} from '@/shared/ui/override/skeleton'

export const LabScheduleSkeleton = () => {
  return (
    <SkeletonCard className={'min-h-0 flex-1'} padding="md">
      <SkeletonTitle width="w-40" />
      <SkeletonCalendarWeek />
      <SkeletonCalendarListItem />
      <SkeletonCalendarListItem />
    </SkeletonCard>
  )
}
