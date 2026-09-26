'use client'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useBoardCategoryId } from './use-board-category-id'
import { postBoardCreate } from '../api/post-board-create'
import type { PostBoardCreatePayloadType } from './types'

export const useBoardCreateFormHook = () => {
  const { categoryId } = useBoardCategoryId()

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<PostBoardCreatePayloadType>({
    defaultValues: {
      title: '',
      content: '',
    },
    mode: 'onChange',
  })

  const postBoardCreateMutation = useMutation({
    mutationFn: (payload: PostBoardCreatePayloadType) => postBoardCreate(categoryId, payload),
    onSuccess: () => {
      console.log('소식이 성공적으로 등록되었습니다.')
    },
    onError: () => {
      console.log('소식 등록에 실패했습니다.')
    },
  })

  const onSubmit = handleSubmit(data => {
    postBoardCreateMutation.mutate(data)
  })

  return {
    register,
    onSubmit,
    isValid,
    isPending: postBoardCreateMutation.isPending,
  }
}
