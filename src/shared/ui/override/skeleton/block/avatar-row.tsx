import { SkeletonLine } from './text'
import { SKELETON_TONE } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { Skeleton } from '@/shared/ui/override/skeleton'

type SkeletonAvatarRowProps = {
  avatarSize?: string
  nameWidth?: string
}

export const SkeletonAvatarRow = ({ avatarSize = 'h-5 w-5', nameWidth = 'w-25' }: SkeletonAvatarRowProps) => {
  return (
    <div className={'flex items-center gap-2.5'}>
      <Skeleton circle className={cn(avatarSize, SKELETON_TONE)} />
      <SkeletonLine size="md" width={nameWidth} />
    </div>
  )
}
