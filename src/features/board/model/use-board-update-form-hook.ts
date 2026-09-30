'use client'

import { type InfiniteData, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useBoardCategoryIdHook } from './use-board-category-id-hook'
import { patchBoardUpdate } from '../api/patch-board-update'
import type { BoardListResponseType } from '@/entities/board/model/types'
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
  const queryClient = useQueryClient()

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
    defaultErrorMessage: '소식 수정에 실패했습니다.',
    successMessage: '소식이 수정되었습니다.',
    onSuccess: (_data, payload) => {
      // 무한 쿼리는 무효화 시 불러온 모든 페이지를 재요청하므로, 캐시의 해당 게시글만 직접 수정
      queryClient.setQueryData<InfiniteData<BoardListResponseType>>(
        QUERY_KEYS.BOARD.LIST(categoryId),
        prev =>
          prev && {
            ...prev,
            pages: prev.pages.map(page => ({
              ...page,
              posts: page.posts.map(post =>
                post.id === postId ? { ...post, title: payload.title, content: payload.content } : post,
              ),
            })),
          },
      )
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
