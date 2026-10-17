'use client'

import { patchLabsMemberChangeRole } from '../api/patch-labs-member-change-role'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'

type ChangeRoleVariables = {
  userId: number
  role: UserRoleType
}

export const useLabsMemberChangeRoleHook = (labId: number) => {
  const patchLabsMemberChangeRoleMutation = useApiMutation({
    mutationFn: ({ userId, role }: ChangeRoleVariables) => patchLabsMemberChangeRole(labId, userId, { role }),
    invalidateQueryKeys: [QUERY_KEYS.LABS.MEMBERS(labId)],
  })

  const changeRole = (userId: number, role: UserRoleType) => {
    patchLabsMemberChangeRoleMutation.mutate({ userId, role })
  }

  return {
    changeRole,
    isPending: patchLabsMemberChangeRoleMutation.isPending,
  }
}
