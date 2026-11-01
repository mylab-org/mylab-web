'use client'

import { useForm } from 'react-hook-form'
import { postWorksPaperCreate } from '../api/post-works-paper-create'
import { useUsersMeHook } from '@/entities/user'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import { useSideModalStore } from '@/shared/store'
import type { PostWorksPaperCreatePayloadType } from './types'

const DEFAULT_VALUES: PostWorksPaperCreatePayloadType = {
  title: '',
  scheduleId: undefined,
  leadAuthorUserId: undefined,
  participantUserIds: undefined,
}

export const useWorksCreatePaperFormHook = () => {
  const closeSideModal = useSideModalStore(state => state.closeSideModal)
  const { me } = useUsersMeHook()
  const labId = me?.lab?.labId

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<PostWorksPaperCreatePayloadType>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  })

  const postWorksPaperCreateMutation = useApiMutation({
    mutationFn: (payload: PostWorksPaperCreatePayloadType) => postWorksPaperCreate(labId ?? 0, payload),
    successMessage: '논문 업무가 생성되었습니다.',
    invalidateQueryKeys: [QUERY_KEYS.PAPER.LIST(labId ?? 0)],
    onSuccess: () => {
      closeSideModal()
    },
  })

  const onSubmit = handleSubmit(async data => {
    if (labId === undefined) return
    postWorksPaperCreateMutation.mutate(data)
  })

  return {
    register,
    onSubmit,
    isPending: postWorksPaperCreateMutation.isPending,
    isValid,
  }
}
