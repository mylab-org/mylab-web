import { toDateKey } from './date'
import type { CalendarEvent, CalendarScheduleResponseType } from '../model/types'

const toLocalDateKey = (isoString: string) => toDateKey(new Date(isoString))

type MemberNameMap = Map<number, string>

export const toCalendarEvent = (
  schedule: CalendarScheduleResponseType,
  memberNames: MemberNameMap = new Map(),
): CalendarEvent => {
  const startDate = toLocalDateKey(schedule.startAt)
  const endDate = schedule.endAt ? toLocalDateKey(schedule.endAt) : undefined

  return {
    id: schedule.id,
    // 반복 일정은 발생일마다 같은 id 로 내려와 날짜를 붙여 고유화 처리
    key: `${schedule.id}-${startDate}`,
    type: schedule.scheduleType,
    title: schedule.title,
    startDate,
    endDate: endDate === startDate ? undefined : endDate,
    place: schedule.location ?? '',
    members: schedule.participantIds.map(id => memberNames.get(id)).filter((name): name is string => Boolean(name)),
  }
}

export const toCalendarEvents = (schedules: CalendarScheduleResponseType[], memberNames?: MemberNameMap) =>
  schedules.filter(schedule => !schedule.isCancelled).map(schedule => toCalendarEvent(schedule, memberNames))
