'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { LabLinkModal } from '../../modal/lab-link-modal'
import { SideMember } from '../../side/side-member'
import { LabInfo } from '@/entities/labs'
import { getLabsInfo } from '@/entities/labs/api/get-labs-info'
import { getLabsLink } from '@/entities/labs/api/get-labs-link'
import { getLabsMembers } from '@/entities/labs/api/get-labs-members'
import { LabLink } from '@/entities/labs/ui/lab-link'
import { LabMember } from '@/entities/labs/ui/lab-member'
import { useUsersMeHook } from '@/entities/user'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useSideModalStore } from '@/shared/store/useSideModalStore'

const MEMBER_PREVIEW_COUNT = 4

export const LabLabInfoSection = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { me, isError } = useUsersMeHook()
  const openSideModal = useSideModalStore(state => state.openSideModal)

  const labId = me?.lab.labId

  const getLabMembersQuery = useQuery({
    queryKey: QUERY_KEYS.LABS.MEMBERS(labId ?? 0),
    queryFn: () => getLabsMembers(labId ?? 0),
    enabled: labId !== undefined,
  })

  if (isError || !me) return null

  const members = getLabMembersQuery.data ?? []

  const getLabInfoQuery = useQuery({
    queryKey: QUERY_KEYS.LABS.LAB_INFO(labId ?? 0),
    queryFn: () => getLabsInfo(labId ?? 0),
    enabled: labId !== undefined,
  })

  const getLabLinkQuery = useQuery({
    queryKey: QUERY_KEYS.LABS.LAB_LINK(labId ?? 0),
    queryFn: () => getLabsLink(labId ?? 0),
    enabled: labId !== undefined,
  })

  if (getLabInfoQuery.isError || getLabLinkQuery.isError || !getLabInfoQuery.data || !getLabLinkQuery.data) return null

  return (
    <>
      <div className={'grid grid-cols-1 gap-5 lg:grid-cols-3'}>
        <LabInfo className={'p-5 md:p-5'} isShadow labInfo={getLabInfoQuery.data} />
        <LabLink setIsOpen={setIsOpen} labLink={getLabLinkQuery.data} />
        <LabMember
          members={members.slice(0, MEMBER_PREVIEW_COUNT)}
          onViewAll={() => openSideModal(SideMember, '연구실 구성원')}
          showViewAll={members.length > MEMBER_PREVIEW_COUNT}
        />
      </div>
      <LabLinkModal open={isOpen} onOpenChange={setIsOpen} />
    </>
  )
}
