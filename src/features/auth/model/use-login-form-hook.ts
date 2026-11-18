'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoginSchema } from './login.schema'
import { postAuthLogin } from '@/features/auth/api/post-auth-login'
import { postAuthLogout } from '@/features/auth/api/post-auth-logout'
import { postAuthResendVerification } from '@/features/auth/api/post-auth-resend-verification'
import { refreshProvisionalAccessToken } from '@/shared/api/refresh-provisional-access-token'
import { ALERT_CONFIRM_TYPE, ALERT_MESSAGE } from '@/shared/constant/alert'
import { AUTH_ERROR_CODE } from '@/shared/constant/auth'
import { ROUTES } from '@/shared/constant/routes'
import { shouldRefreshAccessTokenOnServer } from '@/shared/lib/token/access-token-expiry'
import { setAccessToken } from '@/shared/lib/token/client-access-token-store'
import { useApiMutation } from '@/shared/model/use-api-mutation'
import { useAlertStore } from '@/shared/store'
import type { PostAuthLoginPayloadType, PostAuthLoginResponseType } from './types'
import type { AxiosError } from 'axios'

type LoginErrorBody = ApiResponseType<void> & {
  status?: number
}

type LabModalState = {
  open: boolean
  type: 'create' | 'join'
}

type ProvisionalTokens = {
  accessToken: string
}

const getSafeRedirectPath = (redirect: string | null) => {
  if (!redirect) return ROUTES.HOME
  // 외부 URL / 프로토콜 상대 경로 차단
  if (!redirect.startsWith('/') || redirect.startsWith('//')) return ROUTES.HOME
  return redirect
}

export const useLoginFormHook = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const onOpenAlert = useAlertStore(state => state.onOpenAlert)
  const [labModal, setLabModal] = useState<LabModalState>({ open: false, type: 'join' })
  const [provisionalTokens, setProvisionalTokens] = useState<ProvisionalTokens | null>(null)
  const provisionalTokensRef = useRef<ProvisionalTokens | null>(null)
  provisionalTokensRef.current = provisionalTokens

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { isValid, errors },
  } = useForm<PostAuthLoginPayloadType>({
    mode: 'onSubmit',
    resolver: zodResolver(LoginSchema),
  })

  const discardProvisionalSession = () => {
    const accessToken = provisionalTokensRef.current?.accessToken
    provisionalTokensRef.current = null
    setProvisionalTokens(null)
    setLabModal(prev => ({ ...prev, open: false }))

    if (!accessToken) return

    void postAuthLogout({ accessToken }).catch(() => {})
  }

  const ensureProvisionalAccessToken = async ({ force = false }: { force?: boolean } = {}) => {
    const current = provisionalTokensRef.current
    if (!current) {
      throw new Error('온보딩 임시 세션이 없습니다.')
    }

    if (!force && !shouldRefreshAccessTokenOnServer(current.accessToken)) {
      return current.accessToken
    }

    try {
      // RT는 로그인 시 서버가 심은 httpOnly 쿠키를 사용합니다.
      const next = await refreshProvisionalAccessToken()
      provisionalTokensRef.current = next
      setProvisionalTokens(next)
      return next.accessToken
    } catch {
      void discardProvisionalSession()
      onOpenAlert({
        message: ALERT_MESSAGE.SESSION_EXPIRED,
        confirmType: ALERT_CONFIRM_TYPE.CLOSE,
      })
      throw new Error('온보딩 세션이 만료되었습니다.')
    }
  }

  const postResendEmailValidateMutation = useApiMutation({
    mutationFn: postAuthResendVerification,
    defaultErrorMessage: '이메일 인증 메일 재발송에 실패했습니다. 잠시 후 다시 시도해주세요.',
    onSuccess: () => {
      onOpenAlert({
        message: ALERT_MESSAGE.EMAIL_VERIFY,
        confirmType: ALERT_CONFIRM_TYPE.CLOSE,
      })
    },
  })

  const postLoginMutation = useMutation({
    mutationFn: postAuthLogin,
    onSuccess: (response: ApiResponseType<PostAuthLoginResponseType>) => {
      const accessToken = response.data.accessToken
      // RT는 응답 body가 아니라 Set-Cookie(httpOnly)로 내려옵니다.
      const hasLab = response.data.lab !== null

      if (hasLab) {
        setAccessToken(accessToken)
        router.push(getSafeRedirectPath(searchParams.get('redirect')))
        return
      }

      // 온보딩 완료 전에는 AT만 메모리에 두고, AT 쿠키는 쓰지 않습니다.
      // RT 쿠키는 로그인 응답 Set-Cookie로 이미 저장된 상태입니다.
      const nextTokens = { accessToken }
      provisionalTokensRef.current = nextTokens
      setProvisionalTokens(nextTokens)
      setLabModal({
        open: true,
        type: response.data.user.degree === 'PROFESSOR' ? 'create' : 'join',
      })
    },
    onError: (error: AxiosError<LoginErrorBody>) => {
      const data = error.response?.data
      const status = error.response?.status ?? data?.status

      if (status === 403 && data?.code === AUTH_ERROR_CODE.EMAIL_NOT_VERIFIED) {
        postResendEmailValidateMutation.mutate({ email: getValues('email') })
        return
      }

      setError('password', { message: data?.message || '로그인에 실패했습니다.' })
    },
  })

  const onSubmit = handleSubmit(async (values: PostAuthLoginPayloadType) => {
    postLoginMutation.mutate(values)
  })

  const hideLabFormModal = () => {
    // 다음 단계 모달로 넘길 때 폼 모달만 닫고, 임시 토큰은 유지합니다.
    setLabModal(prev => ({ ...prev, open: false }))
  }

  const closeLabModal = () => {
    // type은 유지해 닫힘 애니메이션 중 create로 깜빡이지 않게 함
    void discardProvisionalSession()
  }

  const persistProvisionalSession = () => {
    const current = provisionalTokensRef.current
    if (!current) return
    // 생성/참여 확인 모달의 '입장하기' 클릭 시 AT 쿠키 저장
    // RT는 로그인 시 이미 httpOnly 쿠키로 저장되어 있습니다.
    setAccessToken(current.accessToken)
    provisionalTokensRef.current = null
    setProvisionalTokens(null)
    router.push(getSafeRedirectPath(searchParams.get('redirect')))
  }

  return {
    register,
    onSubmit,
    isValid,
    errors,
    isSubmitting: postLoginMutation.isPending || postResendEmailValidateMutation.isPending,
    userName: postLoginMutation.data?.data.user.name,
    labModal,
    ensureProvisionalAccessToken,
    closeLabModal,
    hideLabFormModal,
    persistProvisionalSession,
  }
}
