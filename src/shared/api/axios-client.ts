import axios from 'axios'
import qs from 'qs'
import { applyResponseInterceptor } from './interceptors'

type ApiRequestOptions = {
  headers?: Record<string, string>
  params?: string | Record<string, string | number | boolean | null | undefined | Array<string | number | boolean>>
  skipAuth?: boolean
  skipRefresh?: boolean
}

type RequestApiParams<TReq> = {
  url: string
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: TReq
  headers?: Record<string, string>
  params?: ApiRequestOptions['params']
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  withCredentials: true,
})

axiosInstance.defaults.headers.common.Accept = 'application/json'
axiosInstance.defaults.headers.common['Content-Type'] = 'application/json'

axiosInstance.defaults.paramsSerializer = params =>
  qs.stringify(params, {
    skipNulls: true,
    arrayFormat: 'repeat',
  })

applyResponseInterceptor(axiosInstance)

const toAxiosRequestconfig = (options?: ApiRequestOptions) => {
  if (!options) return undefined

  if (typeof options.params === 'string') {
    return {
      headers: options.headers,
      skipAuth: options.skipAuth,
      skipRefresh: options.skipRefresh,
    }
  }

  return {
    headers: options.headers,
    skipAuth: options.skipAuth,
    skipRefresh: options.skipRefresh,
    params: options.params,
  }
}

const requestApi = async <TRes, TReq = never>({ url, method, body, headers, params }: RequestApiParams<TReq>) => {
  const resolvedUrl = typeof params === 'string' && params.length > 0 ? `${url}?${params}` : url
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData

  const response = await axiosInstance.request<TRes>({
    url: resolvedUrl,
    method,
    data: body,
    ...toAxiosRequestconfig({ headers, params }),
    // FormData는 boundary 포함 Content-Type을 axios/브라우저가 설정해야 함
    ...(isFormData ? { headers: { ...headers, 'Content-Type': undefined } } : {}),
  })

  return response.data
}

export const axiosGet = async <TRes>(url: string, options?: ApiRequestOptions) => {
  return requestApi<TRes>({ url, method: 'GET', headers: options?.headers, params: options?.params })
}

export const axiosPost = async <TRes, TReq = void>(url: string, body?: TReq, options?: ApiRequestOptions) => {
  return requestApi<TRes, TReq>({ url, method: 'POST', body, headers: options?.headers, params: options?.params })
}

export const axiosPut = async <TRes, TReq = void>(url: string, body?: TReq, options?: ApiRequestOptions) => {
  return requestApi<TRes, TReq>({ url, method: 'PUT', body, headers: options?.headers, params: options?.params })
}
export const axiosPatch = async <TRes, TReq = void>(url: string, body?: TReq, options?: ApiRequestOptions) => {
  return requestApi<TRes, TReq>({ url, method: 'PATCH', body, headers: options?.headers, params: options?.params })
}

export const axiosDelete = async <TRes>(url: string, options?: ApiRequestOptions) => {
  return requestApi<TRes>({ url, method: 'DELETE', headers: options?.headers, params: options?.params })
}
