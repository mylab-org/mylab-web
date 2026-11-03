import { CARD_SHADOW } from '@/shared/constant/skeleton'
import { cn } from '@/shared/lib'
import { isRoleTag } from '@/shared/lib/lab'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'
import type { UsersMeResponseType } from '../model/types'

type Props = {
  user: UsersMeResponseType
}

const getGreeting = () => {
  const hour = new Date().getHours()
  if (hour < 6) return '수고 많으셨어요!'
  if (hour < 12) return '좋은 아침이에요!'
  if (hour < 18) return '좋은 오후예요!'
  return '좋은 저녁이에요!'
}

export const UserInfo = ({ user }: Props) => {
  return (
    <div
      className={cn(
        'bg-card flex w-full items-center justify-between gap-3 rounded-[20px] p-4 md:gap-6 md:p-6',
        CARD_SHADOW,
      )}
    >
      <div className={'flex min-w-0 flex-1 items-center gap-2.5 md:gap-6'}>
        <div className={'bg-muted h-[56px] w-[56px] shrink-0 rounded-full md:h-[72px] md:w-[72px]'} />
        <div className={'flex min-w-0 flex-col gap-2'}>
          <Text className={'text-muted-foreground! text-[13px] font-medium md:text-[15px]'}>{getGreeting()}</Text>
          <div className={'flex min-w-0 flex-wrap items-center gap-x-2 gap-y-1'}>
            <Text className={'truncate text-[16px] font-bold md:text-[20px]'}>{user.name}</Text>
            <div className={'flex gap-1.25'}>
              {isRoleTag(user.lab.role) && (
                <Tag.Roll variant={user.lab.role as Exclude<UserRoleType, 'MEMBER' | 'PROFESSOR'>} />
              )}
              <Tag.Roll variant={user.degree} />
            </div>
          </div>
          <Text className={'text-subtle-foreground! truncate text-[12px] font-medium md:text-[14px]'}>
            {user.lab.labName}
          </Text>
        </div>
      </div>

      <div className={'hidden shrink-0 items-center gap-3 md:flex'}>
        <div className={'bg-muted flex min-w-[72px] flex-col items-center gap-1 rounded-[12px] px-3 py-2.5'}>
          <Text className={'text-brand! text-[18px] font-bold md:text-[20px]'}>2</Text>
          <Text className={'text-muted-foreground! text-[11px] font-medium md:text-[12px]'}>오늘 일정</Text>
        </div>
        <div className={'bg-muted flex min-w-[72px] flex-col items-center gap-1 rounded-[12px] px-3 py-2.5'}>
          <Text className={'text-brand! text-[18px] font-bold md:text-[20px]'}>2</Text>
          <Text className={'text-muted-foreground! text-[11px] font-medium md:text-[12px]'}>진행 업무</Text>
        </div>
      </div>
    </div>
  )
}
