'use client'

import { useQuery } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { getLabsMembers } from '@/entities/labs/api/get-labs-members'
import { useUsersMeHook } from '@/entities/user'
import { useLabsExitMemberHook, useLabsMemberChangeRoleHook } from '@/features/labs'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { isSubLeaderOrMember } from '@/shared/lib/lab'
import { Avatar } from '@/shared/ui/override/avatar'
import { CheckBox } from '@/shared/ui/override/checkbox'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'

type Props = {
  role: UserRoleType
  labId: number
}

const canRemoveMember = (requesterRole: UserRoleType, targetRole: UserRoleType, isSelf: boolean) => {
  if (isSelf || targetRole === 'PROFESSOR') return false
  if (requesterRole === 'PROFESSOR') return true
  if (requesterRole === 'LAB_LEADER') return targetRole === 'SUB_LEADER' || targetRole === 'MEMBER'
  return false
}

export const MoreLabMember = ({ role, labId }: Props) => {
  const { me } = useUsersMeHook()
  const { changeRole, isPending: isChangeRolePending } = useLabsMemberChangeRoleHook(labId)
  const { handleExitMember, isPending: isExitPending, pendingUserId } = useLabsExitMemberHook(labId)
  const { data: members } = useQuery({
    queryKey: QUERY_KEYS.LABS.MEMBERS(labId),
    queryFn: () => getLabsMembers(labId),
  })

  if (members === undefined) return null

  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 overflow-auto px-5 pb-5 lg:w-[550px] lg:px-7.5'}>
      <Text className={'text-foreground! text-[14px] font-medium'}>{`총 ${members.length}명`}</Text>
      <div className={'flex flex-col gap-7.5 py-5'}>
        {members.map(m => {
          const isSelf = me?.id === m.userId
          const showRemove = canRemoveMember(role, m.role, isSelf)

          return (
            <div key={m.userId} className={'flex items-center justify-between gap-2.5'}>
              <Avatar
                src={'/test.png'}
                alt={'profile'}
                width={40}
                height={40}
                imgClassName={'h-[20px] w-[20px] rounded-full md:h-[40px] md:w-[40px]'}
              >
                <Text className={'text-foreground! text-[12px] font-medium md:text-[14px]'}>{m.name}</Text>
                <Tag.Roll variant={m.degree} />
              </Avatar>

              <div className={'flex items-center gap-2'}>
                <CheckBox
                  title={'랩장'}
                  checked={m.role === 'LAB_LEADER'}
                  after
                  disabled={role !== 'PROFESSOR' || m.role === 'PROFESSOR' || isChangeRolePending}
                  onCheckedChange={checked => changeRole(m.userId, checked === true ? 'LAB_LEADER' : 'MEMBER')}
                />
                <CheckBox
                  title={'부랩장'}
                  after
                  checked={m.role === 'SUB_LEADER'}
                  disabled={isSubLeaderOrMember(role) || m.role === 'PROFESSOR' || isChangeRolePending}
                  onCheckedChange={checked => changeRole(m.userId, checked === true ? 'SUB_LEADER' : 'MEMBER')}
                />
                {showRemove && (
                  <button
                    type={'button'}
                    className={'flex cursor-pointer items-center gap-1 disabled:opacity-50'}
                    disabled={isExitPending}
                    onClick={() => handleExitMember(m.userId, m.name)}
                  >
                    <LogOut className={'text-subtle-foreground h-4 w-4'} />
                    <Text className={'text-[10px] font-normal text-slate-400 md:text-[12px]'}>
                      {pendingUserId === m.userId ? '처리 중...' : '내보내기'}
                    </Text>
                  </button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
