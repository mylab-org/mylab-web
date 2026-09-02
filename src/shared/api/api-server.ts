import qs from 'qs'
import { getServerAccessToken } from '../lib/token/server-access-tokne-cookies'

type ServerApiParams =
  string | Record<string, string | number | boolean | null | undefined | Array<string | number | boolean>>

type ServerApiRequestOptions<TReq> = {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: TReq
  headers?: Record<string, string>
  skipAuth?: boolean
  skipRefresh?: boolean
  params?: ServerApiParams
  cache?: RequestCache
  next?: NextFetchRequestConfig
}

type ServerApiResolvedRequest<TReq> = {
  resolvedUrl: string
  method: ServerApiRequestOptions<TReq>['method']
  body?: TReq
  headers?: Record<string, string>
  skipAuth?: boolean
  cache: RequestCache
  next?: NextFetchRequestConfig
}

//서버 요청 실패 시 세션 갱신이 필요한 경우 던지는 에러
export class SessionRefreshRequiredError extends Error {
  readonly reason: string

  constructor(reason: string) {
    super(reason)
    this.name = 'SessionRefreshRequiredError'
    this.reason = reason
  }
}

async function resolveServerApiUrl(url: string) {
  // 절대 URL이 오면 그대로 쓰고, 상대 path면 공통 API base URL과 합칩니다.
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }

  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw new Error('서버 API 요청에 사용할 NEXT_PUBLIC_API_BASE_URL이 필요합니다.')
  }

  return `${process.env.NEXT_PUBLIC_BASE_URL}${url}`
}

function resolveServerApiParams(params?: ServerApiParams) {
  // next fetch는 axios처럼 params 옵션을 해석하지 않으므로,
  // 문자열 query는 그대로 쓰고 객체 params만 qs로 직렬화해 아래 공통 URL 조합 단계에 넘깁니다.
  if (typeof params === 'string') {
    return params
  }

  if (!params) {
    return ''
  }

  return qs.stringify(params, {
    skipNulls: true,
    arrayFormat: 'repeat',
  })
}

// 서버 요청과 refresh 후 재시도 요청이 같은 규칙으로 Authorization 헤더를 만들도록 공통화합니다.
// 호출부에서 Authorization을 직접 넘긴 경우에는 그 값을 우선해 덮어쓰지 않습니다.
function buildRequestHeaders<TReq>({
  headers,
  skipAuth,
  accessToken,
}: Pick<ServerApiResolvedRequest<TReq>, 'headers' | 'skipAuth'> & {
  // refresh 후 재시도에서는 쿠키에 아직 반영되지 않은 새 access token을 직접 주입해 사용합니다.
  accessToken: string | null
}) {
  const authorizationHeader = headers?.Authorization ?? headers?.authorization ?? undefined

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(!skipAuth && accessToken && !authorizationHeader ? { Authorization: `${accessToken}` } : {}),
    ...headers,
  }
}

// 실제 백엔드 fetch를 수행하는 가장 작은 실행 단위입니다.
// 401 재시도 시에는 refresh로 받은 새 access token만 바꿔 같은 요청 정의를 다시 실행합니다.
async function executeServerRequest<TReq>({
  resolvedUrl,
  method,
  body,
  headers,
  skipAuth,
  accessToken,
  cache,
  next,
}: ServerApiResolvedRequest<TReq> & {
  // 401 후 재시도에서는 refresh로 받은 최신 토큰을 직접 주입합니다.
  accessToken: string | null
}) {
  return fetch(resolvedUrl, {
    method,
    headers: buildRequestHeaders({
      headers,
      skipAuth,
      accessToken,
    }),
    body: body === undefined ? undefined : JSON.stringify(body),
    cache,
    next,
  })
}

