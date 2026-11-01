'use client'

import { useForm } from 'react-hook-form'
import { postWorksTaskCreate } from '../api/post-works-task-create'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import { useSideModalStore } from '@/shared/store'
import type { PostWorksTaskCreatePayloadType } from './types'

const DEFAULT_VALUES: PostWorksTaskCreatePayloadType = {
  type: 'WORK',
  title: '',
  description: '',
  startAt: '',
  endAt: '',
}

const toIsoDate = (date: string) => new Date(`${date}T00:00:00.000Z`).toISOString()

export const useWorksCreateTaskFormHook = () => {
  const closeSideModal = useSideModalStore(state => state.closeSideModal)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<PostWorksTaskCreatePayloadType>({
    defaultValues: DEFAULT_VALUES,
    mode: 'onChange',
  })

  register('startAt', { required: true })
  register('endAt', { required: true })

  const type = watch('type')
  const startAt = watch('startAt')
  const endAt = watch('endAt')

  const postWorksTaskCreateMutation = useApiMutation({
    mutationFn: postWorksTaskCreate,
    successMessage: '업무가 생성되었습니다.',
    invalidateQueryKeys: [QUERY_KEYS.TASK.LIST],
    onSuccess: () => {
      closeSideModal()
    },
  })

  const onSubmit = handleSubmit(async data => {
    postWorksTaskCreateMutation.mutate({
      ...data,
      startAt: toIsoDate(data.startAt),
      endAt: toIsoDate(data.endAt),
    })
  })

  const handleRangeChange = (nextStartAt: string, nextEndAt: string) => {
    setValue('startAt', nextStartAt, { shouldValidate: true })
    setValue('endAt', nextEndAt, { shouldValidate: true })
  }

  return {
    register,
    setValue,
    type,
    startAt,
    endAt,
    handleRangeChange,
    onSubmit,
    isPending: postWorksTaskCreateMutation.isPending,
    isValid,
  }
}
