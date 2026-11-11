'use client'

import { deleteLabsLink } from '../api/delete-labs-link'
import { useUsersMeHook } from '@/entities/user'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'

export const useLabsLinkDeleteHook = () => {
  const { me } = useUsersMeHook()
  const labId = me?.lab?.labId

  const deleteLabsLinkMutation = useApiMutation({
    mutationFn: (linkId: number) => deleteLabsLink(labId ?? 0, linkId),
    successMessage: '링크가 삭제되었습니다.',
    defaultErrorMessage: '링크 삭제에 실패했습니다.',
    invalidateQueryKeys: labId !== undefined ? [QUERY_KEYS.LABS.LAB_LINK(labId)] : [],
  })

  const handleDelete = (linkId: number) => {
    if (labId === undefined || deleteLabsLinkMutation.isPending) return
    deleteLabsLinkMutation.mutate(linkId)
  }

  return {
    handleDelete,
    isPending: deleteLabsLinkMutation.isPending,
    pendingLinkId: deleteLabsLinkMutation.isPending ? deleteLabsLinkMutation.variables : undefined,
  }
}
