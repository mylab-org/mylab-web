'use client'

import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { postLabsCreate } from '../api/post-labs-create'
import type { PostLabsCreatePayloadType, PostLabsCreateResponseType } from './types'
import type { AxiosError } from 'axios'

type Props = {
  ensureAccessToken?: (options?: { force?: boolean }) => Promise<string>
  onCreateSuccess?: (data: PostLabsCreateResponseType) => void
}

const isUnauthorized = (error: unknown) => {
  return (error as AxiosError | undefined)?.response?.status === 401
}

export const useLabsCreateFormHook = ({ ensureAccessToken, onCreateSuccess }: Props) => {
  const [createLabResponse, setCreateLabResponse] = useState<PostLabsCreateResponseType | null>(null)

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<PostLabsCreatePayloadType>({
    defaultValues: {
      universityName: '',
      departmentName: '',
      labName: '',
    },
    mode: 'onChange',
  })

  const postLabsCreateMutation = useMutation({
    mutationFn: async (payload: PostLabsCreatePayloadType) => {
      if (!ensureAccessToken) {
        return postLabsCreate(payload)
      }

      const accessToken = await ensureAccessToken()
      try {
        return await postLabsCreate(payload, { accessToken })
      } catch (error) {
        if (!isUnauthorized(error)) {
          throw error
        }
        const nextAccessToken = await ensureAccessToken({ force: true })
        return postLabsCreate(payload, { accessToken: nextAccessToken })
      }
    },
    onSuccess: (data: PostLabsCreateResponseType) => {
      if (onCreateSuccess) {
        onCreateSuccess(data)
        return
      }
      setCreateLabResponse(data)
    },
    onError: () => {
      console.error('Failed to create lab')
    },
  })

  const onSubmit = handleSubmit((data: PostLabsCreatePayloadType) => {
    postLabsCreateMutation.mutate(data)
  })

  const clearCreateLabResponse = () => {
    setCreateLabResponse(null)
  }

  return {
    register,
    onSubmit,
    isValid,
    isPending: postLabsCreateMutation.isPending,
    createLabResponse,
    clearCreateLabResponse,
  }
}
