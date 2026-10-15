'use client'

import { useForm } from 'react-hook-form'
import { postLabsCreate } from '../api/post-labs-create'
import { isUnauthorized } from '../lib'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import type { PostLabsCreatePayloadType, PostLabsCreateResponseType } from './types'

type Props = {
  ensureAccessToken?: (options?: { force?: boolean }) => Promise<string>
  onCreateSuccess?: (data: PostLabsCreateResponseType) => void
}

export const useLabsCreateFormHook = ({ ensureAccessToken, onCreateSuccess }: Props) => {
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

  const postLabsCreateMutation = useApiMutation({
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
    },
  })

  const onSubmit = handleSubmit((data: PostLabsCreatePayloadType) => {
    postLabsCreateMutation.mutate(data)
  })

  return {
    register,
    onSubmit,
    isValid,
    isPending: postLabsCreateMutation.isPending,
  }
}
