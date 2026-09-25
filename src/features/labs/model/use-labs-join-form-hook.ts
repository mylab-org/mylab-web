'use client'

import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { postLabsJoin } from '../api/post-labs-join'
import type { PostLabsJoinPayloadType } from './types'
import type { AxiosError } from 'axios'

type Props = {
  ensureAccessToken?: (options?: { force?: boolean }) => Promise<string>
  onJoinPrevInfoOpen?: () => void
}

const isUnauthorized = (error: unknown) => {
  return (error as AxiosError | undefined)?.response?.status === 401
}

export const useLabsJoinFormHook = ({ ensureAccessToken, onJoinPrevInfoOpen }: Props = {}) => {
  const [isJoinPrevInfoModalOpen, setIsJoinPrevInfoModalOpen] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostLabsJoinPayloadType>({
    mode: 'onChange',
    defaultValues: {
      code: '',
    },
  })

  const code = useWatch({ control, name: 'code' })

  const openJoinPrevInfo = () => {
    if (onJoinPrevInfoOpen) {
      onJoinPrevInfoOpen()
      return
    }
    setIsJoinPrevInfoModalOpen(true)
  }

  const postLabsJoinMutation = useMutation({
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
      openJoinPrevInfo()
    },
    onError: (error: Error) => {
      console.error('Failed to join lab')
      // 세션 만료로 온보딩 모달이 이미 닫힌 경우 확인 모달을 열지 않음
      if (error.message === '온보딩 세션이 만료되었습니다.' || error.message === '온보딩 임시 세션이 없습니다.') {
        return
      }
      openJoinPrevInfo()
    },
  })

  const onSubmit = handleSubmit(() => {
    postLabsJoinMutation.mutate({ code })
  })

  return {
    code,
    register,
    onSubmit,
    errors,
    isPending: postLabsJoinMutation.isPending,
    isJoinPrevInfoModalOpen,
    setIsJoinPrevInfoModalOpen,
  }
}
