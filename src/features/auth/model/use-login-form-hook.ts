import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { LoginSchema } from './login.schema'
import { postAuthLogin } from '@/features/auth/api/post-auth-login'
import { postAuthResendVerification } from '@/features/auth/api/post-auth-resend-verification'
import { refreshProvisionalAccessToken } from '@/shared/api/refresh-provisional-access-token'
import { ALERT_CONFIRM_TYPE, ALERT_MESSAGE } from '@/shared/constant/alert'
import { AUTH_ERROR_CODE } from '@/shared/constant/auth'
import { ROUTES } from '@/shared/constant/routes'
import { shouldRefreshAccessTokenOnServer } from '@/shared/lib/token/access-token-expiry'
import { setAccessToken, setRefreshToken } from '@/shared/lib/token/client-access-token-store'
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
  refreshToken: string
}

/**
 * 백엔드가 login 응답에 hasLab을 내려주기 전 임시 스위치입니다.
 * - true  → 소속 랩 있음: 쿠키 저장 + redirect/홈 이동
 * - false → 소속 랩 없음: 생성/참여 온보딩 모달
 * 백엔드 연동 후에는 응답의 hasLab을 우선하고, 이 값은 fallback으로만 쓰면 됩니다.
 */
const TEMP_HAS_LAB = false

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
    formState: { isValid, errors },
  } = useForm<PostAuthLoginPayloadType>({
    mode: 'onSubmit',
    resolver: zodResolver(LoginSchema),
  })

  const discardProvisionalSession = () => {
    provisionalTokensRef.current = null
    setProvisionalTokens(null)
    setLabModal(prev => ({ ...prev, open: false }))
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
      const next = await refreshProvisionalAccessToken(current.refreshToken)
      provisionalTokensRef.current = next
      setProvisionalTokens(next)
      return next.accessToken
    } catch {
      discardProvisionalSession()
      onOpenAlert({
        message: ALERT_MESSAGE.SESSION_EXPIRED,
        confirmType: ALERT_CONFIRM_TYPE.CLOSE,
      })
      throw new Error('온보딩 세션이 만료되었습니다.')
    }
  }

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
      // 응답 hasLab이 오면 우선 사용, 없으면 TEMP_HAS_LAB로 제어
      const hasLab = response.data.hasLab ?? TEMP_HAS_LAB

      if (hasLab) {
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)
        router.push(getSafeRedirectPath(searchParams.get('redirect')))
        return
      }

      // 온보딩(생성/참여) 완료 전에는 쿠키에 저장하지 않습니다.
      // 중간에 취소·새로고침해도 로그인 페이지에 머물도록 메모리에만 보관합니다.
      const nextTokens = { accessToken, refreshToken }
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

      console.log('로그인 실패 응답', data)
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
    setLabModal(prev => ({ ...prev, open: false }))
    // 온보딩 취소 시 임시 토큰 폐기 → 새로고침해도 미로그인 상태 유지
    provisionalTokensRef.current = null
    setProvisionalTokens(null)
  }

  const persistProvisionalSession = () => {
    const current = provisionalTokensRef.current
    if (!current) return
    // 생성/참여 확인 모달의 '입장하기' 클릭 시 쿠키 저장
    setAccessToken(current.accessToken)
    setRefreshToken(current.refreshToken)
    provisionalTokensRef.current = null
    setProvisionalTokens(null)
  }

  return {
    register,
    onSubmit,
    isValid,
    errors,
    isSubmitting: postLoginMutation.isPending || postResendEmailValidateMutation.isPending,
    labModal,
    ensureProvisionalAccessToken,
    setLabModal,
    closeLabModal,
    hideLabFormModal,
    persistProvisionalSession,
  }
}
