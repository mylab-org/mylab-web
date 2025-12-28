import axios, { type AxiosRequestConfig } from 'axios'
import type { ResponseType } from './types'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

// axiosInstance.interceptors.request.use(
//   async config => {},
//   error => {
//     return Promise.reject(error)
//   },
// )
//
// axiosInstance.interceptors.response.use(
//   async response => {
//     // console.log('정상요청', response.config.url)
//     return response
//   },
//   async error => {},
// )

export const axiosGet = async <T>(url: string, config: AxiosRequestConfig = {}): Promise<ResponseType<T>> => {
  const response = await axiosInstance.get<ResponseType<T>>(url, { ...config })
  return response.data
}

export const axiosPost = async <T>(
  url: string,
  params: object | string = {},
  config: AxiosRequestConfig = {},
): Promise<ResponseType<T>> => {
  const response = await axiosInstance.post(url, params, { ...config })
  const data: ResponseType<T> = await response.data

  return data
}

export const axiosPatch = async <T>(
  url: string,
  params: object | string = {},
  config: AxiosRequestConfig = {},
): Promise<ResponseType<T>> => {
  const response = await axiosInstance.patch(url, params, { ...config })
  const data: ResponseType<T> = await response.data

  return data
}

export const axiosDelete = async <T>(url: string, config: AxiosRequestConfig = {}): Promise<ResponseType<T>> => {
  const response = await axiosInstance.delete(url, { ...config })
  const data: ResponseType<T> = await response.data

  return data
}