// 서버 컴포넌트/route handler 공통 서버 요청 진입점입니다.
// 최초 요청이 401이면 현재 요청의 쿠키로 refresh를 시도한 뒤 원요청을 정확히 한 번 더 재실행합니다.
async function requestFromServer<TRes, TReq = never>({
  url,
  method,
  body,
  headers,
  skipAuth,
  skipRefresh,
  params,
  cache = 'no-store',
  next,
}: ServerApiRequestOptions<TReq>) {
  const baseResolvedUrl = await resolveServerApiUrl(url)
  // params 직렬화
  const resolvedParams = resolveServerApiParams(params)
  // params 존재시 url 과 병합
  const resolvedUrl = resolvedParams ? `${baseResolvedUrl}?${resolvedParams}` : baseResolvedUrl
  const accessToken = await getServerAccessToken()
  const resolvedRequest: ServerApiResolvedRequest<TReq> = {
    resolvedUrl,
    method,
    body,
    headers,
    skipAuth,
    cache,
    next,
  }

  const response = await executeServerRequest({
    ...resolvedRequest,
    accessToken,
  })

  // 서버 API 계층은 401을 "세션 갱신이 필요하다"는 표준 신호로만 바꿔 던집니다.
  // 실제 refresh route redirect는 page/layout 같은 렌더 경계에서 처리해야 Next redirect 예외가 묻히지 않습니다.
  if (response.status === 401 && !skipAuth && !skipRefresh && !(headers?.Authorization ?? headers?.authorization)) {
    throw new SessionRefreshRequiredError(`request failed (${response.status})`)
  }

  if (!response.ok) {
    throw new Error(`서버 API 요청에 실패했습니다. (${method} ${url}, ${response.status})`)
  }

  return (await response.json()) as TRes
}

export async function serverGet<TRes>(
  url: string,
  options?: Pick<ServerApiRequestOptions<never>, 'headers' | 'skipAuth' | 'skipRefresh' | 'params' | 'cache' | 'next'>,
) {
  return requestFromServer<TRes>({
    url,
    method: 'GET',
    headers: options?.headers,
    skipAuth: options?.skipAuth,
    skipRefresh: options?.skipRefresh,
    params: options?.params,
    cache: options?.cache,
    next: options?.next,
  })
}

export async function serverPost<TRes, TReq = void>(
  url: string,
  body?: TReq,
  options?: Pick<ServerApiRequestOptions<TReq>, 'headers' | 'skipAuth' | 'skipRefresh' | 'params' | 'cache' | 'next'>,
) {
  return requestFromServer<TRes, TReq>({
    url,
    method: 'POST',
    body,
    headers: options?.headers,
    skipAuth: options?.skipAuth,
    skipRefresh: options?.skipRefresh,
    params: options?.params,
    cache: options?.cache,
    next: options?.next,
  })
}

export async function serverPut<TRes, TReq = void>(
  url: string,
  body?: TReq,
  options?: Pick<ServerApiRequestOptions<TReq>, 'headers' | 'skipAuth' | 'skipRefresh' | 'params' | 'cache' | 'next'>,
) {
  return requestFromServer<TRes, TReq>({
    url,
    method: 'PUT',
    body,
    headers: options?.headers,
    skipAuth: options?.skipAuth,
    skipRefresh: options?.skipRefresh,
    params: options?.params,
    cache: options?.cache,
    next: options?.next,
  })
}

export async function serverPatch<TRes, TReq = void>(
  url: string,
  body?: TReq,
  options?: Pick<ServerApiRequestOptions<TReq>, 'headers' | 'skipAuth' | 'skipRefresh' | 'params' | 'cache' | 'next'>,
) {
  return requestFromServer<TRes, TReq>({
    url,
    method: 'PATCH',
    body,
    headers: options?.headers,
    skipAuth: options?.skipAuth,
    skipRefresh: options?.skipRefresh,
    params: options?.params,
    cache: options?.cache,
    next: options?.next,
  })
}

export async function serverDelete<TRes>(
  url: string,
  options?: Pick<ServerApiRequestOptions<never>, 'headers' | 'skipAuth' | 'skipRefresh' | 'params' | 'cache' | 'next'>,
) {
  return requestFromServer<TRes>({
    url,
    method: 'DELETE',
    headers: options?.headers,
    skipAuth: options?.skipAuth,
    skipRefresh: options?.skipRefresh,
    params: options?.params,
    cache: options?.cache,
    next: options?.next,
  })
}
