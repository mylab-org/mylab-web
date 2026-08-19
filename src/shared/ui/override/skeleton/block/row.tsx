import { SkeletonAvatarRow } from './avatar-row'
import { SkeletonTag } from './tag'

type SkeletonMemberRowProps = {
  nameWidth?: string
  tagWidth?: string
}

export const SkeletonMemberRow = ({ nameWidth = 'w-25', tagWidth = 'w-15' }: SkeletonMemberRowProps) => {
  return (
    <div className={'flex items-center justify-between'}>
      <SkeletonAvatarRow nameWidth={nameWidth} />
      <SkeletonTag width={tagWidth} />
    </div>
  )
}
