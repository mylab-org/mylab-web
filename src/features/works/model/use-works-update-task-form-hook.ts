'use client'

import { useForm } from 'react-hook-form'
import { patchWorksTaskUpdate } from '../api/patch-works-task-update'
import type { TaskListResponseType } from '@/entities/works/model/types'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { formatDate } from '@/shared/lib/format'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import type { PatchWorksTaskUpdatePayloadType } from './types'

const toIsoDate = (date: string) => new Date(`${date}T00:00:00.000Z`).toISOString()

interface Props {
  task: TaskListResponseType
  onSuccess?: (updatedTask: TaskListResponseType) => void
}

export const useWorksUpdateTaskFormHook = ({ task, onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isValid },
  } = useForm<PatchWorksTaskUpdatePayloadType>({
    defaultValues: {
      type: task.type,
      title: task.title,
      description: task.description,
      startAt: formatDate(task.startAt),
      endAt: formatDate(task.endAt),
    },
    mode: 'onChange',
  })

  const type = watch('type')

  const patchWorksTaskUpdateMutation = useApiMutation({
    mutationFn: (payload: PatchWorksTaskUpdatePayloadType) => patchWorksTaskUpdate(task.taskId, payload),
    successMessage: '업무 정보가 수정되었습니다.',
    defaultErrorMessage: '업무 정보 수정에 실패했습니다.',
    invalidateQueryKeys: [QUERY_KEYS.TASK.LIST],
    onSuccess: updatedTask => onSuccess?.(updatedTask),
  })

  const onSubmit = handleSubmit(data => {
    patchWorksTaskUpdateMutation.mutate({
      ...data,
      startAt: toIsoDate(data.startAt),
      endAt: toIsoDate(data.endAt),
    })
  })

  return {
    register,
    setValue,
    type,
    onSubmit,
    isPending: patchWorksTaskUpdateMutation.isPending,
    isValid,
  }
}
