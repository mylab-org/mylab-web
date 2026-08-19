import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import type { ReactNode } from 'react'

type SkeletonCardProps = {
  children: ReactNode
  className?: string
  padding?: 'md' | 'lg'
}

export const SkeletonCard = ({ children, className, padding = 'lg' }: SkeletonCardProps) => {
  return (
    <div
      className={cn(
        'flex flex-col gap-3.5 rounded-[24px] bg-white',
        CARD_SHADOW,
        padding === 'md' ? 'p-5 md:p-6' : 'p-6',
        className,
      )}
    >
      {children}
    </div>
  )
}

type SkeletonListCardProps = {
  children: ReactNode
  className?: string
}

export const SkeletonListCard = ({ children, className }: SkeletonListCardProps) => {
  return (
    <div className={cn('flex flex-col gap-1.25 rounded-[12px] border border-[#E2E3E5] px-3 py-4', className)}>
      {children}
    </div>
  )
}
