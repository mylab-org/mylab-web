'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useBoardCategoryId } from './use-board-category-id'
import { patchBoardUpdate } from '../api/patch-board-update'
import { QUERY_KEYS } from '@/shared/api/query-key'
import type { PatchBoardUpdatePayloadType } from './types'

type Props = {
  postId: number
  defaultValues: Pick<PatchBoardUpdatePayloadType, 'title' | 'content'>
  onSuccess?: () => void
}

export const useBoardUpdateFormHook = ({ postId, defaultValues, onSuccess }: Props) => {
  const queryClient = useQueryClient()
  const { categoryId } = useBoardCategoryId()

  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<PatchBoardUpdatePayloadType>({
    defaultValues: {
      title: defaultValues.title,
      content: defaultValues.content,
      Img: [],
    },
    mode: 'onChange',
  })

  useEffect(() => {
    reset({
      title: defaultValues.title,
      content: defaultValues.content,
      Img: [],
    })
  }, [defaultValues.content, defaultValues.title, reset])

  const patchBoardUpdateMutation = useMutation({
    mutationFn: (payload: PatchBoardUpdatePayloadType) => patchBoardUpdate(postId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.BOARD.LIST(categoryId) })
      onSuccess?.()
    },
    onError: () => {
      console.error('소식 수정에 실패했습니다.')
    },
  })

  const onSubmit = handleSubmit(data => {
    patchBoardUpdateMutation.mutate(data)
  })

  return {
    register,
    onSubmit,
    isValid,
    isPending: patchBoardUpdateMutation.isPending,
  }
}
