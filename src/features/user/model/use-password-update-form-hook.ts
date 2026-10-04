'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { passwordUpdateSchema, type PasswordUpdateFormValues } from './password-update.schema'
import { patchUsersMePassword } from '../api/patch-users-me-password'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import { useSideModalStore } from '@/shared/store'
import type { PatchUsersMePasswordPayloadType } from './types'

export const usePasswordUpdateFormHook = () => {
  const closeSideModal = useSideModalStore(state => state.closeSideModal)

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    trigger,
    formState: { isValid, errors },
  } = useForm<PasswordUpdateFormValues>({
    resolver: zodResolver(passwordUpdateSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
    mode: 'onChange',
  })

  useEffect(() => {
    // 확인 값을 입력한 뒤 새 비밀번호를 바꾸면 확인 칸의 일치 여부 메시지도 다시 계산해야 합니다.
    const { unsubscribe } = watch((_, { name }) => {
      if (name === 'newPassword' && getValues('newPasswordConfirm') !== '') trigger('newPasswordConfirm')
    })
    return () => unsubscribe()
  }, [watch, getValues, trigger])

  const patchUsersMePasswordMutation = useApiMutation({
    mutationFn: patchUsersMePassword,
    successMessage: '비밀번호가 변경되었습니다.',
    defaultErrorMessage: '비밀번호 변경에 실패했습니다.',
    onSuccess: () => {
      closeSideModal()
    },
  })

  const onSubmit = handleSubmit((data: PatchUsersMePasswordPayloadType) => {
    patchUsersMePasswordMutation.mutate(data)
  })

  return { register, onSubmit, isValid, errors, isPending: patchUsersMePasswordMutation.isPending }
}
