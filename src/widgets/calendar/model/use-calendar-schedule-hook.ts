'use client'

import { useQuery } from '@tanstack/react-query'
import { useMemo, useState } from 'react'
import { getCalendarMonthly } from '@/entities/calendar/api/get-calendar-monthly'
import { toCalendarEvents } from '@/entities/calendar/lib/mapper'
import { getLabsMembers } from '@/entities/labs/api/get-labs-members'
import { useUsersMeHook } from '@/entities/user/model/use-users-me-hook'
import { QUERY_KEYS } from '@/shared/api/query-key'

/**
 * 보고 있는 달의 일정과 연구실 멤버를 함께 조회한다.
 * 일정 응답의 participant_ids(userId)를 이름으로 바꾸려면 멤버 목록이 필요하다.
 */
export const useCalendarScheduleHook = () => {
  const { lab } = useUsersMeHook()
  const labId = lab?.labId

  const [currentDate, setCurrentDate] = useState(() => {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  })

  const year = currentDate.getFullYear()
  // 서버는 1~12 월을 받는다
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
