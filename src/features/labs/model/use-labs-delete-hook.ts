'use client'

import { deleteLabs } from '../api/delete-labs'
import { useUsersMeHook } from '@/entities/user'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { clearAccessToken, runLogoutHandler } from '@/shared/lib/token/client-access-token-store'
import { useApiMutation } from '@/shared/model/use-api-mutation'

export const useLabsDeleteHook = () => {
  const { me } = useUsersMeHook()
  const labId = me?.lab?.labId

  const deleteLabsMutation = useApiMutation({
    mutationFn: () => deleteLabs(labId ?? 0),
    successMessage: '연구실이 삭제되었습니다.',
    defaultErrorMessage: '연구실 삭제에 실패했습니다.',
    invalidateQueryKeys: [QUERY_KEYS.USERS.ROOT],
    onSuccess: async () => {
      // 연구실이 없으면 로그인 온보딩(생성/참여) 플로우로 돌아가도록 세션을 종료합니다.
      clearAccessToken()
      await runLogoutHandler()
    },
  })

  const handleDelete = () => {
    if (labId === undefined || deleteLabsMutation.isPending) return
    deleteLabsMutation.mutate()
  }

  return {
    handleDelete,
    isPending: deleteLabsMutation.isPending,
  }
}
