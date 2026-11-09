import type { CALENDAR_TYPE } from '@/shared/constant/tag'

export type CalendarType = keyof typeof CALENDAR_TYPE

/** 필터에서 사용하는 '전체' 포함 값 */
export type CalendarFilter = CalendarType | 'ALL'

export type CalendarRecurrenceType = 'NONE' | 'DAILY' | 'WEEKLY' | 'MONTHLY'

/**
 * 월간 일정 조회 응답.
 * 캘린더 API 는 다른 API 와 달리 snake_case 로 내려온다.
 * 반복 일정은 발생일마다 펼쳐져서 오므로 id 가 중복될 수 있다.
 */
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

/** 화면에서 사용하는 일정 모델 */
export interface CalendarEvent {
  id: number
  /** 반복 일정은 id 가 중복되므로 목록 key 로 사용 */
  key: string
  type: CalendarType
  title: string
  /** YYYY-MM-DD */
  startDate: string
  /** 없으면 하루짜리 일정 */
  endDate?: string
  place: string
  /** 참가자 이름 목록 */
  members: string[]
}
