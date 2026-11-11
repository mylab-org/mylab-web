'use client'

import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { LabLinkModal } from '../../modal/lab-link-modal'
import { SideMember } from '../../side/side-member'
import { LabInfo, LabLink, LabMember } from '@/entities/labs'
import { getLabsInfo } from '@/entities/labs/api/get-labs-info'
import { getLabsLink } from '@/entities/labs/api/get-labs-link'
import { getLabsMembers } from '@/entities/labs/api/get-labs-members'
import { useUsersMeHook } from '@/entities/user'
import { useLabsLinkDeleteHook } from '@/features/labs/model/use-labs-link-delete-hook'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useSideModalStore } from '@/shared/store/useSideModalStore'

const MEMBER_PREVIEW_COUNT = 3

export const LabMobileCenterSection = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { me } = useUsersMeHook()
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const { handleDelete, pendingLinkId } = useLabsLinkDeleteHook()
  const labId = me?.lab.labId

  const getLabMembersQuery = useQuery({
    queryKey: QUERY_KEYS.LABS.MEMBERS(labId ?? 0),
    queryFn: () => getLabsMembers(labId ?? 0),
    enabled: labId !== undefined,
  })

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

  const members = getLabMembersQuery.data ?? []

  return (
    <div className={'flex flex-col gap-4'}>
      <LabInfo className={'p-5'} isShadow labInfo={getLabInfoQuery.data} />
      <LabLink
        setIsOpen={setIsOpen}
        labLink={getLabLinkQuery.data}
        onDelete={handleDelete}
        pendingLinkId={pendingLinkId}
      />
      <LabMember
        members={members.slice(0, MEMBER_PREVIEW_COUNT)}
        onViewAll={() => openSideModal(SideMember, '연구실 구성원')}
        showViewAll={members.length > MEMBER_PREVIEW_COUNT}
      />
      <LabLinkModal open={isOpen} onOpenChange={setIsOpen} />
    </div>
  )
}
