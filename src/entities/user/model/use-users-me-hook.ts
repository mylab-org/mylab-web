import { useQuery } from '@tanstack/react-query'
import { getUsersMe } from '../api/get-users-me'
import { QUERY_KEYS } from '@/shared/api/query-key'

const USERS_ME_STALE_TIME = 5 * 60 * 1000

/** 로그인한 사용자 정보(소속 연구실 포함). 같은 queryKey를 공유하므로 여러 곳에서 호출해도 요청은 한 번만 나감 */
export const useUsersMeHook = () => {
  const {
    data: me,
    isPending,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.USERS.ROOT,
    queryFn: getUsersMe,
    staleTime: USERS_ME_STALE_TIME,
  })

  return {
    me,
    lab: me?.lab,
    isPending,
    isError,
  }
}
