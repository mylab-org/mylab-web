'use client'

import { useQuery } from '@tanstack/react-query'
import { getUsersMeInProgress } from '@/entities/user/api/get-users-me-in-progress'
import type { UsersMeInProgressPaperType, UsersMeInProgressTaskType } from '@/entities/user/model/types'
import { QUERY_KEYS } from '@/shared/api/query-key'

const PREVIEW_COUNT = 2

export type LabWorkingPreviewItem =
  { kind: 'paper'; paper: UsersMeInProgressPaperType } | { kind: 'task'; task: UsersMeInProgressTaskType }

export const useLabWorkingHook = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: QUERY_KEYS.USERS.IN_PROGRESS,
    queryFn: getUsersMeInProgress,
  })

  const papers = data?.papers ?? []
  const tasks = data?.tasks ?? []

  const items: LabWorkingPreviewItem[] = [
    ...papers.map(paper => ({ kind: 'paper' as const, paper })),
    ...tasks.map(task => ({ kind: 'task' as const, task })),
  ]

  const previewItems = items.slice(0, PREVIEW_COUNT)
  const remainingCount = Math.max(0, items.length - PREVIEW_COUNT)

  return {
    papers,
    tasks,
    previewItems,
    remainingCount,
    isPending,
    isError,
    isEmpty: !isPending && !isError && items.length === 0,
  }
}
