import type { CALENDAR_TYPE } from '@/shared/constant/tag'

export type CalendarType = keyof typeof CALENDAR_TYPE

/** 필터에서 사용하는 '전체' 포함 값 */
export type CalendarFilter = CalendarType | 'ALL'

export type CalendarRecurrenceType = 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY'

export type CalendarScheduleResponseType = {
  id: number
  title: string
  schedule_type: CalendarType
  start_at: string
  end_at: string | null
  location: string | null
  participant_ids: number[]
  recurrence_type: CalendarRecurrenceType
  is_cancelled: boolean
}

export type CalendarScheduleCreatePayloadType = {
  schedule_type: CalendarType
  title: string
  start_at: string
  end_at?: string
  location: string
  participant_ids: number[]
  recurrence_type?: CalendarRecurrenceType
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
