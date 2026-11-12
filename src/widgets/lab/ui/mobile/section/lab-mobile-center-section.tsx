'use client'

import { useQuery } from '@tanstack/react-query'
import { useLabInfoHook } from '../../../model/use-lab-info-hook'
import { useLabLinkManageHook } from '../../../model/use-lab-link-manage-hook'
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
  const { me } = useUsersMeHook()
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const { canManage, isLinkModalOpen, setIsLinkModalOpen, handleDeleteLink, isDeleting } = useLabLinkManageHook()
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
      <LabLink
        links={links}
        setIsOpen={setIsLinkModalOpen}
        canManage={canManage}
        onDeleteLink={handleDeleteLink}
        isDeleting={isDeleting}
      />
      <LabMember
        members={members.slice(0, MEMBER_PREVIEW_COUNT)}
        onViewAll={() => openSideModal(SideMember, '연구실 구성원')}
        showViewAll={members.length > MEMBER_PREVIEW_COUNT}
      />
      <LabLinkModal isOpen={isLinkModalOpen} onClose={() => setIsLinkModalOpen(false)} labId={labId} />
    </div>
  )
}
