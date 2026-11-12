import { serverGet } from '@/shared/api/api-server'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { CalendarScheduleResponseType } from '../model/types'

export const getCalendarMonthlyServer = async (labId: number, year: number, month: number) => {
  const response = await serverGet<ApiResponseType<CalendarScheduleResponseType[]>>(ENDPOINTS.CALENDAR.DATES(labId), {
    params: { year, month },
  })

  return response.data
}
