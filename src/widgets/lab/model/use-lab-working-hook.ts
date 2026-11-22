'use client'

import { useQuery } from '@tanstack/react-query'
import { getUsersMeInProgress } from '@/entities/user/api/get-users-me-in-progress'
import { QUERY_KEYS } from '@/shared/api/query-key'

export const useLabWorkingHook = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: QUERY_KEYS.USERS.IN_PROGRESS,
    queryFn: getUsersMeInProgress,
  })

  const papers = data?.papers ?? []
  const tasks = data?.tasks ?? []

  return {
    papers,
    tasks,
    isPending,
    isError,
    isEmpty: !isPending && !isError && papers.length === 0 && tasks.length === 0,
  }
}
