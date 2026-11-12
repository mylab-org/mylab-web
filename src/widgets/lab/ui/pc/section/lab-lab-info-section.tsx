'use client'

import { useQuery } from '@tanstack/react-query'
import { useLabInfoHook } from '../../../model/use-lab-info-hook'
import { useLabLinkManageHook } from '../../../model/use-lab-link-manage-hook'
import { LabLinkModal } from '../../modal/lab-link-modal'
import { SideMember } from '../../side/side-member'
import { LabInfo } from '@/entities/labs'
import { getLabsMembers } from '@/entities/labs/api/get-labs-members'
import { LabLink } from '@/entities/labs/ui/lab-link'
import { LabMember } from '@/entities/labs/ui/lab-member'
import { useUsersMeHook } from '@/entities/user'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useSideModalStore } from '@/shared/store/useSideModalStore'

const MEMBER_PREVIEW_COUNT = 4

export const LabLabInfoSection = () => {
  const { lab, links } = useLabInfoHook()
  const { me, isError } = useUsersMeHook()
  const openSideModal = useSideModalStore(state => state.openSideModal)
  const { canManage, isLinkModalOpen, setIsLinkModalOpen, handleDeleteLink, isDeleting } = useLabLinkManageHook()

  const labId = me?.lab.labId

  const getLabMembersQuery = useQuery({
    queryKey: QUERY_KEYS.LABS.MEMBERS(labId ?? 0),
    queryFn: () => getLabsMembers(labId ?? 0),
    enabled: labId !== undefined,
  })

  if (isError || !me) return null

  const members = getLabMembersQuery.data ?? []

  return (
    <>
      <div className={'grid grid-cols-1 gap-5 lg:grid-cols-3'}>
        <LabInfo lab={lab} className={'p-5 md:p-5'} isShadow />
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
      </div>
      <LabLinkModal isOpen={isLinkModalOpen} onClose={() => setIsLinkModalOpen(false)} labId={labId} />
    </>
  )
}
