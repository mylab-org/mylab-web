'use client'

import { useState } from 'react'
import type { LabsLinkResponseType } from '@/entities/labs/model/types'
import { useUsersMeHook } from '@/entities/user'
import { useLabsLinkHook } from '@/features/labs'
import { DIALOG_MAP } from '@/shared/constant/dialog'
import { isProfessorOrLabLeader } from '@/shared/lib/lab'
import { useDialogStore } from '@/shared/store'

export const useLabLinkManageHook = () => {
  const { me } = useUsersMeHook()
  const labId = me?.lab.labId
  const canManage = isProfessorOrLabLeader(me?.lab.role as UserRoleType)

  const [isLinkModalOpen, setIsLinkModalOpen] = useState<boolean>(false)
  const openDialogModal = useDialogStore(state => state.openDialogModal)
  const { deleteLink, isDeleting } = useLabsLinkHook({ labId })

  const handleDeleteLink = (link: LabsLinkResponseType) => {
    const { title, description } = DIALOG_MAP['LINK_DELETE']

    openDialogModal({ title, description: `'${link.name}' ${description}` }, '삭제', () => deleteLink(link.linkId))
  }

  return { labId, canManage, isLinkModalOpen, setIsLinkModalOpen, handleDeleteLink, isDeleting }
}
