import { SKELETON_TONE } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { Skeleton } from '@/shared/ui/override/skeleton'

type SkeletonTitleProps = {
  width?: string
}

export const SkeletonTitle = ({ width = 'w-50' }: SkeletonTitleProps) => {
  return <Skeleton className={cn('h-6', width, SKELETON_TONE)} />
}

type SkeletonLineProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  width?: string
  className?: string
}

const LINE_HEIGHT = {
  xs: 'h-3',
  sm: 'h-3.5',
  md: 'h-4',
  lg: 'h-4.5',
} as const

export const SkeletonLine = ({ size = 'sm', width = 'w-full', className }: SkeletonLineProps) => {
  return <Skeleton className={cn(LINE_HEIGHT[size], width, SKELETON_TONE, className)} />
}
