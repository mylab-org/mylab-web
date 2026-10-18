'use client'

import { useForm, useWatch } from 'react-hook-form'
import { getLabsInviteCodesCheckValidate } from '@/entities/labs/api/get-labs-invite-codes-check-validate'
import type { LabsInviteCodesCheckValidateResponseType } from '@/entities/labs/model/types'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import type { PostLabsJoinPayloadType } from './types'

type Props = {
  onJoinPrevInfoOpen?: (code: string, labInfo: LabsInviteCodesCheckValidateResponseType) => void
}

export const useLabsJoinFormHook = ({ onJoinPrevInfoOpen }: Props = {}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PostLabsJoinPayloadType>({
    mode: 'onChange',
    defaultValues: {
      code: '',
    },
  })

  const code = useWatch({ control, name: 'code' })

  const getLabsInviteCodesCheckValidateMutation = useApiMutation({
    mutationFn: getLabsInviteCodesCheckValidate,
    onSuccess: (data, code) => {
      onJoinPrevInfoOpen?.(code, data)
    },
  })

  const onSubmit = handleSubmit(() => {
    getLabsInviteCodesCheckValidateMutation.mutate(code)
  })

  return {
    code,
    register,
    onSubmit,
    errors,
    isPending: getLabsInviteCodesCheckValidateMutation.isPending,
  }
}
