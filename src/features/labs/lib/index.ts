import type { AxiosError } from 'axios'

export const isUnauthorized = (error: unknown) => {
  return (error as AxiosError | undefined)?.response?.status === 401
}
