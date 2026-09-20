'use client'

import { useMutation } from '@tanstack/react-query'
import { useFormContext } from 'react-hook-form'
import { postAuthRegister } from '../api/post-auth-register'
import { ALERT_CONFIRM_TYPE, ALERT_MESSAGE } from '@/shared/constant/alert'
import { useAlertStore } from '@/shared/store'
import type { PostAuthRegisterPayloadType } from './types'

export const useSignupFormHook = () => {
  const onOpenAlert = useAlertStore(state => state.onOpenAlert)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useFormContext<PostAuthRegisterPayloadType>()

  const postRegisterMutation = useMutation({
    mutationFn: postAuthRegister,
    onSuccess: () => {
      onOpenAlert({
        message: ALERT_MESSAGE.REGISTER_SUCCESS,
        confirmType: ALERT_CONFIRM_TYPE.NAVIGATE_LOGIN,
      })
    },
    onError: () => {
      console.log('가입 실패')
    },
  })

  const onSubmit = handleSubmit((data: PostAuthRegisterPayloadType) => {
    postRegisterMutation.mutate(data)
  })

  return {
    register,
    errors,
    isValid,
    onSubmit,
  }
}
