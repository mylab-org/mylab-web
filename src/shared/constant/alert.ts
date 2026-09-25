export type AlertConfirmType = 'close' | 'navigateLogin'

export const ALERT_CONFIRM_TYPE = {
  CLOSE: 'close',
  NAVIGATE_LOGIN: 'navigateLogin',
} as const satisfies Record<string, AlertConfirmType>

export const ALERT_MESSAGE = {
  EMAIL_VERIFY: '이메일 인증이 완료되지 않았습니다.\n메일함에서 인증을 진행해주세요.',
  REGISTER_SUCCESS: '회원가입이 완료되었습니다.\n메일함에서 이메일 인증을 진행한 후 서비스를 이용해주세요.',
  SESSION_EXPIRED: '세션이 만료되었습니다.\n다시 로그인해 주세요.',
} as const
