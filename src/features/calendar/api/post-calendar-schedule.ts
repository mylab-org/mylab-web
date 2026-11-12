import type { CalendarScheduleCreatePayloadType, CalendarScheduleResponseType } from '@/entities/calendar'
import { axiosPost } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'

export const postCalendarSchedule = async (labId: number, payload: CalendarScheduleCreatePayloadType) => {
  const response = await axiosPost<ApiResponseType<CalendarScheduleResponseType>, CalendarScheduleCreatePayloadType>(
    ENDPOINTS.CALENDAR.ROOT(labId),
    payload,
  )

  return response.data
}
