export const EMAIL_VALIDATE_ACCESS_COOKIE_KEY = 'emailValidateAccess'
export const EMAIL_VALIDATE_ACCESS_STORAGE_KEY = 'emailValidateAccessPayload'

export const AUTH_ERROR_CODE = {
  EMAIL_NOT_VERIFIED: 'A010',
} as const

export const AUTH_EMAIL_VALIDATE_MESSAGE = {
  ERROR: {
    TITLE: '인증 링크가 만료되었거나\n유효하지 않습니다.',
    DESCRIPTION: '다시 로그인을 진행해주세요.',
  },
  SUCCESS: {
    TITLE: '환영합니다.\n서비스 이용이 가능합니다.',
    DESCRIPTION: '이메일 인증이 완료되었습니다.',
  },
} as const
