'use client'

import { postLabsJoin } from '../api/post-labs-join'
import { isUnauthorized } from '../lib'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import type { PostLabsJoinPayloadType } from './types'

type Props = {
  ensureAccessToken?: (options?: { force?: boolean }) => Promise<string>
  onJoinSuccess?: () => void
}

export const useLabsJoinHook = ({ ensureAccessToken, onJoinSuccess }: Props = {}) => {
  const postLabsJoinMutation = useApiMutation({
    mutationFn: async (payload: PostLabsJoinPayloadType) => {
      if (!ensureAccessToken) {
        return postLabsJoin(payload)
      }

      const accessToken = await ensureAccessToken()
      try {
        return await postLabsJoin(payload, { accessToken })
      } catch (error) {
        if (!isUnauthorized(error)) {
          throw error
        }
        const nextAccessToken = await ensureAccessToken({ force: true })
        return postLabsJoin(payload, { accessToken: nextAccessToken })
      }
    },
    onSuccess: () => {
      onJoinSuccess?.()
    },
  })

  const joinLab = (code: string) => {
    postLabsJoinMutation.mutate({ code })
  }

  return {
    joinLab,
    isPending: postLabsJoinMutation.isPending,
  }
}
