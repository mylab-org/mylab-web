'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { useLabInfoHook } from '../../../model/use-lab-info-hook'
import { LabLinkModal } from '../../modal/lab-link-modal'
import { SideMember } from '../../side/side-member'
import { LabInfo, LabLink, LabMember } from '@/entities/labs'
import { getLabsMembers } from '@/entities/labs/api/get-labs-members'
import { useUsersMeHook } from '@/entities/user'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useSideModalStore } from '@/shared/store/useSideModalStore'

const MEMBER_PREVIEW_COUNT = 3

export const LabMobileCenterSection = () => {
  const { lab, links } = useLabInfoHook()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { me } = useUsersMeHook()
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const labId = me?.lab.labId

  const getLabMembersQuery = useQuery({
    queryKey: QUERY_KEYS.LABS.MEMBERS(labId ?? 0),
    queryFn: () => getLabsMembers(labId ?? 0),
    enabled: labId !== undefined,
  })

  const members = getLabMembersQuery.data ?? []

  return (
    <div className={'flex flex-col gap-4'}>
      <LabInfo lab={lab} className={'p-5'} isShadow />
      <LabLink links={links} setIsOpen={setIsOpen} />
      <LabMember
        members={members.slice(0, MEMBER_PREVIEW_COUNT)}
        onViewAll={() => openSideModal(SideMember, '연구실 구성원')}
        showViewAll={members.length > MEMBER_PREVIEW_COUNT}
      />
      <LabLinkModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  )
}
