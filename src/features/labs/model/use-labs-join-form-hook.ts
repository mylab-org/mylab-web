'use client'

import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { postLabsJoin } from '../api/post-labs-join'
import type { PostLabsJoinPayloadType } from './types'

export const useLabsJoinFormHook = () => {
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

  const postLabsJoinMutation = useMutation({
    mutationFn: postLabsJoin,
    onSuccess: () => {
      setIsJoinPrevInfoModalOpen(true)
    },
    onError: () => {
      console.error('Failed to join lab')
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
