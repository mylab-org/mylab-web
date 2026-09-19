'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useFormContext } from 'react-hook-form'
import { postAuthRegister } from '../api/post-auth-register'
import { ROUTES } from '@/shared/constant/routes'
import { allowEmailValidateAccess } from '@/shared/lib/email-validate-access'
import type { PostAuthRegisterPayloadType } from './types'

export const useSignupFormHook = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useFormContext<PostAuthRegisterPayloadType>()

  const postRegisterMutation = useMutation({
    mutationFn: postAuthRegister,
    onSuccess: () => {
      const { email, name } = getValues()
      allowEmailValidateAccess({ email, name })
      router.push(ROUTES.AUTH.EMAIL_VALIDATE.LINK)
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
