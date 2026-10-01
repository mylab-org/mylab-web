'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useBoardCategoryIdHook } from './use-board-category-id-hook'
import { postBoardCreate } from '../api/post-board-create'
import type { BoardListResponseType } from '@/entities/board/model/types'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import type { PostBoardCreatePayloadType } from './types'
import type { InfiniteData } from '@tanstack/react-query'

type Props = {
  onClose: () => void
}

export const useBoardCreateFormHook = ({ onClose }: Props) => {
  const { categoryId } = useBoardCategoryIdHook()
  const queryClient = useQueryClient()

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

  const postBoardCreateMutation = useApiMutation({
    mutationFn: (payload: PostBoardCreatePayloadType) => postBoardCreate(categoryId, payload),
    defaultErrorMessage: '게시글 등록에 실패했습니다.',
    successMessage: '게시글이 등록되었습니다.',
    onSuccess: createdPost => {
      queryClient.setQueryData<InfiniteData<BoardListResponseType>>(
        QUERY_KEYS.BOARD.LIST(categoryId),
        prev =>
          prev && {
            ...prev,
            pages: prev.pages.map((page, index) =>
              index === 0 ? { ...page, posts: [createdPost, ...page.posts] } : page,
            ),
          },
      )
      onClose()
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
