'use client'

import { useState } from 'react'
import type { LabsLinkResponseType } from '@/entities/labs/model/types'
import { useUsersMeHook } from '@/entities/user'
import { useLabsLinkHook } from '@/features/labs'
import { isProfessorOrLabLeader } from '@/shared/lib/lab'
import { useDialogStore } from '@/shared/store'

/** 링크 추가 모달 열림 상태와 삭제 확인 처리. PC·모바일 섹션이 함께 씁니다. */
export const useLabLinkManageHook = () => {
  const { me } = useUsersMeHook()
  const labId = me?.lab.labId
  const canManage = isProfessorOrLabLeader(me?.lab.role as UserRoleType)

  const [isLinkModalOpen, setIsLinkModalOpen] = useState<boolean>(false)
  const openDialogModal = useDialogStore(state => state.openDialogModal)
  const { deleteLink, isDeleting } = useLabsLinkHook({ labId })

  const handleDeleteLink = (link: LabsLinkResponseType) => {
    openDialogModal(
      { title: '링크 삭제', description: `'${link.name}' 링크를 삭제할까요?\n삭제한 링크는 복구할 수 없습니다.` },
      '삭제',
      () => deleteLink(link.linkId),
    )
  }

  return { labId, canManage, isLinkModalOpen, setIsLinkModalOpen, handleDeleteLink, isDeleting }
}
