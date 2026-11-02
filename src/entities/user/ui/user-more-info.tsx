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
    <div className={cn('flex items-center gap-2.5 rounded-[20px] bg-white p-5 md:p-6')}>
      <div className={'h-[70px] w-[70px] rounded-full bg-gray-300 md:h-[100px] md:w-[100px]'} />
      <div className={'flex flex-col gap-2.5 p-2.5'}>
        <div className={'flex flex-col gap-2.5'}>
          <div>
            <Text className={'text-[16px] font-bold md:text-[20px]'}>{user.name}</Text>
          </div>
          <div className={'flex gap-1.25'}>
            {isRoleTag(user.lab.role) && (
              <Tag.Roll variant={user.lab.role as Exclude<UserRoleType, 'MEMBER' | 'PROFESSOR'>} />
            )}
            <Tag.Roll variant={user.degree} />
          </div>
        </div>
        <div className={'text-[10px] font-medium md:text-[14px]'}>
          <Text className={'text-gray-600!'}>{user.lab.labName}</Text>
          <Text className={'text-gray-600!'}>{user.email}</Text>
        </div>
      </div>
    </div>
  )
}
