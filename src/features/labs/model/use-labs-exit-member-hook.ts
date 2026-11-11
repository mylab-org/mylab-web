'use client'

import { deleteLabsExitMember } from '../api/delete-labs-exit-member'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import { useConfirmStore } from '@/shared/store'

export const useLabsExitMemberHook = (labId: number) => {
  const onOpenConfirm = useConfirmStore(state => state.onOpenConfirm)

  const deleteLabsExitMemberMutation = useApiMutation({
    mutationFn: (userId: number) => deleteLabsExitMember(labId, userId),
    successMessage: '멤버를 내보냈습니다.',
    defaultErrorMessage: '멤버 내보내기에 실패했습니다.',
    invalidateQueryKeys: [QUERY_KEYS.LABS.MEMBERS(labId)],
  })

  const handleExitMember = (userId: number, memberName?: string) => {
    if (deleteLabsExitMemberMutation.isPending) return
    onOpenConfirm(memberName ? `${memberName} 님을 내보내시겠습니까?` : '해당 멤버를 내보내시겠습니까?', () =>
      deleteLabsExitMemberMutation.mutate(userId),
    )
  }

  return {
    handleExitMember,
    isPending: deleteLabsExitMemberMutation.isPending,
    pendingUserId: deleteLabsExitMemberMutation.isPending ? deleteLabsExitMemberMutation.variables : undefined,
  }
}
