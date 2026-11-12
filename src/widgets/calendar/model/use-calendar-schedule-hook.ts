'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { getCalendarMonthly } from '@/entities/calendar/api/get-calendar-monthly'
import { toCalendarEvents } from '@/entities/calendar/lib/mapper'
import { getLabsMembers } from '@/entities/labs/api/get-labs-members'
import { useUsersMeHook } from '@/entities/user/model/use-users-me-hook'
import { QUERY_KEYS } from '@/shared/api/query-key'

export const useCalendarScheduleHook = () => {
  const { lab } = useUsersMeHook()
  const labId = lab?.labId

  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1

  const { data: members } = useQuery({
    queryKey: QUERY_KEYS.LABS.MEMBERS(labId ?? 0),
    queryFn: () => getLabsMembers(labId as number),
    enabled: labId !== undefined,
  })

  const { data: schedules, isPending } = useQuery({
    queryKey: QUERY_KEYS.CALENDAR.MONTHLY(labId ?? 0, year, month),
    queryFn: () => getCalendarMonthly(labId as number, year, month),
    enabled: labId !== undefined,
  })

  const memberNames = useMemo(() => new Map((members ?? []).map(member => [member.userId, member.name])), [members])

  const events = useMemo(() => toCalendarEvents(schedules ?? [], memberNames), [schedules, memberNames])

  return {
    labId,
    currentDate,
    setCurrentDate,
    events,
    members: members ?? [],
    isPending,
  }
}
