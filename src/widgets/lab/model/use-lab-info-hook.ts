'use client'

import { useQuery } from '@tanstack/react-query'
import { getLabsDetail } from '@/entities/labs/api/get-labs-detail'
import { getLabsLinks } from '@/entities/labs/api/get-labs-links'
import { useUsersMeHook } from '@/entities/user'
import { QUERY_KEYS } from '@/shared/api/query-key'

export const useLabInfoHook = () => {
  const { lab: myLab } = useUsersMeHook()
  const labId = myLab?.labId

  const { data: lab } = useQuery({
    queryKey: QUERY_KEYS.LABS.DETAIL(labId ?? 0),
    queryFn: () => getLabsDetail(labId as number),
    enabled: labId !== undefined,
  })

  const { data: links } = useQuery({
    queryKey: QUERY_KEYS.LABS.LINKS(labId ?? 0),
    queryFn: () => getLabsLinks(labId as number),
    enabled: labId !== undefined,
  })

  return { labId, lab, links: links ?? [] }
}
