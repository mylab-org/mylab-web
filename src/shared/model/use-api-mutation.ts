import { useMutation, useQueryClient, type QueryKey, type UseMutationOptions } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import type { AxiosError } from 'axios'
import type { FieldValues, UseFormSetError } from 'react-hook-form'

type UseApiMutationOptions<TData, TVariables, TForm extends FieldValues> = Omit<
  UseMutationOptions<TData, AxiosError<ApiResponseType>, TVariables>,
  'mutationFn'
> & {
  mutationFn: (variables: TVariables) => Promise<TData>
  /** 전달하면 E4400 필드 에러를 RHF setError로 매핑합니다. */
  setError?: UseFormSetError<TForm>
  /** E4400이 아닐 때 alert에 쓸 기본 메시지 */
  defaultErrorMessage?: string
  /** 요청 성공 시 토스트 메시지 */
  successMessage?: string
  /** 성공 시 invalidateQueries 할 쿼리키 목록 */
  invalidateQueryKeys?: QueryKey[]
  /** 성공 시 캐싱 삭제 */
  removeCache?: QueryKey[]
}

export function useApiMutation<TData, TVariables = void, TForm extends FieldValues = FieldValues>(
  options: UseApiMutationOptions<TData, TVariables, TForm>,
) {
  const queryClient = useQueryClient()
  const {
    mutationFn,
    defaultErrorMessage = '요청에 실패했습니다.',
    successMessage,
    invalidateQueryKeys,
    removeCache,
    onSuccess,
    onError,
    ...rest
  } = options

  return useMutation({
    ...rest,
    mutationFn,
    onSuccess: async (data, variables, onMutateResult, context) => {
      if (invalidateQueryKeys?.length) {
        await Promise.all(invalidateQueryKeys.map(queryKey => queryClient.invalidateQueries({ queryKey })))
      }

      if (removeCache?.length) {
        await Promise.all(removeCache.map(queryKey => queryClient.removeQueries({ queryKey })))
      }

      if (successMessage) {
        toast.success(successMessage, { icon: false })
      }

      // onSuccess 콜백이 있다면 호출
      await onSuccess?.(data, variables, onMutateResult, context)
    },
    onError: (error, variables, onMutateResult, context) => {
      const responseData = error.response?.data
      const message = responseData?.message || defaultErrorMessage

      toast.error(message, { icon: false })

      // onError 콜백이 있다면 호출
      onError?.(error, variables, onMutateResult, context)
    },
  })
}
