import { useQuery } from '@tanstack/react-query'
import { LabMemberItem } from '@/entities/labs'
import { getLabsMembers } from '@/entities/labs/api/get-labs-members'
import { useUsersMeHook } from '@/entities/user'
import { QUERY_KEYS } from '@/shared/api/query-key'

export const SideMember = () => {
  const { me } = useUsersMeHook()

  const labId = me?.lab.labId

  const getLabMembersQuery = useQuery({
    queryKey: QUERY_KEYS.LABS.MEMBERS(labId ?? 0),
    queryFn: () => getLabsMembers(labId ?? 0),
    enabled: labId !== undefined,
  })

  const members = getLabMembersQuery.data ?? []

  return (
    <div className={'flex h-full min-h-0 w-full flex-col px-5 pb-5 lg:w-[750px] lg:px-7.5'}>
      <div className={'flex flex-1 flex-col gap-3.75 overflow-auto'}>
        {members.map(member => (
          <LabMemberItem key={member.name} user={member} />
        ))}
      </div>
    </div>
  )
}
