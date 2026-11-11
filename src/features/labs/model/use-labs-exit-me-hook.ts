'use client'

import { deleteLabsExitMe } from '../api/delete-labs-exit-me'
import { useUsersMeHook } from '@/entities/user'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { clearAccessToken, runLogoutHandler } from '@/shared/lib/token/client-access-token-store'
import { useApiMutation } from '@/shared/model/use-api-mutation'

export const useLabsExitMeHook = () => {
  const { me } = useUsersMeHook()
  const labId = me?.lab?.labId

  const deleteLabsExitMeMutation = useApiMutation({
    mutationFn: () => deleteLabsExitMe(labId ?? 0),
    successMessage: '연구실에서 나갔습니다.',
    defaultErrorMessage: '연구실 나가기에 실패했습니다.',
    invalidateQueryKeys: [QUERY_KEYS.USERS.ROOT],
    onSuccess: async () => {
      // 소속 연구실이 없으면 로그인 온보딩(생성/참여) 플로우로 돌아가도록 세션을 종료합니다.
      clearAccessToken()
      await runLogoutHandler()
    },
  })

  const handleExit = () => {
    if (labId === undefined || deleteLabsExitMeMutation.isPending) return
    deleteLabsExitMeMutation.mutate()
  }

  return {
    handleExit,
    isPending: deleteLabsExitMeMutation.isPending,
  }
}
