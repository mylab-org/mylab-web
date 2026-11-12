import { axiosGet } from '@/shared/api/axios-client'
import { ENDPOINTS } from '@/shared/api/endpoint'
import type { CalendarScheduleResponseType } from '../model/types'

export const getCalendarRange = async (labId: number, from: string, to: string) => {
  const response = await axiosGet<ApiResponseType<CalendarScheduleResponseType[]>>(ENDPOINTS.CALENDAR.ROOT(labId), {
    params: { from, to },
  })

  return response.data
}
