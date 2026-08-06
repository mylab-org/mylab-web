import { toDateKey } from '@/entities/calendar'
import type { CalendarEvent } from '@/entities/calendar'

/** TODO: 일정 조회 API 연동 시 제거 */
export const MOCK_MEMBERS = [
  '김교수',
  '김랩장',
  '임땡땡',
  '박머머',
  '황땡땡',
  '김땡땡',
  '김냉냉',
  '김뮴뮴',
  '김맹맹',
  '김멍멍',
]

const LAB_MEMBERS = ['김교수', '김랩장', '임땡땡', '박머머', '황땡땡']

/** 목데이터가 항상 이번 달에 보이도록 오늘 기준으로 날짜를 만든다 */
const dateFromToday = (dayOffset: number) => {
  const today = new Date()
  return toDateKey(new Date(today.getFullYear(), today.getMonth(), today.getDate() + dayOffset))
}

export const MOCK_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 1,
    type: 'CONFERENCE',
    title: '2025 한국통신학회 동계종합학술발표회',
    startDate: dateFromToday(2),
    endDate: dateFromToday(4),
    place: '모나 용평(용평리조트)',
    members: LAB_MEMBERS,
  },
  {
    id: 2,
    type: 'MEETING',
    title: '정기 미팅',
    startDate: dateFromToday(0),
    place: '8공 812호 세미나실',
    members: LAB_MEMBERS,
  },
  {
    id: 3,
    type: 'MEETING',
    title: '정기 미팅',
    startDate: dateFromToday(7),
    place: '8공 812호 세미나실',
    members: LAB_MEMBERS,
  },
  {
    id: 4,
    type: 'MEETING',
    title: '정기 미팅',
    startDate: dateFromToday(14),
    place: '8공 812호 세미나실',
    members: LAB_MEMBERS,
  },
  {
    id: 5,
    type: 'DINNER',
    title: '연말 회식',
    startDate: dateFromToday(9),
    place: '학교 앞 고깃집',
    members: [...LAB_MEMBERS, '김땡땡'],
  },
]
