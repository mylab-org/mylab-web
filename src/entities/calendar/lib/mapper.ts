import { toDateKey } from './date'
import type { CalendarEvent, CalendarScheduleResponseType } from '../model/types'

/** ISO 일시 문자열에서 로컬 기준 날짜(YYYY-MM-DD)만 뽑는다 */
const toLocalDateKey = (isoString: string) => toDateKey(new Date(isoString))

type MemberNameMap = Map<number, string>

/**
 * 서버 응답(snake_case)을 화면 모델로 변환한다.
 * participant_ids 는 userId 목록이라 멤버 목록으로 이름을 찾아 넣는다.
 */
export const toCalendarEvent = (
  schedule: CalendarScheduleResponseType,
  memberNames: MemberNameMap = new Map(),
): CalendarEvent => {
  const startDate = toLocalDateKey(schedule.start_at)
  const endDate = schedule.end_at ? toLocalDateKey(schedule.end_at) : undefined

  return {
    id: schedule.id,
    // 반복 일정은 같은 id 가 발생일마다 내려오므로 날짜를 붙여 고유하게 만든다
    key: `${schedule.id}-${startDate}`,
    type: schedule.schedule_type,
    title: schedule.title,
    startDate,
    endDate: endDate === startDate ? undefined : endDate,
    place: schedule.location ?? '',
    members: schedule.participant_ids.map(id => memberNames.get(id)).filter((name): name is string => Boolean(name)),
  }
}

export const toCalendarEvents = (schedules: CalendarScheduleResponseType[], memberNames?: MemberNameMap) =>
  schedules.filter(schedule => !schedule.is_cancelled).map(schedule => toCalendarEvent(schedule, memberNames))
