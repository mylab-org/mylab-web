'use client'

import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { getCalendarRange } from '@/entities/calendar/api/get-calendar-range'
import { getWeekRange, isDateInEvent, isSameDate } from '@/entities/calendar/lib/date'
import { toCalendarEvents } from '@/entities/calendar/lib/mapper'
import { getLabsMembers } from '@/entities/labs/api/get-labs-members'
import { useUsersMeHook } from '@/entities/user'
import { QUERY_KEYS } from '@/shared/api/query-key'

/** 메인 화면의 '이번 주 일정'. 일요일~토요일 범위를 조회한다 */
export const useLabScheduleHook = () => {
  const router = useRouter()
  const { lab } = useUsersMeHook()
  const labId = lab?.labId

  // 날짜가 바뀌어도 렌더마다 범위가 흔들리지 않도록 마운트 시점 기준으로 고정
  const { from, to } = useMemo(() => getWeekRange(new Date()), [])

  const { data: members } = useQuery({
    queryKey: QUERY_KEYS.LABS.MEMBERS(labId ?? 0),
    queryFn: () => getLabsMembers(labId as number),
    enabled: labId !== undefined,
  })

  const { data: schedules, isPending } = useQuery({
    queryKey: QUERY_KEYS.CALENDAR.RANGE(labId ?? 0, from, to),
    queryFn: () => getCalendarRange(labId as number, from, to),
    enabled: labId !== undefined,
  })

  const memberNames = useMemo(() => new Map((members ?? []).map(member => [member.userId, member.name])), [members])

  const events = useMemo(() => toCalendarEvents(schedules ?? [], memberNames), [schedules, memberNames])

  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  /** 같은 날짜를 다시 누르면 선택을 해제해 이번 주 전체를 보여준다 */
  const handleSelectDate = (date: Date) => {
    setSelectedDate(prev => (prev && isSameDate(prev, date) ? null : date))
  }

  const listEvents = useMemo(
    () => (selectedDate ? events.filter(event => isDateInEvent(selectedDate, event)) : events),
    [events, selectedDate],
  )

  const goToCalendar = () => router.push('/calendar')

  return {
    events,
    listEvents,
    selectedDate,
    setSelectedDate,
    handleSelectDate,
    goToCalendar,
    isPending,
  }
}
