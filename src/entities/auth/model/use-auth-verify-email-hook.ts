import { useQuery } from '@tanstack/react-query'
import { getAuthVerifyEmail } from '../api/get-auth-verify-email'
import { QUERY_KEYS } from '@/shared/api/query-key'

export const useAuthVerifyEmailHook = (token: string) => {
  const { isPending, isSuccess, isError } = useQuery({
    queryKey: [...QUERY_KEYS.AUTH.VERIFY_EMAIL, token],
    queryFn: () => getAuthVerifyEmail(token),
    retry: false,
    refetchOnWindowFocus: false,
  })

  return { isPending, isSuccess, isError }
}
