'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { postLabsLink } from '../api/post-labs-link'
import { useUsersMeHook } from '@/entities/user'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import type { PostLabsLinkPayloadType } from './types'

const DEFAULT_VALUES: PostLabsLinkPayloadType = {
  name: '',
  url: '',
}

type Params = {
  open: boolean
  onSuccess?: () => void
}

export const useLabsLinkCreateFormHook = ({ open, onSuccess }: Params) => {
  const { me } = useUsersMeHook()
  const labId = me?.lab?.labId

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<PostLabsLinkPayloadType>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  })

  useEffect(() => {
    if (!open) reset(DEFAULT_VALUES)
  }, [open, reset])

  const postLabsLinkMutation = useApiMutation({
    mutationFn: (payload: PostLabsLinkPayloadType) => postLabsLink(labId ?? 0, payload),
    successMessage: '링크가 등록되었습니다.',
    defaultErrorMessage: '링크 등록에 실패했습니다.',
    invalidateQueryKeys: labId !== undefined ? [QUERY_KEYS.LABS.LAB_LINK(labId)] : [],
    onSuccess: () => {
      onSuccess?.()
    },
  })

  const onSubmit = handleSubmit(data => {
    if (labId === undefined) return
    postLabsLinkMutation.mutate({
      name: data.name.trim(),
      url: data.url.trim(),
    })
  })

  return {
    register,
    onSubmit,
    isValid,
    isPending: postLabsLinkMutation.isPending,
  }
}
