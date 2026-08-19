import { SKELETON_TONE } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { Skeleton } from '@/shared/ui/override/skeleton'

type SkeletonTagProps = {
  width?: string
  height?: string
}

export const SkeletonTag = ({ width = 'w-30', height = 'h-5' }: SkeletonTagProps) => {
  return <Skeleton className={cn('rounded-full', height, width, SKELETON_TONE)} />
}

type SkeletonTagGroupProps = {
  count: number
  width?: string
  height?: string
}

export const SkeletonTagGroup = ({ count, width = 'w-30', height = 'h-5' }: SkeletonTagGroupProps) => {
  return (
    <div className={'flex flex-wrap gap-1.5'}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonTag key={index} width={width} height={height} />
      ))}
    </div>
  )
}
