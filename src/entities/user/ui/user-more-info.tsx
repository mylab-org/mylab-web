import { cn } from '@/shared/lib'
import { isRoleTag } from '@/shared/lib/lab'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'
import type { UsersMeResponseType } from '../model/types'

type Props = {
  user: UsersMeResponseType
}

export const UserMoreInfo = ({ user }: Props) => {
  return (
    <div className={cn('flex items-center gap-3')}>
      <div className={'h-[64px] w-[64px] shrink-0 rounded-full bg-gray-300 md:h-[80px] md:w-[80px]'} />
      <div className={'flex min-w-0 flex-col gap-1.5'}>
        <Text className={'truncate text-[16px] font-bold md:text-[20px]'}>{user.name}</Text>
        <div className={'flex flex-wrap gap-1.25'}>
          {isRoleTag(user.lab.role) && (
            <Tag.Roll variant={user.lab.role as Exclude<UserRoleType, 'MEMBER' | 'PROFESSOR'>} />
          )}
          <Tag.Roll variant={user.degree} />
        </div>
        <div className={'text-[12px] font-medium md:text-[14px]'}>
          <Text className={'truncate text-gray-600!'}>{user.lab.labName}</Text>
          <Text className={'truncate text-gray-600!'}>{user.email}</Text>
        </div>
      </div>
    </div>
  )
}
