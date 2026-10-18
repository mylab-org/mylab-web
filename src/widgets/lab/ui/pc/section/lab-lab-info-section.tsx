'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { LabLinkModal } from '../../modal/lab-link-modal'
import { LabInfo } from '@/entities/labs'
import { getLabsMembers } from '@/entities/labs/api/get-labs-members'
import { LabLink } from '@/entities/labs/ui/lab-link'
import { LabMember } from '@/entities/labs/ui/lab-member'
import { useUsersMeHook } from '@/entities/user'
import { QUERY_KEYS } from '@/shared/api/query-key'

export const LabLabInfoSection = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { me, isError } = useUsersMeHook()

  const labId = me?.lab.labId

  const getLabMembersQuery = useQuery({
    queryKey: QUERY_KEYS.LABS.MEMBERS(labId ?? 0),
    queryFn: () => getLabsMembers(labId ?? 0),
    enabled: labId !== undefined,
  })

  if (isError || !me) return null

  return (
    <>
      <div className={'flex flex-1 flex-col gap-7.5'}>
        <LabInfo className={'p-5 md:p-6'} isShadow />
        <LabLink setIsOpen={setIsOpen} />
        <LabMember members={getLabMembersQuery.data ?? []} />
      </div>
      <LabLinkModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}
