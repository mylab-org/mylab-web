import { cn } from '@/shared/lib'
import { Skeleton as ShadcnSkeleton } from '@/shared/ui/shadcn/skeleton'
import type { ComponentProps } from 'react'

type SkeletonProps = {
  circle?: boolean
} & ComponentProps<typeof ShadcnSkeleton>

export const Skeleton = ({ className, circle = false, ...props }: SkeletonProps) => {
  return (
    <ShadcnSkeleton {...props} className={cn('bg-gray-300 dark:bg-gray-700', circle && 'rounded-full', className)} />
  )
}
