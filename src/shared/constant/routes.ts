export const BASE_PATHS = {
  LOGIN: '/login',
  REGIST: '/regist',
  EMAIL_VALIDATE: '/email-validate',
  SURVEY: '/survey',
  BOARD: '/board',
  CALENDAR: '/calendar',
  USER: '/user',
  WORKS: '/works',
}

const SUB_PATHS = {
  LOGIN: {
    SEARCH: '/search',
  },
}

const createPath = (base: string, ...pahts: string[]) => pahts.reduce((acc, path) => `${acc}${path}`, base)

export const ROUTES = {
  HOME: '/',
  AUTH: {
    LOGIN: {
      NAME: '로그인',
      LINK: BASE_PATHS.LOGIN,
    },
    REGIST: {
      NAME: '회원가입',
      LINK: BASE_PATHS.REGIST,
    },
    PW_FINDER: {
      NAME: '비밀번호 찾기',
      LINK: createPath(BASE_PATHS.LOGIN, SUB_PATHS.LOGIN.SEARCH),
    },
    SURVEY: {
      NAME: '회원 인증',
      LINK: BASE_PATHS.SURVEY,
    },
    EMAIL_VALIDATE: {
      NAME: '이메일 인증 안내',
      LINK: BASE_PATHS.EMAIL_VALIDATE,
    },
  },
  BOARD: {
    LIST: {
      NAME: '게시판',
      LINK: createPath(BASE_PATHS.BOARD, '/list'),
    },
  },
  CALENDAR: {
    ROOT: BASE_PATHS.CALENDAR,
  },
  USER: {
    ROOT: BASE_PATHS.USER,
  },
  WORKS: {
    ROOT: BASE_PATHS.WORKS,
  },
}
