import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { LoginSchema } from './login.schema'
import { postAuthLogin } from '@/features/auth/api/post-auth-login'
import { postAuthResendVerification } from '@/features/auth/api/post-auth-resend-verification'
import { ALERT_CONFIRM_TYPE, ALERT_MESSAGE } from '@/shared/constant/alert'
import { AUTH_ERROR_CODE } from '@/shared/constant/auth'
import { ROUTES } from '@/shared/constant/routes'
import { setAccessToken, setRefreshToken } from '@/shared/lib/token/client-access-token-store'
import { useAlertStore } from '@/shared/store'
import type { PostAuthLoginPayloadType, PostAuthLoginResponseType } from './types'
import type { AxiosError } from 'axios'

type LoginErrorBody = ApiResponseType<void> & {
  status?: number
}

export const useLoginFormHook = () => {
  const router = useRouter()
  const onOpenAlert = useAlertStore(state => state.onOpenAlert)
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid, errors },
  } = useForm<PostAuthLoginPayloadType>({
    mode: 'onSubmit',
    resolver: zodResolver(LoginSchema),
  })

  const postResendEmailValidateMutation = useMutation({
    mutationFn: postAuthResendVerification,
    onSuccess: () => {
      onOpenAlert({
        message: ALERT_MESSAGE.EMAIL_VERIFY,
        confirmType: ALERT_CONFIRM_TYPE.CLOSE,
      })
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
      setAccessToken(accessToken)
      setRefreshToken(refreshToken)
      router.push(ROUTES.HOME)
    },
    onError: (error: AxiosError<LoginErrorBody>) => {
      const data = error.response?.data
      const status = error.response?.status ?? data?.status

      if (status === 403 && data?.code === AUTH_ERROR_CODE.EMAIL_NOT_VERIFIED) {
        postResendEmailValidateMutation.mutate({ email: getValues('email') })
        return
      }

      console.log('로그인 실패 응답', data)
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
    isSubmitting: postLoginMutation.isPending || postResendEmailValidateMutation.isPending,
  }
}
