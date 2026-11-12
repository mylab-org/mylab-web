'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { patchLabsDetail } from '../api/patch-labs-detail'
import type { LabsDetailResponseType } from '@/entities/labs/model/types'
import { QUERY_KEYS } from '@/shared/api/query-key'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import type { PatchLabsDetailPayloadType } from './types'

/** 서버 UpdateLabRequestDto 제약과 맞춰둔 값 */
export const RESEARCH_FIELD_MAX_COUNT = 10
export const RESEARCH_FIELD_MAX_LENGTH = 30

type FormValues = {
  labName: string
  description: string
}

type Props = {
  labId?: number
  lab?: LabsDetailResponseType
  onUpdateSuccess?: () => void
}

/** 연구실 이름·소개·연구 분야 수정 */
export const useLabsUpdateFormHook = ({ labId, lab, onUpdateSuccess }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormValues>({
    defaultValues: {
      labName: lab?.labName ?? '',
      description: lab?.description ?? '',
    },
    mode: 'onChange',
  })

  const [researchFields, setResearchFields] = useState<string[]>(lab?.researchFields ?? [])

  const addResearchField = (value: string) => {
    const field = value.trim()
    if (!field) return false

    if (field.length > RESEARCH_FIELD_MAX_LENGTH) {
      toast.error(`연구 분야는 ${RESEARCH_FIELD_MAX_LENGTH}자 이하여야 합니다`, { icon: false })
      return false
    }
    if (researchFields.includes(field)) {
      toast.error('이미 추가된 연구 분야입니다', { icon: false })
      return false
    }
    if (researchFields.length >= RESEARCH_FIELD_MAX_COUNT) {
      toast.error(`연구 분야는 최대 ${RESEARCH_FIELD_MAX_COUNT}개까지 등록할 수 있습니다`, { icon: false })
      return false
    }

    setResearchFields(prev => [...prev, field])
    return true
  }

  const removeResearchField = (field: string) => {
    setResearchFields(prev => prev.filter(item => item !== field))
  }

  const patchLabsDetailMutation = useApiMutation<unknown, PatchLabsDetailPayloadType, FormValues>({
    mutationFn: (payload: PatchLabsDetailPayloadType) => patchLabsDetail(labId as number, payload),
    invalidateQueryKeys: [QUERY_KEYS.LABS.DETAIL(labId ?? 0)],
    successMessage: '연구실 정보가 수정되었습니다',
    onSuccess: () => onUpdateSuccess?.(),
  })

  const onSubmit = handleSubmit((data: FormValues) => {
    if (labId === undefined) return

    patchLabsDetailMutation.mutate({
      labName: data.labName.trim(),
      // 서버는 빈 문자열도 그대로 저장하므로 비우면 소개를 지운 것으로 처리합니다.
      description: data.description.trim(),
      researchFields,
    })
  })

  return {
    register,
    errors,
    isValid,
    onSubmit,
    isPending: patchLabsDetailMutation.isPending,
    researchFields,
    addResearchField,
    removeResearchField,
  }
}
