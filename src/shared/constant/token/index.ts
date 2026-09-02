export const ACCESS_TOKEN_COOKIE_KEY = 'accessToken'
export const REFRESH_TOKEN_COOKIE_KEY = 'refreshToken'
// 로그인 화면에서 "ID 저장" 체크 시 로컬스토리지에 저장할 아이디 키입니다.
export const SAVED_LOGIN_ID_STORAGE_KEY = 'savedLoginId'
// 세션 만료 시 리다이렉트할 경로입니다.
export const SESSION_EXPIRED_ROUTE = '/api/auth/session-expired'

// proxy가 현재 요청에서 사용할 최신 access token을 서버 컴포넌트에 직접 전달할 때 쓰는 내부 헤더 키입니다.
// 같은 요청 안에서 쿠키 갱신이 즉시 보이지 않는 경우에도, 서버 fetch 계층은 이 헤더를 우선 사용합니다.
export const CURRENT_ACCESS_TOKEN_HEADER = 'x-current-access-token'
