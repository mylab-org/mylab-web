import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { LoginSchema } from '../../login/model/login.schema'
import { postAuthLogin } from '@/features/auth/api/post-auth-login'
import { postAuthResendVerification } from '@/features/auth/api/post-auth-resend-verification'
import { AUTH_ERROR_CODE } from '@/shared/constant/auth'
import { ROUTES } from '@/shared/constant/routes'
import { allowEmailValidateAccess } from '@/shared/lib/email-validate-access'
import { setAccessToken } from '@/shared/lib/token/client-access-token-store'
import type { PostAuthLoginPayloadType, PostAuthLoginResponseType } from './types'
import type { AxiosError } from 'axios'

type LoginErrorBody = ApiResponseType<void> & {
  status?: number
}

export const useLoginFormHook = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid, errors, isSubmitting },
  } = useForm<PostAuthLoginPayloadType>({
    mode: 'onSubmit',
    resolver: zodResolver(LoginSchema),
  })

  const postResendEmailValidateMutation = useMutation({
    mutationFn: postAuthResendVerification,
    onSuccess: response => {
      console.log('이메일 인증 메일 재발송 성공', response)
    },
    onError: (error: AxiosError<LoginErrorBody>) => {
      console.log('이메일 인증 메일 재발송 실패', error)
    },
  })

  const postLoginMutation = useMutation({
    mutationFn: postAuthLogin,
    onSuccess: (response: ApiResponseType<PostAuthLoginResponseType>) => {
      const accessToken = response.data.accessToken
      const refreshToken = response.data.refreshToken
      const user = response.data.user
      setAccessToken(accessToken)
      router.push(ROUTES.HOME)
    },
    onError: (error: AxiosError<LoginErrorBody>) => {
      const data = error.response?.data
      const status = error.response?.status ?? data?.status

      console.log('로그인 실패 응답', data)

      if (status === 403 && data?.code === AUTH_ERROR_CODE.EMAIL_NOT_VERIFIED) {
        const email = getValues('email')
        postResendEmailValidateMutation.mutate({ email })
        allowEmailValidateAccess({ email })
        router.push(ROUTES.AUTH.EMAIL_VALIDATE.LINK)
      }
    },
  })

  const onSubmit = handleSubmit(async (values: PostAuthLoginPayloadType) => {
    postLoginMutation.mutate(values)
  })

  return {
    register,
    onSubmit,
    isValid,
    errors,
    isSubmitting,
  }
}
