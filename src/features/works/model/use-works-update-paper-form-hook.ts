'use client'

import { useForm } from 'react-hook-form'
import { patchWorksPaperUpdate } from '../api/patch-works-paper-update'
import type { WorksPaperDetailResponseType } from '@/entities/works/model/types'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { TEST_LAB_ID } from '@/shared/constant/test'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import type { PatchWorksPaperUpdatePayloadType } from './types'

type UpdatePaperFormType = Pick<PatchWorksPaperUpdatePayloadType, 'title'>

interface Props {
  paperId: number
  defaultTitle: string
  onSuccess?: (updatedPaper: WorksPaperDetailResponseType) => void
}

export const useWorksUpdatePaperFormHook = ({ paperId, defaultTitle, onSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<UpdatePaperFormType>({
    defaultValues: { title: defaultTitle },
    mode: 'onChange',
  })

  const patchWorksPaperUpdateMutation = useApiMutation({
    mutationFn: (payload: PatchWorksPaperUpdatePayloadType) => patchWorksPaperUpdate(TEST_LAB_ID, paperId, payload),
    successMessage: '논문 정보가 수정되었습니다.',
    defaultErrorMessage: '논문 정보 수정에 실패했습니다.',
    invalidateQueryKeys: [QUERY_KEYS.PAPER.LIST(TEST_LAB_ID), QUERY_KEYS.PAPER.DETAIL(TEST_LAB_ID, paperId)],
    onSuccess: updatedPaper => onSuccess?.(updatedPaper),
  })

  const onSubmit = handleSubmit(data => {
    patchWorksPaperUpdateMutation.mutate({ title: data.title })
  })

  return {
    register,
    onSubmit,
    isPending: patchWorksPaperUpdateMutation.isPending,
    isValid,
  }
}
