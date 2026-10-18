import { useQuery } from '@tanstack/react-query'
import { LogOut } from 'lucide-react'
import { getLabsMembers } from '@/entities/labs/api/get-labs-members'
import { useLabsMemberChangeRoleHook } from '@/features/labs'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { Avatar } from '@/shared/ui/override/avatar'
import { CheckBox } from '@/shared/ui/override/checkbox'
import { Tag } from '@/shared/ui/override/tag'
import { Text } from '@/shared/ui/override/text'

type Props = {
  labId: number
}

export const MoreLabMember = ({ labId }: Props) => {
  const { changeRole, isPending } = useLabsMemberChangeRoleHook(labId)
  const { data: members } = useQuery({
    queryKey: QUERY_KEYS.LABS.MEMBERS(labId),
    queryFn: () => getLabsMembers(labId),
  })

  if (members === undefined) return null

  return (
    <div className={'flex min-h-0 w-full flex-1 flex-col gap-2.5 overflow-auto px-5 pb-5 lg:w-[550px] lg:px-7.5'}>
      <Text className={'text-[14px] font-medium text-gray-900!'}>{`총 ${members.length}명`}</Text>
      <div className={'flex flex-col gap-7.5 py-5'}>
        {members.map(m => (
          <div key={m.userId} className={'flex items-center justify-between gap-2.5'}>
            <Avatar
              src={'/test.png'}
              alt={'profile'}
              width={40}
              height={40}
              imgClassName={'h-[20px] w-[20px] rounded-full md:h-[40px] md:w-[40px]'}
            >
              <Text className={'text-[12px] font-medium text-gray-900! md:text-[14px]'}>{m.name}</Text>
              <Tag.Roll variant={m.degree} />
            </Avatar>

            <div className={'flex items-center gap-2'}>
              <CheckBox
                title={'랩장'}
                checked={m.role === 'LAB_LEADER'}
                after
                disabled={m.role === 'PROFESSOR' || isPending}
                onCheckedChange={checked => changeRole(m.userId, checked === true ? 'LAB_LEADER' : 'MEMBER')}
              />
              <CheckBox
                title={'부랩장'}
                after
                checked={m.role === 'SUB_LEADER'}
                disabled={m.role === 'PROFESSOR' || isPending}
                onCheckedChange={checked => changeRole(m.userId, checked === true ? 'SUB_LEADER' : 'MEMBER')}
              />
              <div className={'flex cursor-pointer gap-1'}>
                <LogOut className={'h-4 w-4 text-gray-400'} />
                <Text className={'text-[10px] font-normal text-slate-400 md:text-[12px]'}>내보내기</Text>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
