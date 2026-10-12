'use client'

import { useForm } from 'react-hook-form'
import { postWorksPaperCreate } from '../api/post-works-paper-create'
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

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<PostWorksPaperCreatePayloadType>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  })

  const postWorksPaperCreateMutation = useApiMutation({
    mutationFn: ({ labId, payload }: { labId: number; payload: PostWorksPaperCreatePayloadType }) =>
      postWorksPaperCreate(labId, payload),
    successMessage: '논문 업무가 생성되었습니다.',
    onSuccess: () => {
      closeSideModal()
    },
  })

  const onSubmit = handleSubmit(async data => {
    postWorksPaperCreateMutation.mutate({ labId: 1, payload: data })
  })

  return {
    register,
    onSubmit,
    isPending: postWorksPaperCreateMutation.isPending,
    isValid,
  }
}
