import { isRoleTag } from '@/shared/lib/lab'
import { Avatar } from '@/shared/ui/override/avatar'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'
import type { LabsMembersResponseType } from '../model/types'

interface Props {
  user: LabsMembersResponseType
}

export const LabMemberItem = ({ user }: Props) => {
  return (
    <div className={'flex items-center justify-between'}>
      <Avatar src={'/test.png'} alt={''} width={20} height={20} imgClassName={'rounded-full'}>
        <Text className={'text-[16px] leading-6 font-medium'}>{user.name}</Text>
      </Avatar>
      <div className={'flex gap-1'}>
        {isRoleTag(user.role) && <Tag.Roll variant={user.role as Exclude<UserRoleType, 'MEMBER' | 'PROFESSOR'>} />}
        <Tag.Roll variant={user.degree} />
      </div>
    </div>
  )
}
