import type { CALENDAR_TYPE } from '@/shared/constant/tag'

export type CalendarType = keyof typeof CALENDAR_TYPE

/** 필터에서 사용하는 '전체' 포함 값 */
export type CalendarFilter = CalendarType | 'ALL'

export type CalendarRecurrenceType = 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY'

export type CalendarScheduleResponseType = {
  id: number
  title: string
  scheduleType: CalendarType
  startAt: string
  endAt: string | null
  location: string | null
  participantIds: number[]
  recurrenceType: CalendarRecurrenceType
  isCancelled: boolean
}

export type CalendarScheduleCreatePayloadType = {
  scheduleType: CalendarType
  title: string
  startAt: string
  endAt?: string
  location: string
  participantIds: number[]
  recurrenceType?: CalendarRecurrenceType
}

export interface CalendarEvent {
  id: number
  key: string
  type: CalendarType
  title: string
  /** YYYY-MM-DD */
  startDate: string
  /** 없으면 하루짜리 일정 */
  endDate?: string
  place: string
  members: string[]
}
