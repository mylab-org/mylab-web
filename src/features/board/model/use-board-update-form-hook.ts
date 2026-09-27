'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useBoardCategoryIdHook } from './use-board-category-id-hook'
import { patchBoardUpdate } from '../api/patch-board-update'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import type { PatchBoardUpdatePayloadType } from './types'

type Props = {
  postId: number
  defaultValues: Pick<PatchBoardUpdatePayloadType, 'title' | 'content'>
  onSuccess?: () => void
}

export const useBoardUpdateFormHook = ({ postId, defaultValues, onSuccess }: Props) => {
  const { categoryId } = useBoardCategoryIdHook()

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

  const patchBoardUpdateMutation = useApiMutation({
    mutationFn: (payload: PatchBoardUpdatePayloadType) => patchBoardUpdate(postId, payload),
    invalidateQueryKeys: [QUERY_KEYS.BOARD.LIST(categoryId)],
    defaultErrorMessage: '소식 수정에 실패했습니다.',
    successMessage: '소식이 수정되었습니다.',
    onSuccess: () => {
      onSuccess?.()
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
