'use client'

import { useForm } from 'react-hook-form'
import { deleteLabsLinks } from '../api/delete-labs-links'
import { postLabsLinks } from '../api/post-labs-links'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import type { PostLabsLinksPayloadType } from './types'

type Props = {
  labId?: number
  onAddSuccess?: () => void
}

/** 연구실 링크 추가·삭제 */
export const useLabsLinkHook = ({ labId, onAddSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isValid, errors },
  } = useForm<PostLabsLinksPayloadType>({
    defaultValues: { name: '', url: '' },
    mode: 'onChange',
  })

  const invalidateQueryKeys = [QUERY_KEYS.LABS.LINKS(labId ?? 0)]

  const postLabsLinksMutation = useApiMutation<unknown, PostLabsLinksPayloadType, PostLabsLinksPayloadType>({
    mutationFn: (payload: PostLabsLinksPayloadType) => postLabsLinks(labId as number, payload),
    invalidateQueryKeys,
    successMessage: '링크가 추가되었습니다',
    onSuccess: () => {
      reset()
      onAddSuccess?.()
    },
  })

  const deleteLabsLinksMutation = useApiMutation({
    mutationFn: (linkId: number) => deleteLabsLinks(labId as number, linkId),
    invalidateQueryKeys,
    successMessage: '링크가 삭제되었습니다',
  })

  const onSubmit = handleSubmit((data: PostLabsLinksPayloadType) => {
    if (labId === undefined) return
    postLabsLinksMutation.mutate({ name: data.name.trim(), url: data.url.trim() })
  })

  const deleteLink = (linkId: number) => {
    if (labId === undefined) return
    deleteLabsLinksMutation.mutate(linkId)
  }

  return {
    register,
    errors,
    isValid,
    reset,
    onSubmit,
    isAdding: postLabsLinksMutation.isPending,
    deleteLink,
    isDeleting: deleteLabsLinksMutation.isPending,
  }
}
