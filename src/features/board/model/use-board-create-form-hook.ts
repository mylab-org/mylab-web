'use client'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useBoardCategoryIdHook } from './use-board-category-id-hook'
import { postBoardCreate } from '../api/post-board-create'
import type { PostBoardCreatePayloadType } from './types'

export const useBoardCreateFormHook = () => {
  const { categoryId } = useBoardCategoryIdHook()

  const {
    register,
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<PostBoardCreatePayloadType>({
    defaultValues: {
      title: '',
      content: '',
      isAnonymous: false,
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
    control,
    onSubmit,
    isValid,
    isPending: postBoardCreateMutation.isPending,
  }
}
