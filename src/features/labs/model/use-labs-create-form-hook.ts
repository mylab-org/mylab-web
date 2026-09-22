'use client'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { postLabsCreate } from '../api/post-labs-create'
import type { PostLabsCreatePayloadType } from './types'

type Props = {
  onclose: () => void
}

export const useLabsCreateFormHook = ({ onclose }: Props) => {
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
    mutationFn: postLabsCreate,
    onSuccess: () => {
      onclose()
    },
    onError: () => {
      console.error('Failed to create lab')
    },
  })

  const onSubmit = handleSubmit((data: PostLabsCreatePayloadType) => {
    console.log(data)
  })

  return {
    register,
    onSubmit,
    isValid,
    isPending: postLabsCreateMutation.isPending,
  }
}
