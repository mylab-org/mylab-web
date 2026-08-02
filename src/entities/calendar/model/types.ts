import type { CALENDAR_TYPE } from '@/shared/constant/tag'

export type CalendarType = keyof typeof CALENDAR_TYPE

/** 필터에서 사용하는 '전체' 포함 값 */
export type CalendarFilter = CalendarType | 'ALL'

export interface CalendarEvent {
  id: number
  type: CalendarType
  title: string
  /** YYYY-MM-DD */
  startDate: string
  /** 없으면 하루짜리 일정 */
  endDate?: string
  place: string
  members: string[]
}
