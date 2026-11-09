import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { CalendarScheduleResponseType } from '../model/types'

export const getCalendarMonthly = async (labId: number, year: number, month: number) => {
  const response = await axiosGet<ApiResponseType<CalendarScheduleResponseType[]>>(ENDPOINTS.CALENDAR.DATES(labId), {
    params: { year, month },
  })

  return response.data
}
