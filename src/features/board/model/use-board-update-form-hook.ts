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
  defaultValues: Pick<PatchBoardUpdatePayloadType, 'title' | 'content' | 'isAnonymous'>
  onSuccess?: () => void
}

export const useBoardUpdateFormHook = ({ postId, defaultValues, onSuccess }: Props) => {
  const { categoryId } = useBoardCategoryIdHook()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<PatchBoardUpdatePayloadType>({
    defaultValues: {
      title: defaultValues.title,
      content: defaultValues.content,
      isAnonymous: defaultValues.isAnonymous,
      Img: [],
    },
    mode: 'onChange',
  })

  useEffect(() => {
    reset({
      title: defaultValues.title,
      content: defaultValues.content,
      isAnonymous: defaultValues.isAnonymous,
      Img: [],
    })
  }, [defaultValues.content, defaultValues.title, defaultValues.isAnonymous, reset])

  const patchBoardUpdateMutation = useApiMutation({
    mutationFn: (payload: PatchBoardUpdatePayloadType) => patchBoardUpdate(postId, payload),
    defaultErrorMessage: '소식 수정에 실패했습니다.',
    successMessage: '소식이 수정되었습니다.',
    onSuccess: updatedPost => {
      // 무한 쿼리는 무효화 시 불러온 모든 페이지를 재요청하므로, 캐시의 해당 게시글만 서버가 돌려준 값으로 교체
      // (익명 해제 시 실제 작성자 정보는 서버 응답에만 있음)
      queryClient.setQueryData<InfiniteData<BoardListResponseType>>(
        QUERY_KEYS.BOARD.LIST(categoryId),
        prev =>
          prev && {
            ...prev,
            pages: prev.pages.map(page => ({
              ...page,
              posts: page.posts.map(post => (post.id === postId ? updatedPost : post)),
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
    control,
    onSubmit,
    isValid,
    isPending: patchBoardUpdateMutation.isPending,
  }
}
