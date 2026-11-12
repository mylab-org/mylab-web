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

export const useLabScheduleHook = () => {
  const router = useRouter()
  const { lab } = useUsersMeHook()
  const labId = lab?.labId

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
